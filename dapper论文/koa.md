1. 进入程序开始创建traceId

        function appendZipkinHeaders(req, traceId) {
            const headers = req.headers || {};
            headers[HttpHeaders.TraceId] = traceId.traceId;
            headers[HttpHeaders.SpanId] = traceId.spanId;

            traceId.parentSpanId.ifPresent((psid) => {
                headers[HttpHeaders.ParentSpanId] = psid;
            });
            traceId.sampled.ifPresent((sampled) => {
                headers[HttpHeaders.Sampled] = sampled ? '1' : '0';
            });

            if (traceId.isDebug()) {
                headers[HttpHeaders.Flags] = '1';
            }

            return headers;
        }

        function addZipkinHeaders(req, traceId) {
            const headers = appendZipkinHeaders(req, traceId);
            return Object.assign({}, req, {headers});
         }

2. response 返回信息

         recordResponse(traceId, statusCode) {
            this.tracer.setId(traceId);
            this.tracer.recordBinary('http.status_code', statusCode.toString());
            if (statusCode < 200 || statusCode > 399) {
            this.tracer.recordBinary('error', statusCode.toString());
            }
            this.tracer.recordAnnotation(new Annotation.ClientRecv());
        }

3. 错误返回信息

            recordError(traceId, error) {
                this.tracer.setId(traceId);
                this.tracer.recordBinary('error', error.toString());
                this.tracer.recordAnnotation(new Annotation.ClientRecv());
            }

4. 中间件

        _createIdFromHeaders(readHeader) {
                if (containsRequiredHeaders(readHeader)) {
                const spanId = readHeader(Header.SpanId);
                const parentId = spanId.map((sid) => {
                    const traceId = readHeader(Header.TraceId);
                    const parentSpanId = readHeader(Header.ParentSpanId);
                    const sampled = readHeader(Header.Sampled);
                    const flags = readHeader(Header.Flags).flatMap(stringToIntOption).getOrElse(0);
                    return new TraceId({
                    traceId: traceId.getOrElse(),
                    parentId: parentSpanId,
                    spanId: sid,
                    debug: flags === 1,
                    sampled: sampled.map(stringToBoolean),
                    });
                });

                return new Some(this.tracer.join(parentId.getOrElse()));
            } else if (readHeader(Header.Flags) !== None || readHeader(Header.Sampled) !== None) {
            const sampled = readHeader(Header.Sampled) === None
                ? None : readHeader(Header.Sampled).map(stringToBoolean);
            const flags = readHeader(Header.Flags).flatMap(stringToIntOption).getOrElse(0);
            return new Some(this.tracer.createRootId(sampled, flags === 1));
            } else {
            return new Some(this.tracer.createRootId());
            }
        }


        module.exports = function koaMiddleware({tracer, serviceName, port = 0}) {
            const instrumentation = new Instrumentation.HttpServer({tracer, serviceName, port});

            /**
            * @method
            * @typedef {function} ZipkinKoaMiddleware
            * @param {Object} ctx
            * @param {function()} next
            */
            return function zipkinKoaMiddleware(ctx, next) {
                function readHeader(header) {
                const val = ctx.request.headers[header.toLowerCase()];
                if (val != null) {
                    return new Some(val);
                } else {
                    return None;
                }
                }
                return tracer.scoped(() => {
                const method = ctx.request.method.toUpperCase();
                const id = instrumentation.recordRequest(method, ctx.request.href, readHeader);

                Object.defineProperty(ctx.request, '_trace_id', {configurable: false, get: () => id});

                const recordResponse = () => {
                    tracer.letId(id, () => {
                    // support koa-route and koa-router
                    const matchedPath = ctx.routePath || ctx._matchedRoute;
                    tracer.recordRpc(instrumentation.spanNameFromRoute(method, matchedPath, ctx.status));
                    instrumentation.recordResponse(id, ctx.status);
                    });
                };

                return next()
                    .then(recordResponse)
                    .catch(recordResponse);
                });
            };
            };
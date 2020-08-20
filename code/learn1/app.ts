import Koa from 'koa'
import KoaRouter from 'koa-router'

const app =new Koa();

app.listen(9200,()=>{
    console.log('ts start at 9200')
})
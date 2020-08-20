import Router from 'koa-router'
import { Context,Next } from 'koa';

const router = new Router({
    prefix:'/user'
});

router.get('/list',async (ctx:Context,next:() => Promise<any>):Promise<void>=>{

})

router.get('/info',async (ctx:Context,next:Next):Promise<void> =>{

});
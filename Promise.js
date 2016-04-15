//Promise对象可以认为事件的结果只有两个，从进行（pending）到成功（resolved）或失败（rejected）
//事件发生后状态将不再变化，Promise对象就是根据对结果的预测来执行下一步
//不同于事件的是，即使在结果已经产生，再在Promise添加回调函数，依然会执行，而不是错过事件监听
//Promise无法取消，创建后立刻执行
//Promise会记录状态，直到找到能够处理状态的回调，若不设置回调，将无法得知状态，一直传递下去
//当处于Pending状态时，无法得知目前进展到哪一个阶段（刚刚开始还是即将完成）


/*
 *简单实现
 */
 function func(args){
 	return new Promise(function(resolve,reject){
 		//do something
 		if(/*success*/){
 			resolve(args);
 		}else{
 			reject(args);
 		}
 	});
 }
 func(args).then(function(args){		//.then()执行完返回一个Promise对象，所以可以链式执行
 	//success
 },function(args){
 	//failure
 }).then(...);


/*
 *Promise.prototype.catch()
 *等同于.then(null,reject)因为错误可以传递，所以可以通过在最后加一个catch来处理错误，防止缺少回调，无法得知状态
 */
 function func(args){
 	return new Promise(function(resolve,reject){
 		//do something
 		if(/*success*/){
 			resolve(args);
 		}else{
 			reject(args);
 		}
 	});
 }
 func(args).catch(function(error){		//若函数执行没有出错，将会跳过catch继续执行后续代码，如果有.then()的话
 	//error
 });


/*
 *Promise.all()
 *用于包装多个Promise实例为一个新的Promise实例
 */
 var p = Promise.all([p1, p2, p3]);		//当数组中所有状态为resolved，p状态才为resolved，只要有一个rejected，p状态为rejected


/*
 *Promise.race()
 *同样包装多个Promise
 */
 var p = Promise.all([p1, p2, p3]);		//当数组中最先改变的状态设置为p的状态


/*
 *Promise.resolve(arg)
 *将arg转化为一个promise对象
 */
 var p = Promise.resolve(new Promise(function(){}));	//若参数是一个Promise实例，则原封返回这个实例

 function Obj(){
 }
 Obj.prototype.then = function(resolve,reject){
 	//do something
 	resolve();
 };
 var p = Promise.resolve(new Obj());		//参数是实现then方法的对象，转化为Promise对象并立刻执行then()

 var p = Promise.resolve('a');
 new Promise(function(resolve){			//参数不是对象或为实现then，将返回一个新的Promise对象，状态为Resolved
 	resolve('a');
 });

 var p = Promise.resolve();		//直接返回一个Promise，状态为resolved


/*
 *Promise.reject()
 *同resolve()	
 */
 var p = Promise.reject(arg);


/*
 *done()
 *Promise回调链，无论是以then结尾还是catch结尾，若最后一个方法抛出错误将无法捕捉
 *因此，我们可以提供一个done方法，总是处于回调链的尾端，保证抛出任何可能出现的错误
 */
 Promise.prototype.done = function (resolve, reject) {
  this.then(resolve, reject)
    .catch(function (reason) {
      // 抛出一个全局错误
      setTimeout(() => { throw reason }, 0);
    });
 };


/*
 *finally()
 *finally方法用于指定不管Promise对象最后状态如何，都会执行的操作
 *它与done方法的最大区别，它接受一个普通的回调函数作为参数，该函数不管怎样都必须执行
 */
 Promise.prototype.finally = function (callback) {
  let P = this.constructor;
  return this.then(
    value  => P.resolve(callback()).then(() => value),
    reason => P.resolve(callback()).then(() => { throw reason })
  );
};

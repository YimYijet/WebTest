//Js预解析：按照文档流解析，不同块间单独解析，解析过的资源共享，就是说先导入，后使用（jQuery）
//编译阶段：变量，函数提升，此时的变量都为undefined
//执行阶段：按顺序执行
 console.log(a);		//不会报错，输出undefined，因为变量提升
 fn();					//正常执行，函数提升
 var a = 'a';
 function fn(){
 	console.log('a');
 }


/*
 *函数有两种定义方式：函数声明、函数表达式
 */
 function fn(){			//函数声明
 	/*do something*/
 }
 var fn = function(){	//函数表达式
 	/*do something*/
 }

/*
 *递归，使用arguments.callee()
 *每个作用域（除了全局作用域）都有一个初始变量就是arguments
 */
 function factorial(num){
 	if(num<=1){
 		return 1;
 	}else{
 		return num*arguments.callee(num-1);
 	}
 }


/*
 *闭包：外部作用域可以访问内部作用域的局部变量
 *执行环境：每一个执行环境都有一个活动对象（执行对象，就是指this），环境中的所有变量和函数都保存在这个对象中
 *作用域链：执行环境以一个链状的形式执行，作用域链的最外层是全局作用域（web中就是window作为执行对象），作用域链存放在环境栈（stack）中
 *所以是后进先出，在某一个函数执行时，作用域会将其推入栈中，可以想象成在作用域的内部加了一个作用域，并取得活动对象
 *内部作用域可以访问所有外部资源，但外部不可访问内部，当函数运行结束，从环境栈中弹出，并销毁，执行对象返回给上一级作用域
 *闭包原理：外部作用域（通常为全局）存在一个引用指向在内部函数作用域定义的函数，这个函数（闭包）同时也是一个作用域，他可以并且已经访问了
 *局部变量，即使内部作用域运行完毕，闭包作用域还是存在，并且携带包含他的作用域
 */
//简单的闭包实现
 function fn(){
 	var value = 'value';
 	return function(){
 		return value;
 	}
 }
 var getValue = fn();		//fn函数已经运行完毕，但返回一个函数（getValue指向）
 var value = getValue();

 function fn(){
 	var value = 'value';
 	this.changeValue = function(val){
 		value = val;
 	};
 	this.getValue = function(){
 		return value;
 	};
 }
 var obj = {};
 fn.call(obj);
 obj.changeValue('newValue');
 obj.getValue();
//这也是利用闭包


/*
 *this指的是当前作用域的活动对象
 */
//一个this的经典例子：
 var name = 'window';
 var Obj = {
 	name:'Obj',
 	getName:function(){
 		return function(){
 			return this.name;
 		}
 	}
 }
 console.log(Obj.getName()());
//返回值是window
//注意：Obj.getName()到此的活动对象都是Obj，但返回值是一个函数，这时函数已经运行完毕，就是说从执行环境栈中弹出，活动对象交给父级作用域
//就是window，相当于(Obj.getName())()
//若想还是Obj，有以下两种方法
//调用时
 console.log((Obj.getName()).call(Obj));		//用call强行把this交给Obj
//从写代码
 var Obj = {
 	name:'Obj',
 	getName:function(){
 		var that = this;			//到此的活动对象都还是Obj，函数还没有执行完毕，用that保存活动对象
 		return function(){			//return结束执行环境
 			return that.name;
 		}
 	}
 }


/*
 *块级作用域；两种写法：
 *所有变量、函数运行完成就销毁，一次性，建议for，while等循环使用
 */
(function(arguments){/*do something*/})(arguments);
(function(arguments){/*do something*/}(arguments));


/*
 *模块模式：实现单例
 *利用闭包得到一个包含拥有可对私有变量操作的函数的对象
 *一般用在应用级提示框等不可重复定义的对象
 */
 var warning = function(){
 	var oDiv = document.createElement('div');
 	oDiv.setAttribute('class','warning');
 	oDiv.innerText = 'warning';
 	return {
 		show:function(){
 			try{
 				document.body.appendChild(oDiv);
 			}catch(e){

 			}
 		},
 		hidden:function(){
 			try{
 				document.body.removeChild(oDiv);
 			}catch(e){

 			}
 			
 		}
 	}
 }();


/*
 *增强模块模式
 *适合单例必须是某种类型实例，还必须添加某些属性和方法
 */
 var application = function(){
 	var components = new Array();
 	components.push(new BaseComponent());
 	var app = new BaseComponent();
 	app.getComponentCount = function(){
 		return components.length;
 	};
 	app.registerComponent = function(component){
 		if(typeof component === 'Object'){
 			components.push(component);
 		}
 	};
 	return app;
 }();

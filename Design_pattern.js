//设计模式：js 原则：单一职责原则，里氏代换原则，依赖倒置原则，接口隔离原则，开闭原则，迪米特法则
//

//单例模式（singleton） 运用闭包实现私有的调用。

var singleton = (function(){
	var instance;
	class Singleton{
		constructor(){
			//...
		}
	}

	return {
		getInstance : function(){
			if(!instance){
				instance = new Singleton();
			}
			return instance;
		}
	};
})();

/*缓存实例实现*/

function Singleton(){
	if(typeof Singleton.instance === 'object'){
		return Singleton.instance;
	}

	//....

	Singleton.instance = this;
}

var singleton1 = new Singleton();
var singleton2 = new Singleton();

//构造器模式（constructor） class关键字可以实现类的定义，构造器使用，方法的公用

class Animal{
	constructor(args){
		//...
	}

	behavior(act){				//class中的方法存在于类的原型（prototype）中，所以是共有的；
		console.log(`${this.name} can ${act}`);
	}
}


//建造者模式（builder） 将一个复杂的对象进行构建与表示的分离，以应对不同功能的变化对整体的影响。（解耦）

class Product{
	constructor(){
		//...
	}

	//...
}

class Builder{

	constructor(){
		this.production = new Product();
	}

	get product(){
		return this.production;
	}

	setProduct(args){
		//...
	}
}

class Director(){

	constructor(){
		this.builder = new Builder();
	}

	buildProduct1(args){
		//...
		builder.setProduct(args);
		return builder.product;
	}

	buildProduct2(args){
		//...
		builder.setProduct(args);
		return builder.product;
	}

}

/*回调函数实现*/

function director(builder,args){
	//...
	if(typeof builder === 'function'){
		builder(args);
	}

}

function builder(args){
	//...
}


//工厂模式（factory）处理复杂对象，依赖环境创造不同实例，处理有大量相同属性的小对象

function factory(type,args){
	if(typeof type === 'string'){
		let product = {
			product1 : function(args){
				//...
				return product1;
			};

			product2 : function(args){
				//...
				return product2;
			}
		};
		return product[type](args);
	}

	return 0;
}


//装饰者模式（Decorator）动态的给一个对象添加新的功能

function product(){
	this.eat = () =>{
		console.log('找东西吃');
	}
}

function decoratorApple(product){

	this.eat = () =>{
		product.eat();
		console.log('找到苹果');
	}
}

function decoratorPear(product){

	this.eat = () =>{
		product.eat();
		console.log('找到梨子');
	}
}

var product = new product();
var decorator = new decoratorPear(new decoratorApple(product));

decorator.eat();


/*高级写法*/

var tree = {};
tree.decorate = function () {
    console.log('Make sure the tree won\'t fall');
};

tree.getDecorator = function (deco) {
    tree[deco].prototype = this;			//设置tree[deco]构造器原型为tree，实现继承
    return new tree[deco];					//返回一个tree[deco]实例
};

tree.RedBalls = function () {
    this.decorate = function () {
        this.RedBalls.prototype.decorate(); // 第7步：先执行原型（这时候是Angel了）的decorate方法
        console.log('Put on some red balls'); // 第8步 再输出 red
        // 将这2步作为RedBalls的decorate方法
    }
};

tree.BlueBalls = function () {
    this.decorate = function () {
        this.BlueBalls.prototype.decorate(); // 第1步：先执行原型的decorate方法，也就是tree.decorate()
        console.log('Add blue balls'); // 第2步 再输出blue
        // 将这2步作为BlueBalls的decorate方法
    }
};

tree.Angel = function () {
    this.decorate = function () {
        this.Angel.prototype.decorate(); // 第4步：先执行原型（这时候是BlueBalls了）的decorate方法
        console.log('An angel on the top'); // 第5步 再输出angel
        // 将这2步作为Angel的decorate方法
    }
};

tree = tree.getDecorator('BlueBalls'); // 第3步：将BlueBalls对象赋给tree，这时候父原型里的getDecorator依然可用
tree = tree.getDecorator('Angel'); // 第6步：将Angel对象赋给tree，这时候父原型的父原型里的getDecorator依然可用
tree = tree.getDecorator('RedBalls'); // 第9步：将RedBalls对象赋给tree

tree.decorate(); // 第10步：执行RedBalls对象的decorate方法


//外观模式（Facade）将多个接口封装起来，只提供一个简单的对外接口

/*常见的就是实现跨浏览器调用接口*/

var addMyEvent = function (el, ev, fn) {
    if (el.addEventListener) {
        el.addEventListener(ev, fn, false);
    } else if (el.attachEvent) {
        el.attachEvent(`on${ev}`, fn);
    } else {
        el[`on${ev}`] = fn;
    }
}; 


//*？代理模式（Proxy）通过代理对象控制具体对象的引用，不需要考虑对象是什么，只要知道代理能做什么

var product = {};

function proxy(target) {
	this.handler = function() {
		//...
	}
}

var proxy = new proxy(product);

proxy.handler();


//观察者模式（Publish）定义一种一对多的关系，使观察者对象同时监听一个发布对象， 当发布对象更新时，自动向所有观察者对象发布信息，
//发布对象应提供订阅，发布，退订3种方法

var observer = {
    //订阅
    addSubscriber: function (callback) {
        this.subscribers[this.subscribers.length] = callback;
    },
    //退订
    removeSubscriber: function (callback) {
        for (var i = 0; i < this.subscribers.length; i++) {
            if (this.subscribers[i] === callback) {
                delete (this.subscribers[i]);
            }
        }
    },
    //发布
    publish: function (what) {
        for (var i = 0; i < this.subscribers.length; i++) {
            if (typeof this.subscribers[i] === 'function') {
                this.subscribers[i](what);
            }
        }
    },
    // 将对象o具有观察者功能
    make: function (o) { 
        for (var i in this) {
            o[i] = this[i];
            o.subscribers = [];
        }
    }
};

var blogger = {										//定义blogger和user发布者并通过make方法将他们变成发布者
    recommend: function (id) {
        var msg = 'dudu 推荐了的帖子:' + id;
        this.publish(msg);							//publish方法会自动调用
    }
};

var user = {
    vote: function (id) {
        var msg = '有人投票了!ID=' + id;
        this.publish(msg);
    }
};

observer.make(blogger);
observer.make(user);

var tom = {
    read: function (what) {
        console.log('Tom看到了如下信息：' + what)
    }
};

var mm = {
    show: function (what) {
        console.log('mm看到了如下信息：' + what)
    }
};
// 订阅
blogger.addSubscriber(tom.read);
blogger.addSubscriber(mm.show);
blogger.recommend(123); //调用发布

//退订
blogger.removeSubscriber(mm.show);
blogger.recommend(456); //调用发布

//另外一个对象的订阅
user.addSubscriber(mm.show);
user.vote(789); //调用发布


//策略模式（Strategy）将一系列作用相同，实现不同的算法做成集合

var validator = {

    // 所有可以的验证规则处理类存放的地方，后面会单独定义
    types: {},

    // 验证类型所对应的错误消息
    messages: [],

    // 当然需要使用的验证类型
    config: {},

    // 暴露的公开验证方法
    // 传入的参数是 key => value对
    validate: function (data) {

        var i, msg, type, checker, result_ok;

        // 清空所有的错误信息
        this.messages = [];

        for (i in data) {
            if (data.hasOwnProperty(i)) {

                type = this.config[i];  // 根据key查询是否有存在的验证规则
                checker = this.types[type]; // 获取验证规则的验证类

                if (!type) {
                    continue; // 如果验证规则不存在，则不处理
                }
                if (!checker) { // 如果验证规则类不存在，抛出异常
                    throw {
                        name: "ValidationError",
                        message: "No handler to validate type " + type
                    };
                }

                result_ok = checker.validate(data[i]); // 使用查到到的单个验证类进行验证
                if (!result_ok) {
                    msg = "Invalid value for *" + i + "*, " + checker.instructions;
                    this.messages.push(msg);
                }
            }
        }
        return this.hasErrors();
    },

    // helper
    hasErrors: function () {
        return this.messages.length !== 0;
    }
};

// 验证给定的值是否不为空
validator.types.isNonEmpty = {
    validate: function (value) {
        return value !== "";
    },
    instructions: "传入的值不能为空"
};

// 验证给定的值是否是数字
validator.types.isNumber = {
    validate: function (value) {
        return !isNaN(value);
    },
    instructions: "传入的值只能是合法的数字，例如：1, 3.14 or 2010"
};

// 验证给定的值是否只是字母或数字
validator.types.isAlphaNum = {
    validate: function (value) {
        return !/[^a-z0-9]/i.test(value);
    },
    instructions: "传入的值只能保护字母和数字，不能包含特殊字符"
};

var data = {
    first_name: "Tom",
    last_name: "Xu",
    age: "unknown",
    username: "TomXu"
};

validator.config = {
    first_name: 'isNonEmpty',
    age: 'isNumber',
    username: 'isAlphaNum'
};

validator.validate(data);

if (validator.hasErrors()) {
    console.log(validator.messages.join("\n"));
}


//
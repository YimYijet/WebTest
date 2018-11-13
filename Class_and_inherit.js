//虽然javascript没有类，但它还是面向对象的，所有对象都是继承Object
//对象属性类型有两种：1.数据属性，2.访问器属性


/*
 *数据属性包含一个数据值的位置，有4个内部值（特性）放在[[]]里
 *[[Configurable]]：能否delete，修改特性，修改为访问器属性，默认为true
 *[[Enumberable]]：能否for-in，默认为true
 *[[Writable]]：能否修改，默认为true
 *[[Value]]：数据值，默认为undefined
 *可通过Object.defineProperty()方法修改特性；三个参数：对象名，属性名，字面量对象
 */
var obj = {}
Object.defineProperty(obj, 'proto', {
	configurable: true, //若将configurable设置为false，obj.proto将无法修改，删除，特性无法修改，configurable不可在设为true
	enumberable: true,
	writable: true,
	value: 'value'
})

/*
 *访问其属性没有数据值，但有一对get,set方法（可选）
 */
var obj = {
	name: 'jack',
	age: 20
}
Object.defineProperty(obj, 'proto', {
	set: function (val) {
		this.name = val //注意：定义的时候不能调用要定义的属性，如：this.proto，会造成栈溢出
	},
	get: function () {
		return this.age
	}
})

Object.defineProperties(Obj, { //定义多属性
	proto: {
		configurable: true,
		enumberable: true,
		writable: true,
		value: 'value'
	},
	name: {
		set: function (val) {
			this.proto = val
		},
		get: function () {
			return this.proto
		}
	}

})

var des = Object.getOwnPropertyDescriptor(obj, 'proto') //读取特性
des.value
des.configurable //...


/*
 *创建对象：对象创建大致有三种方法：字面量，构造函数，prototype；但通过这三种方法，有很多模式
 */

/*
 *工厂模式：可以封装复杂的对象创建
 */
function createObj(name, age) {
	var obj = {}
	obj.name = name
	obj.age = age
	obj.eat = function () {
		console.log(this.name + ' is eating!')
	}
	return obj
}
var cat = createObj('cat', 1)

/*
 *构造函数模式
 *构造函数执行过程：
 *1.创建一个新对象，2.作用域链执行到构造函数作用域，并将其赋给新对象（this指向新对象）
 *3.执行函数体，4.返回新对象
 *构造函数也可以作为函数调用，此时this指向window，就是为window添加属性，方法
 *构造函数每一个实例都占有独立的内存，即使是公用的方法，很消耗资源
 */
function Obj(name, age) {
	this.name = name
	this.age = age
	this.eat = function () {
		console.log(this.name + ' is eating!')
	}
}
var cat = new Obj('cat', 1)

/*
 *原型模式
 *每一个函数都有一个属性prototype，prototype指向一个对象，可以通过在这个原型对象中添加属性，方法
 *通过原型模式创建的引用指向同一块内存，即prototype指向的对象
 *prototype对象有一个不可遍历（enumerable）的属性constructor，这个属性指向对象的构造函数，再不指明的情况下为Object，要指明
 *新建的对象同样可以添加属性，方法，如果与原型中名称相同，则覆盖原型中属性方法（就是不用了，原型的还在）
 *因为是同一个对象，所以所有修改的值都是公有的（全改了），但也因为如此，随时添加属性、方法，先前定义的对象一样可以用
 */
function Obj() {

}
Obj.prototype.name = 'cat'
Obj.prototype, age = 1
Obj.prototype.eat = function () {
	console.log(this.name + ' is eating!')
}
//或
Obj.prototype = {
	name: 'cat',
	age: 1,
	eat: function () {
		console.log(this.name + ' is eating!')
	}
}
//最后修改constructor，enumerable为false
Object.defineProperty(Obj.prototype, 'constructor', {
	value: Obj,
	enumberable: false
})
var cat = new Obj()

/*
 *组合模式 
 *属性用构造函数定义，方法用原型定义，但没有封装
 */
function Obj(name, age) {
	this.name = name
	this.age = age
}
Obj.prototype.eat = function () {
	console.log(this.name + ' is eating!')
}
var cat = new Obj('cat', 1)

/*
 *动态原型模式（就他，就用他）
 *原型定义在构造函数内，判断函数是否存在，不存在就重新定义，第二次不会重新定义方法
 */
function Obj(name, age) {
	this.name = name
	this.age = age
	if (typeof Obj.prototype.eat !== 'function') {
		Obj.prototype.eat = function () {
			console.log(this.name + ' is eating!')
		}
	}
}
var cat = new Obj('cat', 1)

/*
 *寄生构造函数模式
 *当上面都不好使的时候用，就是工厂模式，用new调用
 */
function Obj(name, age) {
	var obj = new Object()
	obj.name = name
	obj.age = age
	obj.eat = function () {
		console.log(this.name + ' is eating!')
	}
	return obj
}
var cat = new Obj('cat', 1)


/*
 *继承
 */

/*
 *原型链式继承
 *子构造函数的原型有一个引用指向父构造函数的原型，而父构造函数的原型有一个指向父构造函数的指针，这就是原型链
 *原型链的属性，方法一样是一层一层从底层向上查找
 *原型链继承，子类的constructor指向的是父类的构造函数
 *原型链使父类的属性变成子类属性，无法自定义，而且给子类的原型添加属性是，所有的子类实例都共享数据
 */
function Animal(name, age) {
	this.name = name
	this.age = age
}
Animal.eat = function () {
	console.log(this.name + ' is eating!')
}

function Person(job) {
	this.job = job
}
Person.prototype = new Animal('jack', 20)
Person.prototype.work = function () {
	console.log(this.name + "'s job is" + this.job)
}
var person = new Person('programmer')

/*
 *借用构造函数继承
 *用call()方法将父类作用域赋值到子类上
 *方法不能复用，每个实例都重新开辟一块内存
 */
function Animal(name, age) {
	this.name = name
	this.age = age
	this.eat = function () {
		console.log(this.name + ' is eating!')
	}
}

function Person(name, age, job) {
	Animal.call(this, name, age)
	this.job = job
	this.work = function () {
		console.log(this.name + "'s job is" + this.job)
	}
}
var person = new Person('jack', 20, 'programmer')

/*
 *组合继承
 *缺点就是所有属性在对象上有，在原型上也有，重复构造
 */
function Animal(name, age) {
	this.name = name
	this.age = age
}
Animal.eat = function () {
	console.log(this.name + ' is eating!')
}

function Person(name, age, job) {
	Animal.call(this, name, age)
	this.job = job
}
Person.prototype = new Animal()
Person.prototype.work = function () {
	console.log(this.name + "'s job is" + this.job)
}
var person = new Person('jack', 20, 'programmer')

/*
 *原型式继承
 *以一个对象为基础创建另一个对象
 *Object.create()可以为两个参数，第一个为对象名，第二个为字面量对象（就是前面这个对象名的内容：属性、方法）
 */
var animal = {
	name: 'jack',
	age: 20,
	eat: function () {
		console.log(this.name + ' is eating!')
	}
}
var person = Object.create(animal)
person.job = 'programmer'
person.work = function () {
	console.log(this.name + "'s job is" + this.job)
}

/*
 *寄生式继承
 *使用原型设计模式
 */
function createPerson(original, job) {
	var person = Object.create(original)
	person.job = job
	person.work = function () {
		console.log(this.name + "'s job is" + this.job)
	}
}
var animal = {
	name: 'jack',
	age: 20,
	eat: function () {
		console.log(this.name + ' is eating!')
	}
}
var person = createPerson(animal, 'programmer')

/*
 *寄生组合式继承（就用他）
 *创建一个函数，用来是子类的原型克隆父类的原型，同时子类构造函数，继承父类构造函数
 */
function inherit(sub, sup) {
	var prototype = Object.create(sup.prototype)
	prototype.constructor = sub
	sub.prototype = prototype
}

function Animal(name, age) {
	this.name = name
	this.age = age
	if (typeof Animal.prototype.eat !== 'function') {
		Animal.prototype.eat = function () {
			console.log(this.name + ' is eating!')
		}
	}
}

function Person(name, age, job) {
	Animal.call(this, name, age)
	this.job = job
	if (typeof Person.prototype.work !== 'function') {
		Person.prototype.work = function () {
			console.log(this.name + "'s job is" + this.job)
		}
	}
}
inherit(Person, Animal)
var person = new Person('jack', 20, 'programmer')
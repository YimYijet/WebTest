//js数据在内存中存储在栈(stack)和堆(heap)中
//js的数据分为基本数据类型（值类型）和引用类型
//值类型有5种：null、undefined、number、boolean、string；
//引用类型有：function、Object、Array（typeof运算符的值有6个：number、Object、string、function、boolean、undefined）
//值类型数据因为值的大小固定，所以存放在栈内存中，引用类型内存随时都会发生变化存放在堆内存中，但至少有一个引用存放在栈中（否则会被回收内存）


/*
 *赋值运算：
 *进行的是栈内存中值的传递——就是说值类型传递的是值，引用类型传递的是指向同一块堆空间的引用
 */
var a = 'a';
function Obj(){
	this.name = 'tom';
}
var m = new Obj();
console.log(a + m.name);
var b = a, n = m;		//n指向的是和m同一个存放在堆中的对象
console.log(b + n.name);
b = 'b';
n.name = 'jack';		//n修改了对象的值，m也会修改，因为就是同一个
console.log(a + m.name);
console.log(b + n.name);


/*
 *参数传递：
 *函数的参数传递是值的传递，引用类型传递参数就是把参数arguments存入一个指向堆中数据的引用；
 *而不是对原来引用进行操作
 *参数是局部变量
 */
 function Obj(){
 	this.name = 'tom';
 }
 var m = new Obj();
 var a = 'a';
 function changeA(a){
 	a = 'b';
 	console.log(a);
 }
 function changeM(m){
 	m.name = 'jack';	//m参数指向Obj对象，修改的是堆中的数据
 	m = new Object();	//将m的引用指向一个新的对象
 	console.log(m.name);
 }
 changeA(a);
 changeM(m);
 console.log(a);		//值类型传递的是值，在函数中修改并不会影响原变量，局部变量的缘故
 console.log(m.name);	//Obj对象已经修改
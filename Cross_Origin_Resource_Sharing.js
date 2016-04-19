//跨源传输
//同源指的是：协议（protocol  http:），域名（hostname  www.baidu.com），端口（port  8080）全部相同。
//子域不同源 baike.baidu.con wenku.baidu.com


/*
 *document.domain + iframe 用于主域相同，子域不同
 *网页可以通过document.domain来设置其域名，默认的情况下为hostname，不同的子域可以设置同一个主域
 *如：wenku.baidu.com 可以这样设置 document,domain = 'baidu.com'
 *若两个网页的域名相同就可以用iframe来进行访问
 */
// www.a.com/a.html
 document.domaim = 'a.com';
 var oIfr = document.createElement('iframe');
 oIfr.src = 'http://test.a.com/b.html';
 oIfr.style['display'] = 'none';
 document.body.appendChild(oIfr);
 function getDoc(){
 	var doc = ifr.contentDocument||ifr.contentWindow.document;		//得到b.html文档
 	console.log(doc);
 }
 addEventListener('load',getDoc,false);
// test.a.com/b.html
 document.domaim = 'a.com';


/*
 *location.hash + iframe
 *hash是网页中的锚点，通过锚点可以聚焦到（focus）含有对应name或id的元素，改变hash不会重定向网页
 *若iframe的子窗口与父窗口不同源则不能修改父窗口的hash，即parent.location.hash在不同源的情况下无法修改
 *所以引入第三个网页且与父窗口同源，通过修改parent.parent.location.hash来传递数据
 */
// www.a.com/a.html
 var oIfr = document.createElement('iframe'); 
 oIfr.style['display'] = 'none';
 function sendData(data){	
 	oIfr = document.queryElement('iframe')||oIfr;	
 	oIfr.src = 'http://www.b.com/b.html#' + data;
 	if(!document.queryElement('iframe')){
 		document.body.appendChild(oIfr);
 	}

 }
 sendData('data'); //发送数据
 function handleData(){
 	var data = location.hash;
 }
 addEventListener('hashchange',handleData,false);
// www.b.com/b.html
 var oIfr = document.createElement('iframe'); 
 oIfr.style['display'] = 'none';
 function sendData(data){	
 	oIfr = document.queryElement('iframe')||oIfr;	
 	oIfr.src = 'http://www.a.com/c.html#' + data;
 	if(!document.queryElement('iframe')){
 		document.body.appendChild(oIfr);
 	}

 }
 function handleData(){
 	var data = location.hash;
 	//do something
 	sendData('somedata'); //发送数据
 }
 addEventListener('hashchange',handleData,false);
// www.a.com/c.html
 parent.parent.location.hash = self.location.hash.slice(1);


/*
 *window.name + iframe
 *在一个窗口或标签页打开后即使重定向，只要不是主动修改window.name，name不变
 *同样是在同源的情况下父窗口可以访问子窗口的window.name
 *利用contentWindow.location重定向到同源的页面，注意这个网页可以是空白的，最重要的是不能更改windwo.name
 *这样就能在同源的情况下访问windwo.name
 *因为利用重定向触发两次onload事件，所以要在文档加载完调用函数
 */
// www.a.com/a.html
 function getData(url,func){
 	var isFirst = true,oIfr = document.createElement('iframe');
 	oIfr = url;
 	oIfr.style['display'] = 'none';
 	document.body.appendChild(oIfr);
 	oIfr.addEventListener('load',funtion(){
 		if(isFirst){
 			oIfr.contentWindow.location = 'http://www.a.com/c.html';	//重定向
 			isFirst = false;
 		}else{
 			func(oIfr.contentWindow.name);			//处理数据
 			oIfr.contentWindow.close();  
 			document.body.removeChild(oIfr); 		//释放内存
 			oIfr.src = ''; 
 			oIfr = null;
 		}
 	},false);
 }
 window.onload = function(){
 	getData('http://www.b.com/b.html',function(data){
 		console.log(data);
 	});
 };
// www.b.com/b.html
 window.name = 'data';


/*
 *postMessage
 *有窗口window，contentWindow发送，窗口必须和origin同源
 */
// www.a.com/a.html
 contentWindow.postMessage('data','http://www.b.com/b.html');
 addEventListener('message',function(e){
 	if(e.origin=='http://www.a.com'){		//判断是否是自己接收消息
 		console.log(e.data);
 	}
 },false);
// www.b.com/b.html
 parent.postMessage('data','http://www.a.com/a.html');
 addEventListener('message',function(e){
 	if(e.origin=='http://www.b.com'){
 		console.log(e.data);
 	}
 },false);


/*
 *Jsonp
 *script的src属性是跨源的，src最后一个参数是一个回调函数用于处理返回的js
 *传输的js多为json，请求发送给服务器，服务器返回数据
 */
// www.a.com/a.html
 function handleData(response){
 	console.log(JSON.parse(response.data));
 }
 var script = document.createElement('script');
 function sendData(data){
 	script.src = 'http://www.b.com/json/?data=' + data + '&callback=handleData';
 	document.head.appendChild(script);
 }
 addEventListener('message',handleData,false);


/*
 *WebSocket
 *是一个要求服务器支持的全双工通信协议 ws://-->http:// wss://-->https:// 
 */
 var socket = new WebSocket('ws://www.b.com/socket');
 socket.send('data');
 addEventListener('message',function(e){
 	console.log(e.data);
 },false);


/*
 *Fetch
 *fetch()接受一个url作为参数，返回一个Promise对象，第二个参数是一个字面量对象
 *Fetch提供三个接口：Headers，Request，Response
 */
//简单实现
 fetch('/json').then(function(res){
 	if(res.ok){
 		res.json().then(function(data){
 			console.log(data.entries);
 		})else{
 			console.log(e);
 		}
 	}
 });
//Post请求
 fetch('/json',{
 	method:'POST',
 	headers:{'Content-Type':'application/x-www-form-urlencoded'},
 	body:'a=a&b=b'
 }).then(function(res){
 	if(res.ok){
 		res.json().then(function(data){
 			console.log(data.entries);
 		})else{
 			console.log(e);
 		}
 	}
 });
//Headers对象代表头文件，接收一个json作为参数
 var headers = new Headers({
 	'Content-Type':'text/plain'
 });
//方法：
 append('Content-Type','text/plain');		//向Headers中添加键值对
 delete('Content-Type');			//删除键值对
 entries().next().value;			//entries返回一个Iterator，next()返回一个对象包含一组键值对
 forEach(fn);			//接收一个function作为参数，遍历Headers
 forEach(function(i){
	console.log(i);		//i是键值对的值
 });
 get('Content-Type');	//通过键得值
 getAll('Content-Type');			//同get()，返回所有值
 has('Content-Type');	//判断是否有这个键
 keys();					//返回一个Iterator，next()返回一个对象包含一个键
 values();				//返回一个Iterator，next()返回一个对象包含一个值
 set('Content-Type','text/html');		//设置键值对，若无则添加
//传说有一个guard属性，没有暴露给web，但影响哪些内容可以在Headers中被改变
 'none'			//默认
 'request'			//从Request获得的Headers只读
 'request-no-cors'			//从不同域的Request获得的Headers只读
 'response'			//从Response获得的Headers只读
 'immutable'		//所有Headers只读
//Request请求资源，参数为url，method，headers，body，mode，credentials，cachehints
//url为第一个参数，不可封装进字面量，其余参数封装为字面量对象作为第二个参数（可选）
//mode属性决定是否跨域以及哪些Response可读
 'same-origin'		//确保请求同源，任何跨域请求返回error
 'no-cors'			//允许来自CDN脚本，其他域的图片，其他跨域资源，但请求method只能是'HEAD'，'GET'，'POST'资源
 //headers不可改写，Js不能访问Response属性
 'cors'			//body可读，有限的headers暴露给Response
//credentials枚举属性决定cookie是否能跨域得到有三个值：'omit'，'same-origin'，'include'
//Response响应，通常在fetch()回调中获取
//Response构造有两个参数，第一个为body，第二个为字面量对象，设置status，statusText，headers...
//属性status（即HTTP响应的status）默认值为200，statusText（即HTTP响应的reason）默认值为ok，当status为2字段状态码时，response.ok为true
//headers为响应头，url为来源url
//type属性表示响应类型
 'basic'		//正常，同源请求
 'cors'			//响应从一个合法跨域请求获得，一部分headers，body可读
 'error'		//网络错误，status为0，headers为null
 'opaque'		//响应以'no-cors'请求的跨域资源，依靠Server端做限制
//Response的body内容提供方法：blob()，json()，arrayBuffer()，text()
//body只能被读一次，用clone()方法可以实现多次读取，先clone在读

/*
 *CORS
 */
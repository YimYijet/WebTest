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
 *有窗口window，contentWindow发送
 */
// www.a.com/a.html
 postMessage('data','http://www.b.com/b.html');
 addEventListener('message',function(e){
 	if(e.origin=='http://.b.com'){
 		console.log(e.data);
 	}
 },false);
// www.b.com/b.html
 postMessage('data','http://www.b.com/b.html');
 addEventListener('message',function(e){
 	if(e.origin=='http://.b.com'){
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
 */
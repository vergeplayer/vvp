vvp.Player
===
vvp.Player 为vvp内置播放核心对象,提供了以下的外部接口

```js
   //创建player对象
   var myPlayer = new vvp.Player('#video_id',{
        autoplay:true
   });
   
```
##可调用方法
####播放相关方法
* play() 播放
* pause() 暂停
* load()  加载  
####事件处理方法:
* bind(type,fun,context); 绑定事件
* unbind(type,fun,context); 解除绑定事件
* one(type,fun,context); 绑定只执行一次的事件

```js
   //调用方法
   myPlayer.play();
   
   //该类方法可链式调用
    myPlayer.load().play().bind('play',function(){
        //doSomeThing
    });
```
play pause 特殊处理：
   
```js

    //单一入口 可以链式调用
    myPlayer..play().bind('play',function(){ console.log('PLAY')});
    
    //play
    myPlayer..play(function(){ console.log('PLAY')}); 绑定回掉事件并执行play方法
    myPlayer..play(function(){ console.log('PLAY')},false); 绑定回掉事件不执行play方法
``` 
----
## 获取or设置属性相关的方法
  * autoplay() 自动播放
  * height() 高度
  * width() 宽度
  * loop() 循环播放
  * preload() 预加载
  * src() 视频源
  * currentTime() 当前播放位置
  * paused() 视频是否暂停
  * poster() 缩略图
  * muted()  是否关闭声音
  * volume() 声音
  * playbackRate() 视频播放的速度
  * controls() 控制条
  
```js
  var autoFlag = myPlayer.autoplay();//获取player是否自动播放  
  //autoFlag == true
  
  myPlayer.autoplay(true);//设置player为自动播放 
  myPlayer.poster('http://r2.ykimg.com/05410408561B2C406A0A4B3346A9AD15');//设置缩略图
    
```
----
## 获取属性的相关方法(只读)
* duration(); 视频的长度s
* ended(); 是否已结束
* error(); 视频错误状态 MediaError
* currentSrc(); 当前视频的 URL
* buffered(); 已缓冲部分 TimeRanges
* played(); 已播放部分 TimeRanges
* readyState(); 视频当前的就绪状态
* seekable(); 视频可寻址部分 TimeRanges
* seeking();  是否正在视频中进行查找
* networkState(); 网络状态
* canPlayType(); 能够播放指定的视频类型
 
```js 

  myPlayer.duration();//视频的长度s
  
``` 
ended 特殊处理

```js 
    //回掉函数和只读获取属性的方法重名处理
    //ended
    myPlayer.ended(function(){ console.log('ended')});//绑定回掉事件并返回属性值
    //seeking
    myPlayer.ended(function(){ console.log('seeking')});//绑定回掉事件
    //error
    myPlayer.ended(function(){ console.log('ended')});//绑定回掉事件
``` 
----
## 回掉函数    
* abort(function(){})
* canPlay(function(){})
* canPlayThrough(function(){})
* durationChange(function(){})
* emptied(function(){})
* ended(function(){})
* error(function(){})
* loadedData(function(){})
* loadedMetaData(function(){})
* loadStart(function(){})
* pause(function(){})
* play(function(){})
* playing(function(){})
* progress(function(){})
* rateChange(function(){})
* readyStateChange(function(){})
* seeked(function(){})
* seeking(function(){})
* stalled(function(){})
* suspend(function(){})
* timeUpdate(function(){})
* volumeChange(function(){})
* waiting(function(){})
* fullScreenChange(function(){})
* fullWindowChange(function(){})

```js 
    //回掉函数
    myPlayer.canPlay(function(){ console.log('canPlay')});//绑定回掉事件
``` 

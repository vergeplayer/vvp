基本原则
　　
应避免使用 @import。
@import 相当于把 标签放在页面的底部，因此从优化性能的角度考虑，该避免使用。
@charset "utf-8";
避免使用 CSS Expressions
尽量避免CSS hacks

16进制颜色值简写
使用CSS缩写属性　　CSS有些属性是可以缩写的，比如padding,margin,font等等，这样精简代码同时又能提高用户的阅读体验。

/* Not recommended */
color: #eebbcc;
/* Recommended */
color: #ebc;

属性值简写
 margin-top: 2px; 
 margin-right: 5px; 
 margin-bottom: 2em; 
 margin-left: 15px;     
 -----<<     
 margin: 2px 5px 2em 15px;  
 
 border-width: 1px; 
 border-style: solid; 
 border-color: #000     
 -----<<     
 border: 1px solid #000  
 
 font-style: italic; 
 font-variant: small-caps; 
 font-weight: bold; 
 font-size: 1em; 
 line-height: 140%; 
 font-family: sans-serif;  
 -----<<  
 font: italic small-caps bold 1em 140% sans-serief;  
 
 background-color: #f00; 
 background-image: url(background.gif); 
 background-repeat: no-repeat; 
 background-attachment: fixed; 
 background-position: 0 0;   
 -----<<
 background: #f00 url(background.gif) no-repeat fixed 0 0;
   
 list-style-type: square; 
 list-style-position: inside; 
 list-style-image: url(image.gif)  
 -----<< 
 list-style: square inside url(image.gif);
  

抽取相似部分
.class1{position: absolute; left: 20px; top: 30px;}
.class2{position: absolute; left: 20px; top: 30px;}
.class3{position: absolute; left: 20px; top: 30px;}
.class4{position: absolute; left: 20px; top: 30px;}
.class5{position: absolute; left: 20px; top: 30px;}
.class6{position: absolute; left: 20px; top: 30px;}  
--------------------<<<<<<<  
.class1 .class2 .class3 .class4 .class5 .class6{ Position: absolute; left: 20px; top: 20px; }



使用带有语义的id和class
/* Not recommended: meaningless */
#yee-1901 {}
/* Not recommended: presentational */
.button-green {}.clear {}
/* Recommended: specific */
#gallery {}#login {}.video {}
/* Recommended: generic */
.aux {}.alt {}

省略零值的单位
margin: 0;padding: 0;

省略起始的零
font-size: .8em;

　　尝试换种解决方案
　　2.13 为末尾的声明添加分号
　　尽管省略末尾分号可以省略一个字节，但是非常不利于团队维护，得不偿失
/* Not recommended */
.test {  
display: block;  
height: 100px
}
/* Recommended */
.test {  
display: block;  
height: 100px;
}

背景色简写
背景色简写也可节省字节，但要慎用，因为省略掉的默认属性会覆盖前面的属性。
background-color: blue;
background: blue;


尽量避免全局选择器
尽量避免后代选择器


注释
/*CSS Document */         //css文档
/*Style for 项目名称*/               //给某项目的样式
/*Editor:hyy,10.24.2011*/           //编辑人/日期
/*Common style*/                    //公共样式
/*User-defined global style*/       //自定义全局样式
/*Common Pages style*/             //公共页面用样式

命名
　　注意事项::　　
   1.一律小写;
　　2.尽量用英文;
　　3.不加中槓和下划线;
　　4.尽量不缩写，除非一看就明白的单词。



书写顺序　　
   1.位置属性(position, top, right, z-index, display, float等)
　　2.大小(width, height, padding, margin)
　　3.文字系列(font, line-height, letter-spacing, color- text-align等)
　　4.背景(background, border等)
　　5.其他(animation, transition等)



　　文件名中不应有空格
　　a) 有空格的文件名会被Google当成两个关键字，可能带来更多的搜索结果，引来更多流量，是好事
　　b) 有空格意味着不能省略引号，多了两个字节
　　c) 空格会被浏览器自动转换为%20，老的浏览器可能不支持，如果将%20硬编码到URL中则每个实例中都多了两个字符
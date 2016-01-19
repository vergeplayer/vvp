#编码规范
##文档类型声明
每一个页面必须声明Dtd，标识出符合w3c的规范。
```html
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" 
"http://www.w3.org/TR/html4/loose.dtd">
```
使用html5编写页面，则用html5的声明：
```html
<!DOCTYPE html>
```
## 头部声明
文档和编码声明必须使用UTF-8编码格式


## 标签及属性全部小写
html标签（包括属性）要求全部小写，不允许全部大写或者大小写混杂；
例如：<BODY>必须写成<body> 、<TITLE>必须写成<title>等。

## 标签必须闭合
html所有标签都要求必须关闭。如果是单独不成对的标签，在标签最后加一个“/”来关闭它。

## 属性值必须用引号""括起来
元素的属性值必须使用引号，并且有有相应的单位。如:
```html
<!----错误写法-->
<table width=600px border="1"></table>
<!----正确写法-->
<table width="600px" border="1"></table>，
```
特殊情况，如果你需要在属性值里使用单引号和双引号，你可以用“&#039;”和“&quot;”，

## 所有属性要赋值
所有属性都必须有一个值，没有值的就重复本身。如:
```html
<video autoplay="true"></video>
```

## other
把CSS放在HTML页面头部
除特殊情况外，对于必须在当前页面进行加载才能展现效果的JavaScript代码，可以写在当前页面中。
除特殊情况外，JavaScript程序应在html页面尾部调用，这样，即不影响页面正常加载时间，又能在后期调用的时候直接使用，可以加快页面加载速度。
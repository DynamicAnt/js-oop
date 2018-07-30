#  JavaScript 等于的区别
 
 当你作为一个javascript新手时在学习如下内容后就不会在感到困惑
 ```javascript
 if ([0]) {
    console.log([0] == true); //false
    console.log(!![0]); //true
}
或者…
if ("potato") {
    console.log("potato" == false); //false
    console.log("potato" == true); //false
}
```

好消息是有一个标准，所有浏览器都遵循它。有些作者会告诉你避免去进行代码的强制转换。我想告诉你的是强制转换是一种特征(至少我们需要理解)，而不是去避免。

x是否为true?x = y吗?JavaScript三个主要领域的核心问题:条件语句和操作符(if、&、||等)、等号操作符(`==`)和严格的等号操作符(===)。让我们看看每种情况下会发生什么……

条件语句
在JavaScript中，所有条件语句和操作符都遵循相同的强制转换的规则。我们将使用if语句作为例子。<br>
构造if(表达式)语句将使用抽象方法ToBoolean来求表达式的结果，ES5规范定义了以下算法:


Argument Type | Result
---|---
Undefined | false
Null | false
Boolean | 结果等于输出的参数(没有转化)
Number | 如果参数为+0， -0，或者NaN结果为false;<br>否则结果为true。
String | 如果参数为空字符串(他的长度为0)结果为false;<br>否则结果为true。
Object | true

通过JavaScript规则可以将值分类为truthy (true, "potato", 36, [1,2,4]and {a:16}) 或者falsey (false, 0, "", null  and  undefined)。

现在我们可以看到为什么，在介绍示例中，if([0])允许进入后续的模块:一个数组是一个对象，而所有对象都为true。

这里还有一些例子。有些结果可能令人惊讶，但它们始终遵循上述简单规则:
 ```javascript
var trutheyTester = function(expr) {
    return expr ? "truthey" : "falsey"; 
}
trutheyTester({}); //truthey (对象总是为true)
 
trutheyTester(false); //falsey
trutheyTester(new Boolean(false)); //truthey (对象)
 
trutheyTester(""); //falsey
trutheyTester(new String("")); //truthey (对象)
 
trutheyTester(NaN); //falsey
trutheyTester(new Number(NaN)); //truthey (对象)
 ```
 
##  等号操作符(`==`）
 `==`等于的写法是相对自由的。即使值是不同的类型，也可以认为值是相等的，因为操作符在执行比较之前会强制将一个或两个操作符强制转换为单个类型(通常是数字)。许多开发人员发现这有点可怕，毫无疑问就会有的JavaScript专家提出建议避免去使用==操作符。

我们不能一直去回避，恐惧和逃避是影响我们在学习一门新的语言时的最大障碍。你可能一直会假装==不存在，而这不会让你在理解强制转换时摆脱困境，因为JavaScript强制转换无处不在! 它可能在条件表达式中(正如我们刚才看到的)，也可能在数组的索引中，或者在与它相关联的参数中等等。更重要的是，当你在用法正确时会是你的代码更加使用简洁、优雅和可读。

不管怎样，我们先来看看ECMA是如何定义==的工作机制的，真的没有那么害怕，只要记住，undefined和null是相等的(没有别的)，大多数其他类型都被强制转换成一个数字来进行比较:


Type(x) | Type(y) | Result
---|---|---
x和y是相同的类别| |参见严格等式(===)算法
null | Undefined | true
Undefined | null | true
Number | String | x == toNumber(y)
String | Number | toNumber(x) == y
Boolean | (any) | toNumber(x) == y
(any) | Boolean | x == toNumber(y)
String or Number | Object | x == toPrimitive(y)
Object | String or Number | toPrimitive(x) == y
otherwise | | false

结果表达式中，算法被重新运用，直到输出一个boolean值。toNumber和toPrimitive都是通过如下的规则来转换参数的函数内部的方法:

#### ToNumber
Type(x) | Result
---|---
Undefined | NaN
Null | +0
Boolean | 如果参数为true，结果为1；<br>如果参数为false，结果为0
Number | 结果等于参数本身(没有转变)
String | “abc” -> NaN<br>“123” -> 123
Object | 遵循如下的步骤:<br>1. 使用ToPrimitive()返回结果.<br>2. 使用 ToNumber()返回最终值.

#### ToPrimitive
Argument Type | Result
---|---
Object |(在等式运算符强制转换的情况下) 如果valueOf <br>方法返回了一个原始值, 就返回它. 否则使用 <br>toString 方法，如果返回了一个原始值，就返回它. 否则<br>抛出一个错误
otherwise… | 结果等于参数本身(没有转变)

注解：1. valueOf() 方法可返回 Boolean 对象的原始值<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;2.toString() 方法可把一个逻辑值转换为字符串，并返回结果。

这里有一些例子——我将使用伪代码一步一步地演示如何应用强制算法:

### [0] == true;
```javascript
//相等的检测...
[0] == true; 
 
//它如何工作...
//使用toNumber方法转化boolean值
[0] == 1;
//使用toPrimitive方法转化对象
//[0].valueOf() 返回的不是一个原始值，所以使用
//[0].toString() -> "0"
"0" == 1; 
//使用toNumber方法转化字符串
0 == 1; //false!
```

### “potato” == true;
```javascript
//相等的检测...
"potato" == true; 
 
//它如何工作...
//使用toNumber方法转化boolean值
"potato" == 1;
//使用toNumber方法转化字符串
NaN == 1; //false!
```

### “potato” == false;
```javascript
"potato" == false; 
 
//它如何工作...
//使用toNumber方法转化boolean值
"potato" == 0;
//使用toNumber方法转化字符串
NaN == 0; //false!
```

### object with valueOf
```javascript
//相等的检测...
crazyNumeric = new Number(1); 
crazyNumeric.toString = function() {return "2"}; 
crazyNumeric == 1;
 
//它如何工作...
//使用 toPrimitive方法转化对象
//valueOf 返回一个原始值，所以使用这个
1 == 1; //true!
```

### object with toString
```javascript
//相等的检测...
var crazyObj  = {
    toString: function() {return "2"}
}
crazyObj == 1; 
 
//它如何工作...
//使用 toPrimitive方法转化对象
//valueOf 方法返回了一个对象，所以使用toString方法
"2" == 1;
//使用toNumber方法转化字符串
2 == 1; //false!
```

## 严格等号操作符 (===)
这个很容易。如果参数为不同的类型，那么答案总是为false。如果它们属于同一类型，则在进行通常的等于判断:对象标识符必须引用相同的对象，字符串必须包含相同的字符集，其他的原始值必须共享相同的值。。NaN、null和undefined都不会===其他类型。NaN甚至不等于=本身

Type(x) | Values | Result
---|---|---
Type(x)和Type(y)是不同的类别| |false
Undefined or Null| | true
Number | x和y值相同(但不为NaN) | true
String | x和y是相同的字符 | true
Boolean |  x和y值都为true或者都为false  | true
Object | x和y指向相同的对象 | true
otherwise… | | false

常规的列子
```javascript
//unnecessary
if (typeof myVar === "function");
 
//better
if (typeof myVar == "function");
..因为typeOf 返回一个string, 这个操作将会一直比较两个string. 因此==是100%不会受影响的

//unnecessary
var missing =  (myVar === undefined ||  myVar === null);
 
//better
var missing = (myVar == null);
…null 和 undefined 等于自身

注意:由于(非常小的)风险，未定义的变量可能被重新定义，将其等同于null会稍微安全一些。
//unnecessary
if (myArray.length === 3) {//..}
 
//better
if (myArray.length == 3) {//..}
```

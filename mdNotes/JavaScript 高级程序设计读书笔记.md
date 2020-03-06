# **JavaScript 高级程序设计读书笔记**

### JavaScript 实现
#### JavaScript 核心
1. ECMAScript：提供核心语言功能
2. DOM (文档对象模型)：提供访问和操作网页内容的方法和接口
3. BOM (浏览器对象模型)：提供与浏览器交互的方法和接口

#### 数据类型
##### 简单数据类型（基本数据类型）：

- `String`: 字符串
- `Number`: 数字
- `Boolean`: 布尔值
- `undefined`: 未初始化的值
- `Null`: 空对象指针

##### 复杂数据类型：Object

#### 数据检测
##### typeof 检测数据类型可返回：
- `string`
- `number`
- `boolean`
- `undefined`
- `object`
- `function`

##### instanceof 检测引用类型数据返回布尔值：
- `Object`
- `Array`
- `Date`
- `RegExp`
- `Function`



#### 基本包装类型
ECMAScript 提供了3个特殊的引用类型：`Boolean`，`Number`和`String`
1. 引用类型和基本包装类型的区别在于对象的生存期：a) 使用new创建的引用类型的实例，一直会被保存至执行流离开当前作用域。b) 而自动创建的基本包装类型的对象，只存在于一行代码的执行瞬间。

### 变量和函数
#### 变量
- 初始化未经声明的变量，会创建一个全局变量。
- 基本类型值被保存在栈内存中，而引用类型的值是对象，被保存在堆内存中。
- 包含引用值的变量实际上不包含对象本身，而是一个指向该对象的指针。因此，引用类型的值的复制，实际上复制的是指针，并且都指向同一个对象。
#### 函数
- 函数的作用域及其所有变量都会在函数执行结束后被销毁。
- 创建并立即调用一个函数，既可以执行其中的代码，又防止了在内存中留下该函数的引用。
- 函数内部有两个特殊的对象：`arguments`和`this`，通过调用`arguments.callee()`可以递归函数本身。
- 每个函数都包含两个属性：`length`和`prototype`。
### 作用域
- 当代码在一个环境中执行时（执行流进入一个新执行环境），会创建变量对象的一个作用域链。作用域链的作用是保证对执行环境有权访问的所有变量和函数的有序访问。
- 作用域链本质上是一个指向变量对象的指针列表，它只引用但不实际包含变量对象。


### 方法
#### Object 方法
1. `toLocaleString()`根据机器本地环境返回对象的字符串。
2. `toString()`返回对象的字符串。
3. `valueOf()`返回原始值。

#### 数组方法
`Array.prototype.slice.call(array-like)`可以将类数组对象（如：arguments和节点列表）转换成一个新数组。只需要将该方法绑定到这个对象上。
##### 栈方法
1. `push(newItems)`数组末端推入项，返回新长度。
2. `pop()`数组末尾删除一项，返回被删除项。
##### 队列方法
1. `unshift(newItems)`数组前端推入项，返回新长度。
2. `shift()`数组前端删除一项，返回被删除项。
##### 排序方法
1. `reverse()`倒序排列。
2. `sort(callback(value1, value2))` 规则：若value1需要排在value2前面则返回-1，反正返回1 
##### 操作方法
1. `join(separator)`合并数组各项，返回字符串。
2. `concat(newItems)`合并数组，返回新数组。
3. `slice(start, end)`截取数组，返回截取段。
4. `splice(start, num, newItems)`删除/插入/替换，返回被删除项。
##### 位置方法
1. `indexOf(item)`查询下标，返回下标。
2. `lastIndexOf(item)`查询下标，从末端开始算，返回下标。
##### 迭代方法
1. `every(callback(item, index))`当所有项满足条件，返回`true`。
2. `some(callback(item, index))`当某一项满足条件，返回`false`。
3. `filter(callback(item, index))`返回由所有满足条件的项组成的新数组。
4. `map(callback(item, index))`操作每一个项，返回新数组。
5. `forEach(callback(item, index))`操作每一个项，无返回值。
##### 归并方法
1. `reduce(callback(pre, cur, index)`返回归并后的值。
2. `reduceRight(callback(pre, cur, index)`从末端开始，返回归并后的值。

#### 字符串方法
##### 字符方法
1. `charAt(index)`查询字符，返回字符。
2. `charCodeAt(index)`查询字符，返回字符编码。
##### 操作方法
1. `split(separator)`分离字符串，返回数组。
1. `concat(items)`合并字符串，返回新字符串。
2. `slice(start, end)`截取字符串返回被截取的字符串。
3. `substring(start, end)`截取字符串，返回被截取的字符串。
3. `substr(start, num)`截取字符串，返回被截取的字符串。
##### 位置方法
1. `indexOf(item)`查询下标，返回下标。
2. `lastIndexOf(item)`查询下标，返回下标。
##### 大小写切换
1. `toLocaleUpperCase()`根据机器本地环境返回大写字符串。
2. `toUpperCase()`返回大写字符串。
3. `toLocaleLowerCase()`根据机器本地环境返回小写字符串。
4. `toLowerCase()`返回小写字符串。

#### Math方法
在所有代码执行之前，作用域中就存在两个内置对象：Global和Math。其中Global对象不可直接被访问，而是由window对象来承担Global角色。Math对象提供很多属性和方法用于完成复制的数学计算任务。
##### 常用Math方法
1. `Math.min(numbers)`求一组数中的最大值。
2. `Math.max(numbers)`求一组数中的最大值。
3. `Math.ceil(number)`向上舍入。
4. `Math.floor(number)`向下舍入。
5. `Math.round(number)`标准四舍五入。
6. `Math.random()`返回大于等于0小于1的随机数。
7. `Math.abs(number)`返回绝对值。

### 理解对象
ECMAScript中有两种属性：数据属性和访问器属性。
#### 数据属性
- `[[Configurable]]`属性能否删除/重写属性，能否修改属性的特性
- `[[Enumerable]]`属性能否枚举
- `[[Writable]]`能否修改属性的值
- `[[Value]]`属性的数据值
#### 访问器属性
- `[[Configurable]]`属性能否删除/重写属性，能否修改属性的特性
- `[[Enumerable]]`属性能否枚举
- `[[Get]]`读取属性时调用的函数
- `[[Set]]`写入属性时调用的函数

#### 定义属性
1. 通过`Object.defineProperty()`修改单个属性的特性。
```
Object.defineProperty(obj, property, {
    configurable: true,
    writable: true,
    ...
})
```

2. 通过`Object.defineProperties()`修改多个属性的特性。

```
Object.defineProperties(obj, {
    name: {
        value: "Tom",
        writable: true,
    },
    age: {
        configurable: true,
        get: function(){
            ...
        },
        set: function(){
            ...
        }
    },
    value:{
        writable: false
    }
})
```

### 创建对象
#### 工厂模式

```
function factoryModel(name, age){
    var ojb = new Object();
    obj.name = name;
    obj.age = age;
    obj.sayName = function(){
        console.log(this.name)
    }
} 

var person1 = factoryModel("Tom", 27);
```

#### 构造函数模式

```
function ConstructorModel(name, age){
    this.name = name;
    this.age = age;
    this.sayName = function(){
        console.log(this.name)
    }
} 

var instance = new ConstructorModel("Tom", 27);
```

#### 原型模式

```
function PrototypeModel(){};
PrototypeModel.prototype.name = "Tom";
PrototypeModel.prototype.age = "27";
PrototypeModel.prototype.sayName = function(){
        console.log(this.name)
    }

var instance = new PrototypeModel();
```

#### 组合使用构造函数和原型模式

```
function CombinedModel(name, age){
    this.name = name;
    this.age = age;
}

CombinedModel.prototype.sayName = function(){
        console.log(this.name)
    }
    
var instance = new CombinedModel("Tom", 27);
```

#### 动态原型模式

```
function DynamicPrototype(name, age){
    this.name = name;
    this.age = age;
    if(typeof this.sayName != function){
        DynamicPrototype.prototype.sayName = function (){
            console.log(this.name)
        }
    }
}

var instance = new DynamicPrototype("Tom", 27);
```

#### 寄生构造函数模式

```
function ParasConstructor(name, age){
    var obj =  new Object();
    obj.name = name;
    obj.age = age;
    obj.sayName = function(){
        console.log(this.name);
    }
    return obj;
}

var instance =  new ParasConstructor("Tom", 27);
```

#### 稳妥构造函数模式

```
function ParasConstructor(name, age){
    var obj =  new Object();
    obj.name = name;
    obj.age = age;
    obj.sayName = function(){
        console.log(name);
    }
    return obj;
}

var instance =  new ParasConstructor("Tom", 27);
```

### 继承
继承是依靠原型链来实现的。
- `in`操作符可以检测实例或者原型中是否含有给定的属性，返回布尔值。
- `hasOwnProperty()`方法可以检测实例中是否含有给定的属性，返回布尔值。
- `Object.getPrototypeOf()`方法可以返回实例的原型对象。
- `isPrototypeOf()`方法可以检测实例的原型对象，返回布尔值。
#### 原型链
缺点：所有实例共享一个属性，无法向超类传参。
```
function Supertype(){
    this.name = "Tom";
}

Supertype.prototype.sayName = function(){
    console.log(this.name);
}

function Subtype(){
    this.name = "Marry";
}

Subtype.prototype = new Supertype();

var instance = new Subtype();

```

#### 借用构造函数
缺点：方法存在构造函数当中，失去复用的意义。
```
function Supertype(){
    this.name = "Tom";
}

Supertype.prototype.sayName = function(){
    console.log(this.name);
}

function Subtype(){
    Supertype.call(this, "Tom");
    this.age = 27;
}


var instance = new Subtype();

```
#### 组合继承
优点：不同的实例分别拥有自己的属性，并且可以使用相同的方法。
```
function Supertype(name){
    this.name = name;
}

Supertype.prototype.sayName = function(){
    console.log(this.name);
}

function Subtype(name, age){
    Supertype.call(this, name);
    this.age = age;
}

Subtype.prototype = new Supertype();
Subtype.prototype.constructor = Subtype;
Subtype.prototype.sayAge = function(){
    console.log(this.age);
}

var instance = new Subtype("Tom", 27);

```
#### 原型式
缺点：引用类型的属性会共享相应的值。
```
function object(obj){
    function F(){};
    F.prototype = obj;
    return new F();
}

var person = {
    name: "Tom",
    age: 27
}

var instance = object(person);

```
或者
```
var person = {
    name: "Tom",
    age: 27
}

var instance = Object.create(person);
```
#### 寄生式
缺点：函数方法得不到复用。
```
function parasitic(obj){
    var clone = object(obj);
    clone.sayName = function(){
        console.log(this.name)
    }
}

var person = {
    name: "Tom",
    age: 27
}

var instance = paras(person);

```

#### 寄生组合式
优点：只调用一次超类构造函数，避免了子类不必要的属性，同时保持原型链。
```
function object(obj){
    function F(){};
    F.prototype = obj;
    return new F();
}

function inheritePrototype(Super, Sub){
    var proto = object(Supertype.prototype);
    prototype.constructor = Sub;
    Sub.prototype = proto;
}

function Supertype(name){
    this.name = name;
}

Supertype.prototype.sayName(){
    console.log(this.name);
}

function Subtype(name, age){
    Supertype.call(this, name);
    this.age = age;
}

inheritePrototype(Supertype, Subtype);

Subtype.prototype.sayAge = function(){
    console.log(this.age);
}

var instance = new Subtype("Tom", 27);

```
### 闭包
- 闭包是指有权访问另一个函数作用域中的变量的函数。
---
title: 减少if-else的嵌套
date: 2018-11-29 10:57:59
tags: JS
categories:
    - JS
---

## 为什么要减少if-else 嵌套
项目中经常会遇到条件语句的判断，有时候为了图方便直接ifelse无线嵌套下去，从而造成
1. 可读性查。一个if 里面就几十行几百行代码，很难快速定位到下一个条件
2. 不易维护。很容易出现bug

## demo
```js
// 场景：一个小男孩去市场买水果，买完回家告诉妈妈买了什么
  var market = 'apple';
  if(market = 'apple'){
    console.log('I bought an apple')
  } else if (market = 'pear'){
     console.log('I bought an apple')
  }else if (market = 'pear'){
     console.log('I bought a pear')
  }else if (market = 'peach'){
     console.log('I bought a peach')
  }else if (market = 'watermelon'){
     console.log('I bought a watermelon')
  }
```

## switch case 
```js
switch (market){
    case 'apple':
      console.log('I bought an apple');
      break;
    case 'pear':
      console.log('I bought a pear');
      break;
    case 'peach':
      console.log('I bought a peach');
      break;
    case 'watermelon':
      console.log('I bought a watermelon');
      break;
  }
```

## hash 表
```js
  var obj = {
    'apple': 'I bought an apple',
    'pear': 'I bought an pear',
    'peach': 'I bought an peach',
    'watermelon': 'I bought an watermelon'
  };
 console.log(obj[market]);
```
## 函数
```js
 function buy(market){
  var obj = {
    'apple': function(){console.log('I bought an apple')},
    'pear': function(){console.log('I bought an pear')},
    'peach': function(){console.log('I bought an peach')},
    'watermelon': function(){console.log('I bought an watermelon')},
  };
  return obj[market]();
};
buy(market)
```


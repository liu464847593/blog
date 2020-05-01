## 什么是BEM
B - 块（block）  
E - 元素（element）  
M - 修饰符（modifier）   
```
-   中划线 ：仅作为连字符使用，表示某个块或者某个子元素的多单词之间的连接记号。
__  双下划线：双下划线用来连接块和块的子元素
_   单下划线：单下划线用来描述一个块或者块的子元素的一种状态

type-block__element_modifier
```

## 书写原则
1. 原则上不会出现2层以上选择器嵌套
2. 两层选择器嵌套出现在.mod-xxx__item_current子元素的情况，如下：
```less
// 嵌套写法
.xxx__item_current{
    .xxx__link{}
}
```

## 为什么用BEM
1. 组件之间的完全解耦，不会造成命名空间的污染，如：.mod-xxx ul li 的写法带来的潜在的嵌套风险。

## 性能
BEM 命名会使得 Class 类名变长，但经过 gzip 压缩后这个带宽开销可以忽略不计

## 参考
1. https://github.com/Tencent/tmt-workflow/wiki/%E2%92%9B-%5B%E8%A7%84%E8%8C%83%5D--CSS-BEM-%E4%B9%A6%E5%86%99%E8%A7%84%E8%8C%83

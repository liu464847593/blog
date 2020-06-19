## 精简数组循环
```js
const files = [ 'foo.txt ', '.bar', '   ', 'baz.foo' ];
let filePaths = [];

for (let file of files) {
  const fileName = file.trim();
  if(fileName) {
    const filePath = `~/cool_app/${fileName}`;
    filePaths.push(filePath);
  }
}

// filePaths = [ '~/cool_app/foo.txt', '~/cool_app/.bar', '~/cool_app/baz.foo']


// 使用reduce
const files = [ 'foo.txt ', '.bar', '   ', 'baz.foo' ];
const filePaths = files.reduce((acc, file) => {
  const fileName = file.trim();
  if(fileName) {
    const filePath = `~/cool_app/${fileName}`;
    acc.push(filePath);
  }
  return acc;
}, []);

// filePaths = [ '~/cool_app/foo.txt', '~/cool_app/.bar', '~/cool_app/baz.foo']


// 方法链
const files = [ 'foo.txt ', '.bar', '   ', 'baz.foo' ];
const filePaths = files
  .map(file => file.trim())
  .filter(Boolean)
  .map(fileName => `~/cool_app/${fileName}`);

// filePaths = [ '~/cool_app/foo.txt', '~/cool_app/.bar', '~/cool_app/baz.foo']
```

## accumulate

Use `Array.prototype.reduce()`, `Array.prototype.slice(-1)` and the unary `+` operator to add each value to the unary array containing the previous sum.

```js
// +acc.slice(-1) 会把字符串转为数字
const accumulate = (...nums) => nums.reduce((acc, n) => [...acc, n + +acc.slice(-1)],[]);

accumulate(1, 2, 3, 4); // [1, 3, 6, 10]
accumulate(...[1, 2, 3, 4]); // [1, 3, 6, 10]
```



## 参考
30 seconds of code:https://www.30secondsofcode.org/js/p/1

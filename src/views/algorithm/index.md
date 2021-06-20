## 洗牌算法
```js
/**
* 著名的Fisher–Yates shuffle 洗牌算法
* 随机从数组抽一个元素把它与最后一个元素交换
*/
const shuffle = ([...arr]) => {
  let m = arr.length;
  while (m) {
    const i = Math.floor(Math.random() * m--);
    [arr[m], arr[i]] = [arr[i], arr[m]];
  }
  return arr;
};
```
## 数组中的第K个最大元素
```js
/**
* https://leetcode-cn.com/problems/kth-largest-element-in-an-array/
*/
  var findKthLargest = function(nums, k) {
    nums.sort((a, b) => b - a);
    return nums[k - 1]
  };
```
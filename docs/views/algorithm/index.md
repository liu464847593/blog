---
sidebar: auto
---
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

## 爬楼梯
```js
  /**
   * https://leetcode-cn.com/problems/climbing-stairs/solution/hua-jie-suan-fa-70-pa-lou-ti-by-guanpengchn/
   */
var climbStairs = function(n) {
    const sqrt_5 = Math.sqrt(5);
    const fib_n = Math.pow((1 + sqrt_5) / 2, n + 1) - Math.pow((1 - sqrt_5) / 2,n + 1);
    return Math.round(fib_n / sqrt_5);
};
```
```js
/**
 * @param {number} n
 * @return {number}
 */
var climbStairs = function(n) {
    const dp = [];
    dp[0] = 1;
    dp[1] = 1;
    for(let i = 2; i <= n; i++) {
        dp[i] = dp[i - 1] + dp[i - 2];
    }
    return dp[n];
};
```
## 使用最小花费爬楼梯
```js
/**
 *
 * @param {number[]} cost
 * @return {number}
 */
var minCostClimbingStairs = function(cost) {
    let n = cost.length;
    let dp = new Array(n+1);
    dp[0] = dp[1] = 0;
    for (let i = 2; i <= n; i++) {
        dp[i] = Math.min(dp[i-1] + cost[i-1], dp[i-2] + cost[i-2]);
    }
    return dp[n];
};
```
## 冒泡排序，插入排序，快速排序
```js
// 冒泡排序
const bubbleSort = arr => {
  let swapped = false;
  const a = [...arr];
  for (let i = 1; i < a.length - 1; i++) {
    swapped = false;
    for (let j = 0; j < a.length - i; j++) {
      if (a[j + 1] < a[j]) {
        [a[j], a[j + 1]] = [a[j + 1], a[j]];
        swapped = true;
      }
    }
    if (!swapped) return a;
  }
  return a;
};
```
```js
// 快速排序
const quickSort = arr => {
  const a = [...arr];
  if (a.length < 2) return a;
  const pivotIndex = Math.floor(arr.length / 2);
  const pivot = a[pivotIndex];
  const [lo, hi] = a.reduce(
    (acc, val, i) => {
      if (val < pivot || (val === pivot && i != pivotIndex)) {
        acc[0].push(val);
      } else if (val > pivot) {
        acc[1].push(val);
      }
      return acc;
    },
    [[], []]
  );
  return [...quickSort(lo), pivot, ...quickSort(hi)];
};
```
```js
// 插入排序
const insertionSort = arr =>
  arr.reduce((acc, x) => {
    if (!acc.length) return [x];
    acc.some((y, j) => {
      if (x <= y) {
        acc.splice(j, 0, x);
        return true;
      }
      if (x > y && j === acc.length - 1) {
        acc.splice(j + 1, 0, x);
        return true;
      }
      return false;
    });
    return acc;
  }, []);
```
## 二分法
```js
const binarySearch = (arr, item) => {
  let l = 0,
    r = arr.length - 1;
  while (l <= r) {
    const mid = Math.floor((l + r) / 2);
    const guess = arr[mid];
    if (guess === item) return mid;
    if (guess > item) r = mid - 1;
    else l = mid + 1;
  }
  return -1;
};
```
## 广度优先遍历二叉树
队列先进先出 
```js
  let tree = {
    val: 1,
    left: {
      val: 2,
      left: {
        val: 4
      },
      right: {
        val: 5
      }
    },
    right: {
      val: 3,
      right: {
        val: 6
      }
    }
  }

  function ergodic(tree) {
    let list = [], queue = [tree];
    while (queue.length !== 0) {
      let target = queue.shift();
      list.push(target.val);
      if (target.left) queue.push(target.left)
      if (target.right) queue.push(target.right)
    }
    return list
  }
```
## 深度优先遍历二叉树
栈后进先出 
```js
  let tree = {
    val: 1,
    left: {
      val: 2,
      left: {
        val: 3
      },
      right: {
        val: 4
      }
    },
    right: {
      val: 5,
      right: {
        val: 6
      }
    }
  }

  function ergodic(tree) {
    let list = [], stack = [tree];
    while (stack.length !== 0) {
      let target = stack.pop();
      list.push(target.val);
      if (target.right) stack.push(target.right)
      if (target.left) stack.push(target.left)
    }
    return list
  }
```

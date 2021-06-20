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
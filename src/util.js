// 工具类文件

export default {
  // 按固定长度切割字符串，返回数组
  splitByLength(str, n) {
    var arrLength = Math.ceil(str.length / n);
    var ans = [];
    for (var i = 0; i < arrLength; i++) {
      ans.push(str.slice(n * i, n * (i + 1)));
    }
    return ans;
  },
}

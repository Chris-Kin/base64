var baseChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';

function transfer(str) {
  // 原始字符对应的二进制
  var binarys = '';
  [...str].forEach(el => {
    // 判断中文字符，将一个Unicode编码（js默认编码）的中文转为UTF8的字节码
    if (/[^\x00-\xff]/ig.test(el)) {
      var hanzi = parseInt(encodeURI(el).replace(/%/g, ''), 16).toString(2);
      binarys += hanzi;
      return;
    }
    binarys += el.charCodeAt().toString(2).padStart(8, 0);
  });
  console.log(binarys);

  // 将二进制每六位重组，并映射到baseChars的数组
  var newGroup = splitByLength(binarys, 6).map(el => {
    if (el.length !== 6) {
      el = el.padEnd(6, 0);
    }
    var index = parseInt(el, 2);
    return baseChars[index];
  });

  // 补充等号
  var padCount = 4 - newGroup.length % 4;
  if (padCount !== 4) {
    newGroup.push(...new Array(padCount).fill('='));
  }

  return newGroup.join('');
}

// 按固定长度切割字符串，返回数组
function splitByLength(str, n) {
  var arrLength = Math.ceil(str.length / n);
  var ans = [];
  for (var i = 0; i < arrLength; i++) {
    ans.push(str.slice(n * i, n * (i + 1)));
  }
  return ans;
}

var str = '啊';
console.log(transfer(str), window.btoa(str));

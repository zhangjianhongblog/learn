void main() {
  var func = (str) {
    print('hello======$str');
  };
  func('好');

  // 不建议使用
  // ((){
  //   print('你是不是啥');
  // })();

  var list = ['1','2','3','4','5'];
  print(listTimes(list, (str){return str*3;}));

  var list2 = ['a','b','c','d','e'];
  print(listTimes2(list2));
}

List listTimes(List list, String fn(str)) {
  for (var index = 0; index < list.length; index++) {
    list[index] = fn(list[index]);
  }
  return list;
}
List listTimes2(List list) {
  var fn = (str) => str*3;
  for (var index = 0; index < list.length; index++) {
    list[index] = fn(list[index]);
  }
  return list;
}
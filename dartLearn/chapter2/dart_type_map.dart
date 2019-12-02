void main() {
  var map1 = {'first':'dart',1:true,true:2};
  print(map1);
  print(map1['first']);
  print(map1[true]);
  map1[1] = false;
  print(map1);

  var map2 = const {1:'dart',2:'Java'};
  // map2[1] = 'sda';
  // print(map2);

  var map3 = new Map();

  var map4 = {1:"Dart","first":"Js",2:'Java'};
  print(map4.isEmpty);
  print(map4.isNotEmpty);
  // map4.keys.forEach(print);
  // map4.values.forEach(print);
  // print(map4.containsKey('1'));
  // print(map4.containsValue('Js'));
  map4.remove(1);
  print(map4);
  map4.forEach(f);

  var list = [1,2,4];
  print(list.asMap());
}

void f(key,value) {
  print('key=$key,value:$value');
}
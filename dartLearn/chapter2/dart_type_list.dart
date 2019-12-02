void main () {
  var list1 = [1,2,3,'dart',true];
  print(list1);

  print(list1[2]);
  list1[1] = 'Hello';
  print(list1);

  var list2 = const [1,2,3,4];
  print(list2);
  print(list2[3]);
  // list2[1] = 5;
  print(list2);

  var list3 = new List();

  var list = ['hello','dart'];
  print(list.length);
  list.add('new');
  print(list);
  list.insert(1, 'java');
  list.add('heheh');
  print(list);
  // list.remove('java');
  // print(list);
  // list.clear();
  // print(list);
  // print(list.indexOf('dart'));
  // print(list.indexOf('dart1'));
  // print(list.lastIndexOf('dart'));

  list.sort();
  print(list);

  // print(list.sublist(1));
  // list.shuffle();
  // print(list);
  list.forEach(print);
}
void main(List args) {
  print(args);
  print(getPerson('张三', 18));
  printPerson('李四', 30);
  print(printPerson('李四', 30));
}

// String getPerson(String name, int age) {
//   return 'name=$name;age=$age';
// }
int gender = 2;
getPerson(String name, int age) => gender == 1 ? 'name=$name;age=$age':'hhhh';

printPerson(name, age) {
  print('name=$name;age=$age');
}
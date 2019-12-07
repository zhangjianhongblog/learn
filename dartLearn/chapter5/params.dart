void main() {
  printPerson('张三');
  printPerson('张三',age:12);
  printPerson('张三',age:12,gender:'Male');
  printPerson('张三',gender:'Male');

  printPerson2('李四');
  printPerson2('李四',18);
  printPerson2('李四',18,'Female');
}

printPerson(String name,{int age,String gender}) {
  print('name=$name;age=$age;gender=$gender');
}
printPerson2(String name,[int age,String gender]) {
  print('name=$name;age=$age;gender=$gender');
}
void main() {
  var person = new Person('aaa',12);
  new Person.withName('hhhh');
  new Person.withAge(123);
}

class Person {
  String name;
  int age;
  final String gender = '男';
  
  Person(this.name,this.age);

  Person.withName(String name) {
    this.name = name;
  }

  Person.withAge(this.age);

  void work() {
    print('working....');
  }
}
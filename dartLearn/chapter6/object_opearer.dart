void main() {
  // Person person = new Person();
  // person?.work();
  // person?.name;

  // var person;
  // person = '';
  // person = new Person();
  // (person as Person).work();

  // if (person is! Person) {
    // person.work();
  // }

  // var person = new Person();
  // person.name = 'Tom';
  // person.age = 12;
  new Person()..name = 'TOM'
        ..age = 12
        ..work();
}

class Person {
  String name;
  int age;

  void work() {
    print('working...$name,$age');
  }
}
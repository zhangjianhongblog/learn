import 'person.dart';

void main() {
  // var student = new Student();
  // student.study();
  // student.name = '张三';
  // student.age = 16;
  // print(student.isAdult);
  // student.run();

  Person person = new Student();
  if (person is Student) {
    person.study();
  }
  person.name = '占山';
  person.age = 12;
  print(person.toString());
}

class Student extends Person {
  void study() {
    print('Student study...');
  }

  @override
  bool get isAdult => age > 15;

  @override
  void run () {
    print('Student run...');
  }
  @override
  String toString () {
    return 'name is $name, age is $age';
  }
}
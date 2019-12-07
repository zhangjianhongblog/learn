
void main() {
  var student = new Student('tom');
  print(student.name);
}

class Person {
  String name;

  Person(this.name);
  Person.withName(this.name);
}

class Student extends Person {
  int age;

  Student(String name) : super.withName(name);
}
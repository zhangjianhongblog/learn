void main() {
  var person = new Student();
  person.run();
}
abstract class Person {
  void run();
}
class Student extends Person {
  @override
  void run() {
    print('run....');
  }
}
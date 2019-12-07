void main() {
  var student = new Student();
}

abstract class Person {
  void run();
}
class Student implements Person{
  @override
  void run() {
    print('studet run ...');
  }
}
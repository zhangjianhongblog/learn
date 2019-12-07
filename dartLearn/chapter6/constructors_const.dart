void main() {
  const person = const Person();
  person.work();
}

class Person {
  final String name = '张三';
  final int age = 12;
  final String gender = '男';

  const Person();

  void work() {
    print('work----');
  }
}
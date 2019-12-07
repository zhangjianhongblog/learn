import 'person.dart';
void main() {
  var person = new Person();
  person.name = '张三';
  person.age = 89;

  print(person.name);
  person.work();
}


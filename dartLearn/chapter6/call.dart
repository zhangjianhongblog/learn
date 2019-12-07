void main() {
  var person = new Person();
  print(person('张三',12));
}

class Person{
  String call(String name, int age) {
    return 'name is: $name,age is $age';
  }
}
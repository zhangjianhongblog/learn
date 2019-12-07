class Person {
  String name;
  int age;
  String _birthdy = '1990-11-08';

  bool get isAdult => age > 18;
  void run() {
    print('Person run...');
  }
}
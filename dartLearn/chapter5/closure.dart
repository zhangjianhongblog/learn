void main() {
  var func = a();
  func(); // 0
  func(); // 1
  func(); // 2
  func(); // 3
}

a() {
  int count = 0;
  // printCount() {
  //   print(count++);
  // }
  // return printCount;

  return () {
    print(count++);
  };
}
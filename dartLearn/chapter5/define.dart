void main (List args) {
  print(args);
  print(getPerson('张三',19));
}

String getPerson(String name, int age) {
  return 'name=$name,age=$age';
}
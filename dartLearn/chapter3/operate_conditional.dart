void main (){
  int genter = 0;
  String str = genter == 0 ? 'Male=$genter' : 'Female=$genter';
  print(str);

  String a;
  String b = 'java';
  String c = a ?? b; // a没有值，所有取b的值
  print(c); // java

  String d = 'Dart';
  String e = 'java';
  String f = d ?? e; // d有值，所有不取e的值
  print(f); // Dart
}
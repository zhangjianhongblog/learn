void main () {
  String str1 = 'hello';

  String str2 = '''hello 
                  world''';

  print(str2);

  String str3 = 'Hello \n world';
  print(str3);

  String str4 = r'hello \n world';
  print(str4);

  String str5 = 'hello world zhangjianhong';
  print(str5 + ' zhangjianhong');
  print(str5 * 3);
  print(str5 == str4);
  print(str5[0]);

  int a = 1;
  int b = 2;
  print('a + b = ${a + b}');
  print('a = $a');

  print(str4.length);
  print(str4.isEmpty);
  print(str4.isNotEmpty);

  print(str5.contains('hello'));
  print(str5.substring(0,3));
  print(str5.startsWith('a'));
  print(str5.endsWith('d'));
  print(str5.split(' '));
  print(str5.replaceAll(' ','4'));
  print(str5.replaceFirst(' ','4'));
}
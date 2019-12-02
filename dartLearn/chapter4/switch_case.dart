void main () {
  String language = 'Java';

  switch(language) {
    case 'dart':
      print('Dart is my love');
      break;
    case 'Java':
      print('Java is my love');
      break;
    case 'Python':
      print('Python is my love');
      break;
    default:
      print('none');
  };

  print('--------');

  switch(language) {
    D:
    case 'dart':
      print('Dart is my love');
      break;
    case 'Java':
      print('Java is my love');
      continue D;
    case 'Python':
      print('Python is my love');
      break;
    default:
      print('none');
  }
}
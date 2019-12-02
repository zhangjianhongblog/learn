void main() {
  int score = 100;

  if (score >=90) {
    if (score == 100) {
      print('完美');
    } else {
      print('优秀');
    }
  } else if (score > 60) {
    print('及格');
  } else if (score == 60) {
    print('不及格');
  }
}
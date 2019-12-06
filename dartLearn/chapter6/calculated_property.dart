void main() {
  var rect = new Rectangle();
  rect.width = 20;
  rect.height = 10;
  print(rect.area);
  rect.area = 300;
  print(rect.width);
}

class Rectangle {
  num width,height;
  num get area => width * height;
  set area(value) {
    width = value / 20;
  }
}
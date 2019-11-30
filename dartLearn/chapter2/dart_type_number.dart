void main () {
  num a = 10;
  a = 12.4;

  int b = 20;
  // b = 20.5;

  double c = 10.5;
  // c = 10;

  print(b + c);
  print(b - c);
  print(b * c);
  print(b / c);
  print(b ~/ c);
  print(b % c);

  print(0.0 / 0.0); // NaN

  print(b.isEven);
  print(b.isOdd);

  int d = 11;
  print(d.isOdd);
  print(d.isEven);

  double e = -100;

  print(e.abs());

  double f = 10.5;

  print(f.round());
  print(f.floor());
  print(f.ceil());

  print(f.toInt());

  print(b.toDouble());

}
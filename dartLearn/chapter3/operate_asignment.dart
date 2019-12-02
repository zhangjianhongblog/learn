void main () {
  int a = 10;

  int b;
  b ??= a; // b没有值，所有把a的值赋给b
  print(b);

  int c = 1;
  c ??= a; // c有值，那么就不需要a的值了，还是自己的值
  print(c);

  int d=1;
  // d += a;
  // d -= a;
  // d *= a;
  // d /= a;
  // d ~/= a;
  d %= a;
  print(d);
}
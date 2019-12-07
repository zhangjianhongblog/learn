void main() {
  var utils = new Utils();
  utils.put<String>('element');
}

class Utils{
  void put<T> (T element) {
    print(element);
  }
}
void main() {
  var utils = new Utils();
  utils.put<String>(1);
}

class Utils{
  void put<T> (T element) {
    print(element);
  }
}
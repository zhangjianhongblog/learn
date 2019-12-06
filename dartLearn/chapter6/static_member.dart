void main() {
  var page = new Page();
  // page.scrollDown();
  Page.scrollDown();
}

class Page {
  static const int maxPage = 10;

  static int currentpage = 1;

  static void scrollDown(){
    currentpage = 1;
    print('doenload');
  }

  void scrollUp(){
    currentpage++;
    print('up');
  }
}
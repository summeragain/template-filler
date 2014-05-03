var pages = {
  open: 0,
  data: 1,
  template: 2,
  print: 3
}

module.exports.switchSubpage = function(page) {
  return element.all(by.css('ul.sidebar li[ng-click].switcher'))
    .then(function(elems) {
      elems[pages[page]].click();
    });
}
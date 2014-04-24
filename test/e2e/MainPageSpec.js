describe('Main page', function() {
  it('should have buttons for switching subpage', function() {
    browser.get('index.html');

    element.all(by.css('ul.sidebar li[ng-click].switcher'))
      .then(function(elems) {
        expect(elems.length).toEqual(4);
      })
  })
  
  it('should by default be on "Open" subpage', function() {
    browser.get('index.html');

    var subpage = element(by.css('body content > div'));
    subpage.getAttribute('ng-controller')
      .then(function(controller) {
        expect(controller).toBe('LastOpenedController');
      })
  })
  
  it('should change subpage to "Data"', function() {
    browser.get('index.html');

    element.all(by.css('ul.sidebar li[ng-click].switcher'))
      .then(function(elems) {
        elems[1].click();
        return element(by.css('body content > div')).getAttribute('ng-controller');
      })
      .then(function(controller) {
        expect(controller).toBe('DatasetController');
      })
  })
  
  it('should change subpage to "Template" subpage', function() {
    browser.get('index.html');

    element.all(by.css('ul.sidebar li[ng-click].switcher'))
      .then(function(elems) {
        elems[2].click();
        return element(by.css('body content > div')).getAttribute('ng-controller');
      })
      .then(function(controller) {
        expect(controller).toBe('TemplateController');
      })
  })
  
  it('should change subpage to "Print" subpage', function() {
    browser.get('index.html');

    element.all(by.css('ul.sidebar li[ng-click].switcher'))
      .then(function(elems) {
        elems[3].click();
        return element(by.css('body content > div')).getAttribute('ng-controller');
      })
      .then(function(controller) {
        expect(controller).toBe('PrintController');
      })
  })
  
  it('can change subpages one-by-one', function() {
    browser.get('index.html');

    var elems;
    
    element.all(by.css('ul.sidebar li[ng-click].switcher'))
      .then(function(found) {
        elems = found;
        
        elems[1].click();
        return element(by.css('body content > div')).getAttribute('ng-controller');
      })
      .then(function(controller) {
        expect(controller).toBe('DatasetController');
        
        elems[2].click();
        return element(by.css('body content > div')).getAttribute('ng-controller');
      })
      .then(function(controller) {
        expect(controller).toBe('TemplateController');
        
        elems[3].click();
        return element(by.css('body content > div')).getAttribute('ng-controller');
      })
      .then(function(controller) {
        expect(controller).toBe('PrintController');
        
        elems[0].click();
        return element(by.css('body content > div')).getAttribute('ng-controller');
      })
      .then(function(controller) {
        expect(controller).toBe('LastOpenedController');
      })
  })
  
})
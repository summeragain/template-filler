var utils = require('./utils.js');

describe('Main page', function() {
  it('should have buttons for switching subpage', function() {
    browser.get('');

    element.all(by.css('ul.sidebar li[ng-click].switcher'))
      .then(function(elems) {
        expect(elems.length).toEqual(4);
      })
  })
  
  it('should by default be on "Open" subpage', function() {
    browser.get('');

    var subpage = element(by.css('body content > div'));
    subpage.getAttribute('ng-controller')
      .then(function(controller) {
        expect(controller).toBe('LastOpenedController');
      })
  })
  
  it('should change subpage to "Data"', function() {
    browser.get('');

    utils
      .switchSubpage('data')
      .then(function() {
        return element(by.css('body content > div')).getAttribute('ng-controller');
      })
      .then(function(controller) {
        expect(controller).toBe('DatasetController');
      })
  })
  
  it('should change subpage to "Template" subpage', function() {
    browser.get('');

    utils
      .switchSubpage('template')
      .then(function() {
        return element(by.css('body content > div')).getAttribute('ng-controller');
      })
      .then(function(controller) {
        expect(controller).toBe('TemplateController');
      })
  })
  
  it('should change subpage to "Print" subpage', function() {
    browser.get('');

    utils
      .switchSubpage('print')
      .then(function() {
        return element(by.css('body content > div')).getAttribute('ng-controller');
      })
      .then(function(controller) {
        expect(controller).toBe('PrintController');
      })
  })
  
  it('can change subpages one-by-one', function() {
    browser.get('');
    
    utils
      .switchSubpage('data')
      .then(function() {
        return element(by.css('body content > div')).getAttribute('ng-controller');
      })
      .then(function(controller) {
        expect(controller).toBe('DatasetController');
        return utils.switchSubpage('template');
      })
      .then(function() {
        return element(by.css('body content > div')).getAttribute('ng-controller');
      })
      .then(function(controller) {
        expect(controller).toBe('TemplateController');
        return utils.switchSubpage('print');
      })
      .then(function() {
        return element(by.css('body content > div')).getAttribute('ng-controller');
      })
      .then(function(controller) {
        expect(controller).toBe('PrintController');
        return utils.switchSubpage('open');
      })
      .then(function() {
        return element(by.css('body content > div')).getAttribute('ng-controller');
      })
      .then(function(controller) {
        expect(controller).toBe('LastOpenedController');
      })
  })
  
})
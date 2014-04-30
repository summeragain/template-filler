var utils = require('./utils.js');

describe('Dataset editor', function() {

  it('should present on "Data" subpage', function() {
    browser.get('index.html');

    utils
      .switchSubpage('data')
      .then(function() {
        return element(by.css('body content > div > div[dataset-editor]')).isPresent();
      })
      .then(function(result) {
        expect(result).toBe(true);

        return element(by.css('body content > div > div[dataset-editor] .new-row'));
      })
      .then(function(elem) {
        expect(elem.isPresent()).toBe(true);

        return element(by.css('body content > div > div[dataset-editor] .new-column'));
      })
      .then(function(elem) {
        expect(elem.isPresent()).toBe(true);
      })
  })

  it('should be clear at begining', function() {
    browser.get('index.html');

    var dataset;

    utils
      .switchSubpage('data')
      .then(function() {
        return element(by.css('body content > div > div[dataset-editor]'));
      })
      .then(function(elem) {
        dataset = elem;

        return dataset.$$('.data-row');
      })
      .then(function(elems) {
        expect(elems.length).toBe(1);
        
        return dataset.$$('.header-column');
      })
      .then(function(elems) {
        expect(elems.length).toBe(1);
      })
  })

  it('should be able to add a row', function() {
    browser.get('index.html');

    var newRow;

    utils
      .switchSubpage('data')
      .then(function() {
        return element(by.css('div[dataset-editor] .new-row > td'));
      })
      .then(function(elem) {
        newRow = elem;
        
        newRow.click();
        return element.all(by.css('div[dataset-editor] .data-row')).count();
      })
      .then(function(count) {
        expect(count).toBe(2);

        newRow.click();
        return element.all(by.css('div[dataset-editor] .data-row')).count();
      })
      .then(function(count) {
        expect(count).toBe(3);
      })
  })

  it('should be able to add a column', function() {
    browser.get('index.html');

    var newColumn;

    utils
      .switchSubpage('data')
      .then(function() {
        return element(by.css('div[dataset-editor] .new-column'));
      })
      .then(function(elem) {
        newColumn = elem;
        
        expect(newColumn.getText()).toBe('...');
        newColumn.click();
        expect(newColumn.getText()).toBe('');

        return newColumn.sendKeys('111', protractor.Key.ENTER);
      })
      .then(function() {
        return element.all(by.css('div[dataset-editor] .header-column')).count();
      })
      .then(function(count) {
        expect(count).toBe(2);

        expect(newColumn.getText()).toBe('');
        newColumn.click();
        expect(newColumn.getText()).toBe('');

        return newColumn.sendKeys('LONG_TEXT', protractor.Key.ENTER);
      })
      .then(function() {
        return element.all(by.css('div[dataset-editor] .header-column')).count();
      })
      .then(function(count) {
        expect(count).toBe(3);

        expect(newColumn.getText()).toBe('');
        newColumn.click();
        expect(newColumn.getText()).toBe('');

        return newColumn.sendKeys('LONG_TEXT', protractor.Key.ENTER);
      })
      .then(function() {
        return element.all(by.css('div[dataset-editor] .header-column')).count();
      })
      .then(function(count) {
        expect(count).toBe(3);

        expect(newColumn.getText()).toBe('LONG_TEXT');
        return newColumn.sendKeys('1', protractor.Key.ENTER);
      })
      .then(function() {
        return element.all(by.css('div[dataset-editor] .header-column')).count();
      })
      .then(function(count) {
        expect(count).toBe(4);

        expect(newColumn.getText()).toBe('');
        newColumn.click();
        expect(newColumn.getText()).toBe('');

        return newColumn.sendKeys('1234');
      })
      .then(function() {
        return element.all(by.css('div[dataset-editor] .header-column')).count();
      })
      .then(function(count) {
        expect(count).toBe(4);

        expect(newColumn.getText()).toBe('1234');
        return newColumn.sendKeys(protractor.Key.ENTER)
      })
      .then(function() {
        expect(newColumn.getText()).toBe('');
        return newColumn.sendKeys(protractor.Key.ENTER);
      })
      .then(function() {
        expect(newColumn.getText()).toBe('...');

        return element.all(by.css('div[dataset-editor] .header-column')).count();
      })
      .then(function(count) {
        expect(count).toBe(5);
      })
  })

})
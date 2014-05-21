angular.module('TemplateFillerApp.services', [])

.constant('OpenFile', function() {
  var input = $('<input type="file">');

  input.on('change', function(e) {
    console.log(e.target.value);
  });

  input.trigger('click');
})

.constant('SaveFile', function(callback) {
  var input = $('<input nwsaveas="result.pdf" type="file">');

  input.on('change', function(e) {
    callback(e.target.value);
  });

  input.trigger('click');
})

.service('CurrentData', [function() {
  var header = [ 'FieldColumn' ];
  var data = [ { 'FieldColumn': 'value' } ];

  this.getRows = function() {
    return data;
  }

  this.getColumns = function() {
    return header;
  }
}])

.service('CurrentTemplate', [function() {
  var text = '#example page\n{{ FieldColumn }}';

  this.getMarkdown = function() {
    return text;
  }

  this.setMarkdown = function(str) {
    text = str;
  }

}])

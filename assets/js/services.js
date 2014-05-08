angular.module('TemplateFillerApp.services', [])

.constant('OpenFile', function() {
  var input = $('<input type="file">');
  
  input.on('change', function(e) {
    console.log(e.target.value);
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
}]);
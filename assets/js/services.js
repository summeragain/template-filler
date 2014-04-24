angular.module('TemplateFillerApp.services', [])

.constant('OpenFile', function() {
  var input = $('<input type="file">');
  
  input.on('change', function(e) {
    console.log(e.target.value);
  });
  
  input.trigger('click');
})
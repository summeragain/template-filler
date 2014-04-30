angular.module('TemplateFillerApp.directives', [])

.directive('datasetEditor', [function() {
  return {
    restrict: 'EA',
    templateUrl: 'partials/DatasetEditor.html',
    
    link: function($scope) {
      $scope.header = [ 'abc', '111', 'def' ];
      $scope.data = [
        { 'abc': 1, 'def': '1', '111': true },
        { 'abc': 2, 'def': '2', '111': false },
        { 'abc': 3, 'def': '3', '111': true },
        { 'abc': 4, 'def': '4', '111': false },
        { 'abc': 5, 'def': '5', '111': true },
        { 'abc': 6, 'def': '6', '111': false }
      ];
      
      $scope.getField = function(data, name) {
        return data[name];
      }
    }
  };
}])
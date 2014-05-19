angular.module('TemplateFillerApp.controllers', [])

.controller('MainController', ['$scope', function($scope) {
  $scope.currentPage = 'PagePrint';

  $scope.switchPage = function(pageName) {
    /* Available pages:
     * - PageLastOpened
     * - PageDataset
     * - PageTemplate
     * - PagePrint
     */

    $scope.currentPage = pageName;
  }

  $scope.getPageUrl = function() {
    return 'pages/' + $scope.currentPage + '.html';
  }
  $scope.currentlyOnPage = function(test) {
    return $scope.currentPage === test;
  }

}])

.controller('LastOpenedController', [
    '$scope', 'OpenFile',
    function($scope, OpenFile) {
  $scope.openFile = function() {
    OpenFile();
  }
}])

.controller('DatasetController', ['$scope', function($scope) {
}])

.controller('PrintController', [
    '$scope', '$compile', 'CurrentTemplate', 'CurrentData',
    function($scope, $compile, CurrentTemplate, CurrentData) {
  var markdown = CurrentTemplate.getMarkdown();

  $scope.template = marked(markdown);
  $scope.pages    = CurrentData.getRows();
}])

.controller('TemplateController', [
    '$scope', 'CurrentTemplate',
    function($scope, CurrentTemplate) {
  $scope.templateContents = CurrentTemplate.getMarkdown();
  $scope.$watch('templateContents', function() {
    CurrentTemplate.setMarkdown($scope.templateContents);
  });
}])

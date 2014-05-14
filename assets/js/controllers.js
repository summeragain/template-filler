angular.module('TemplateFillerApp.controllers', [])

.controller('MainController', ['$scope', function($scope) {
  $scope.currentPage = 'PageLastOpened';

  $scope.switchPage = function(pageName) {
    /* Available pages:
     * - PageLastOpened
     * - PageDataset
     * - PageTemplate
     * - PageResult
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

.controller('LastOpenedController', ['$scope', 'OpenFile', function($scope, OpenFile) {
  $scope.openFile = function() {
    OpenFile();
  }
}])

.controller('DatasetController', ['$scope', function($scope) {
}])

.controller('PrintController', ['$scope', function($scope) {
}])

.controller('TemplateController', ['$scope', 'CurrentTemplate', function($scope, CurrentTemplate) {
  $scope.templateContents = CurrentTemplate.getMarkdown();
}])

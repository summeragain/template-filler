angular.module('TemplateFillerApp.directives', [])

.directive('datasetEditor', ['CurrentData', function(CurrentData) {
  return {
    restrict: 'EA',
    templateUrl: 'partials/DatasetEditor.html',

    link: function($scope) {
      $scope.data = CurrentData;

      $scope.getField = function(data, name) {
        return data[name] === undefined ? '' : data[name];
      }

      $scope.fieldEdited = function(index, newValue) {
        var oldValue = $scope.header[index];

        if(newValue === oldValue) {
          return;
        }

        if($scope.data.getColumns().indexOf(newValue) !== -1) {
          // TODO: log error
          console.log('duplicated field: ', newValue);
          return;
        }

        console.log('field updated. was:', oldValue, 'now:', newValue);

        $scope.data.getRows().forEach(function(element) {
          var oldData = element[oldValue];

          if(oldData !== undefined) {
            element[newValue] = oldData;
            delete element[oldValue];
          }
        });

        $scope.data.getColumns()[index] = newValue;
      }
      $scope.fieldCreated = function(newValue) {
        if(newValue === '') {
          return '...';
        }

        if($scope.data.getColumns().indexOf(newValue) !== -1) {
          // TODO: log error
          console.log('duplicated field: ', newValue);
          return;
        }

        console.log('field created:', newValue);

        $scope.data.getColumns().push(newValue);
        return '';
      }
      $scope.dataUpdated = function(item, name, value) {
        item[name] = value;
      }

      $scope.createRow = function() {
        $scope.data.getRows().push({ });
      }
    }
  };
}])

.directive('editable', ['$timeout', function($timeout) {
  return {
    restrict: 'A',
    scope: {
      callback: '&editable',
      placeholder: '='
    },

    link: function($scope, elem, attr) {
      var updateBlur = function(event) {
        if(elem.text() == '') {
          elem.text($scope.placeholder || attr.staticPlaceholder);
          return;
        }

        $timeout(function() {
          var result = $scope.callback({ $value: elem.text() });
          if(result === '') {
            elem.text('...');
          }
        });
      };

      var updateKeydown = function(event) {
        if(elem.text() == '') {
          elem.trigger('blur');
          return;
        }

        event.preventDefault();

        $timeout(function() {
          var result = $scope.callback({ $value: elem.text() });
          if(result !== undefined) {
            elem.text(result);
          }
        });
      };

      if(elem.text() === '') {
        elem.text(attr.staticPlaceholder || '')
      }

      elem
        .attr('contenteditable', true)

        .on('blur', function(event) {
          updateBlur(event);
        })

        .on('focus', function(event) {
          if(elem.text() == attr.staticPlaceholder) {
            elem.text('');
            return;
          }
        })

        .on('keydown', function(event) {
          if(event.ctrlKey || event.altKey) {
            return;
          }

          switch(event.keyCode) {
            case 13: // enter key
            {
              updateKeydown(event);
              break;
            }
          }

        });
    }
  };
}])

.directive('markdownEditor', ['$timeout', function($timeout) {
  return {
    restrict: 'C',
    require: 'ngModel',

    link: function($scope, element, attr, ngModel) {
      var editor = new Editor({
        element: element[0]
      });
      editor.render();

      editor.codemirror.on('change', function(instance) {
        var newValue = instance.getValue();
        if (newValue !== ngModel.$viewValue) {
          $timeout(function() {
            ngModel.$setViewValue(newValue);
          });
        }
      });

      ngModel.$render = function () {
        var safeViewValue = ngModel.$viewValue || '';
        editor.codemirror.setValue(safeViewValue);
      };
    }
  };
}])

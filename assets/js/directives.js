angular.module('TemplateFillerApp.directives', [])

.directive('datasetEditor', ['CurrentData', function(CurrentData) {
  return {
    restrict: 'EA',
    templateUrl: 'partials/DatasetEditor.html',
    
    link: function($scope) {
      $scope.data = CurrentData;
      
      $scope.getField = function(data, name) {
        return data[name] === undefined ? ' hgh' : data[name];
      }

      $scope.fieldEdited = function(index, newValue) {
        var oldValue = $scope.header[index];

        if(newValue === oldValue) {
          return;
        }

        if($scope.header.indexOf(newValue) !== -1) {
          // TODO: log error
          console.log('duplicated field: ', newValue);
          return;
        }

        console.log('field updated. was:', oldValue, 'now:', newValue);

        $scope.data.forEach(function(element) {
          var oldData = element[oldValue];

          if(oldData !== undefined) {
            element[newValue] = oldData;
            delete element[oldValue];
          }
        });

        $scope.header[index] = newValue;
      }
      $scope.fieldCreated = function(newValue) {
        if(newValue === '') {
          return '...';
        }

        if($scope.header.indexOf(newValue) !== -1) {
          // TODO: log error
          console.log('duplicated field: ', newValue);
          return;
        }

        console.log('field created:', newValue);

        $scope.header.push(newValue);
        return '';
      }
      $scope.dataUpdated = function(item, name, value) {
        item[name] = value;
      }

      $scope.createRow = function() {
        $scope.data.push({ });
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
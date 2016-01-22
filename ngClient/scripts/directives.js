(function() {
  'use strict';
  angular.module('app').directive('selected', ['$document',function($document){
    return {
      restrict: 'A',
      transclude: true,
      scope: { value: '=selected' },
      link: function(scope,element,attr){
        $document.on('mousedown', function(event){
          scope.down = true;
          //deselects everything
          scope.value = false;
          // element.removeClass('selected');
          // element.addClass('blank');
        });

        $document.on('mouseup', function(){
          scope.down = false;
          //open a modal dialog
          // scope.show = true;
        });

        element.on('mousedown', function(event){
          if (!scope.value) {
            scope.value = true;
            element.attr('class','');
            element.addClass('selected');
            console.log('is true');
          } else {
            scope.value = false;
            element.removeClass('selected');
            console.log('is false');
          }
        });

        element.on('mouseenter', function(event){
          if(scope.down){
            if (!scope.value){
              scope.value = true;
              element.attr('class','');
              element.addClass('selected');
            } else{
              scope.value = false;
              element.removeClass('selected');
            }
          }
        });
      }
    };
  }]);
})();

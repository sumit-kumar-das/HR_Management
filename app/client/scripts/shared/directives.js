(function() {
  'use strict';
  angular.module('app.directives', []).directive('pwCheck', [function () 
    {
    return {
                require: 'ngModel',
                link: function (scope, elem, attrs, ctrl) 
                {
                    var firstPassword = '#' + attrs.pwCheck;
                    elem.add(firstPassword).on('keyup', function () 
                    {
                        scope.$apply(function ()
                        {
                        var v = elem.val()===$(firstPassword).val();
                        ctrl.$setValidity('pwmatch', v);
                        });
                    });
                }
            };
    }]).directive('imgHolder', [
    function() {
      return {
        restrict: 'A',
        link: function(scope, ele, attrs) {
          return Holder.run({
            images: ele[0]
          });
        }
      };
    }
  ]).directive('customPage', function() {
    return {
      restrict: "A",
      controller: [
        '$scope', '$element', '$location','tokenStorage','$state', function($scope, $element, $location,tokenStorage,$state) {
          var addBg, path;
          path = function() {
            return $location.path();
          };
          addBg = function(path) {
              $('#onfocus').focus(function (){
                   alert("Focus");
              });
             
              if(path.match('setPassword')){
                  
                  path = path.substring(0,9);
              }
            $element.removeClass('body-wide body-err body-lock body-auth');
            switch (path) {
                case '/404':
                case '/404':
                case '/500':
                case '/401':
                    return $element.addClass('body-wide body-err');
                case '/signin':
                    var authTokan = tokenStorage.retrive();
                    if(authTokan)
                    {
                        $state.go('dashboard');
                    }else{
                        return $element.addClass('body-wide body-auth');
                    }
                case '/signup':
                case '/forgotCredentials':
                case '/Password/forgotPin':
                case '/Password/forgotPassword':
                case '/Password/forgotPinPassword':
                case '/Password':
                case '/Account/activateAccount':
                case '/Password/changePasswordPin':
                    return $element.addClass('body-wide body-auth');
                case '/lock-screen':
                    return $element.addClass('body-wide body-lock');
            }   
          };
          addBg($location.path());
          return $scope.$watch(path, function(newVal, oldVal) {
            if (newVal === oldVal) {
              return;
            }
            return addBg($location.path());
          });
        }
      ]
    };
  }).directive('uiColorSwitch', [
    function() {
      return {
        restrict: 'A',
        link: function(scope, ele, attrs) {
          return ele.find('.color-option').on('click', function(event) {
            var $this, hrefUrl, style;
            $this = $(this);
            hrefUrl = void 0;
            style = $this.data('style');
            if (style === 'loulou') {
              hrefUrl = 'styles/main.css';
              $('link[href^="styles/main"]').attr('href', hrefUrl);
            } else if (style) {
              style = '-' + style;
              hrefUrl = 'styles/main' + style + '.css';
              $('link[href^="styles/main"]').attr('href', hrefUrl);
            } else {
              return false;
            }
            return event.preventDefault();
          });
        }
      };
    }
  ]).directive('goBack', [
    function() {
      return {
        restrict: "A",
        controller: [
          '$scope', '$element', '$window', function($scope, $element, $window) {
            return $element.on('click', function() {
              return $window.history.back();
            });
          }
        ]
      };
    }
  ]).directive('zcConfirmClick', ['$ngBootbox','$log',
        function($ngBootbox,$log){
            return {
                priority: 1,
                terminal: true,
                link: function (scope, element, attr) {
                    var msg = attr.ngConfirmClick || "Are you sure you want to delete this record?";
                    var clickAction = attr.ngClick;
                    element.bind('click',function (event) {
//                        if ( window.confirm(msg) ) {
//                            scope.$eval(clickAction);
//                        }
                        $ngBootbox.confirm(msg).then(function (){
                            scope.$eval(clickAction);
                        },function (){
                            $log.info('Confirm dismissed');
                        });
                    });
                }
            };
    }]).directive('zcSweetConfirmClick', ['SweetAlert',
        function(SweetAlert){
            return {
                priority: 1,
                terminal: true,
                link: function (scope, element, attr) {
                    var msg = attr.ngSweetConfirmClick || "Are you sure you want to delete this record?";
                    var clickAction = attr.ngClick;
                    element.bind('click',function (event) {
                        SweetAlert.swal({
                            title: "Are you sure?",
                            text: msg,
                            type: "warning",
                            showCancelButton: true,
                            confirmButtonColor: "#DD6B55",
                            confirmButtonText: "Yes",
                            cancelButtonText: "No",
                            closeOnConfirm: true,
                            closeOnCancel: true}, 
                        function(isConfirm){ 
                            if (isConfirm) {
                                scope.$eval(clickAction);
                            } 
                        });
                    });
                }
            };
    }]).directive('zcCheckZip', function() {
		return {
			restrict: 'A',
			require: 'ngModel',
			link: function(scope, elem, attr, ngModel) {
				ngModel.$validators.zipcode = function(val) {
					var regexp = /^(?:[0-9]{5}|[0-9]{9})$/;
					if (val) {
						return regexp.test(val);
					} else {
						return true;
					}
				};
			}
		};
	}).directive('ngFocus', function($timeout) {
    return {
        link: function ( scope, element, attrs ) {
            scope.$watch( attrs.ngFocus, function ( val ) {
                if ( angular.isDefined( val ) && val ) {
                    $timeout( function () { element[0].focus(); } );
                }
            }, true);

            element.bind('blur', function () {
                if ( angular.isDefined( attrs.ngFocusLost ) ) {
                    scope.$apply( attrs.ngFocusLost );

                }
            });
        }
    };
}).directive('autofocus', ['$timeout', function($timeout) {
  return {
    restrict: 'A',
    link : function($scope, $element) {
      $timeout(function() {
        $element[0].focus();
      });
    }
  };
}]).directive('zcCapitalizeFirstLetter', function($parse) {
        return {
            require: 'ngModel',
            link: function (scope, element, attrs, modelCtrl) {
                var capitalize = function (inputValue) {
                    if (inputValue === undefined)
                    {
                        inputValue = '';
                    }
                    var capitalized = inputValue.charAt(0).toUpperCase() + inputValue.substring(1);
                    if (capitalized !== inputValue) 
                    {
                        modelCtrl.$setViewValue(capitalized);
                        modelCtrl.$render();
                    }
                    return capitalized;
                };
                modelCtrl.$parsers.push(capitalize);
                capitalize($parse(attrs.ngModel)(scope)); // capitalize initial value
            }
        };
    });
//.directive('zcConfirm',function (){
//      return{
//          restrict: 'A',
//          template: '<div class="modal-header">' +
//'  <h3>Do you want to delete ?</h3>' +
//'   </div>' +
//'   <div class="modal-footer">' +
//'        <button class="btn btn-danger btn-round" ng-click="cancel()"> <span class="glyphicon glyphicon-remove"></span> &nbsp; No</button> ' +
//'          <button class="btn btn-success btn-round" ng-click="ok()"> <span class="glyphicon glyphicon-ok"></span> &nbsp; Yes</button> ' +
//'            <button type="button" class = "close" data-dismiss="modal" aria-hidden="true" ng-click="cancel()" > Cancel </button>' +
//'              </div> ',
//    controller:function ($scope){
//        
//    }
//      };
//  })
  

}).call(this);

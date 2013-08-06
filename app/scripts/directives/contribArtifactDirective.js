'use strict';

angular.module('WeeknessApp')
.directive('contribArtifact', function () {
	return {
    // restrict to an attribute type.
    restrict: 'A',
    
    require: 'ngModel',
    
    // scope = the parent scope
    // elem = the element the directive is on
    // attr = a dictionary of attributes on the element
    // ctrl = the controller for ngModel.
    link: function(scope, elem, attr, ctrl) {
            
            //get the regex flags from the regex-validate-flags="" attribute (optional)
            //var flags = attr.contribArtifactFlags || '';
            
            // create the regex obj.
            //var regex = new RegExp(attr.contribArtifact, flags);            
                        
            // add a parser that will process each time the value is 
            // parsed into the model when the user updates it.
            ctrl.$parsers.unshift(function(value) {
                // set the validity after update.
                ctrl.$setValidity('contribArtifact', scope.flags.artifactUploaded);
   
                return value;
              });
            
            // add a formatter that will process each time the value 
            // is updated on the DOM element.
            ctrl.$formatters.unshift(function(value) {
                // validate.
                ctrl.$setValidity('contribArtifact', scope.flags.artifactUploaded);
                
                // return the value or nothing will be written to the DOM.
                return value;
              });
          }
  };
});
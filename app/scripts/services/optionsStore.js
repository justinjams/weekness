/*global $ */
'use strict';

angular.module('iso.services', [], function($provide) {
  $provide.factory('optionsStore', function() {
    var storedOptions = {};

    return {
      store: function(option) {
        storedOptions = $.extend.apply( null, [true, storedOptions].concat(option) );
      },
      retrieve: function() {
        return storedOptions;
      }
    };
  });
});
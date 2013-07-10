'use strict';

angular.module('WeeknessApp')
  .factory('uploadManager', function ($rootScope) {
    var _file = '';
    return {
        add: function (file) {
            _file = file;
            $rootScope.$broadcast('fileAdded', file.name);
        },
        clear: function () {
            _file = '';
        },
        file: function () {
            return file.file.name;
        },
        upload: function () {
            file.file.submit();
            this.clear();
        },
        setProgress: function (percentage) {
            $rootScope.$broadcast('uploadProgress', percentage);
        }
    };
});
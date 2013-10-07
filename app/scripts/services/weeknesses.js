'use strict';

angular.module('WeeknessApp')
  .service('weeknesses', function weeknesses($rootScope, db, user, _) {
		var $error = '';
		var fields = [
			'name',
			'title',
			'description',
			'categoryId',
			'artifactType',
			'generation'
		];
		var artifactTypes = [
			'image',
			'none'
		];
		return {
			error: $error,
			fields: fields,
			artifactTypes: artifactTypes,
			get: function (conditions, callback) {
				db.Weekness.query(conditions, {}, function(matches) {
					//console.log(matches);
					callback(matches);
				});
			},
			create: function(weekness) {
				weekness = _.pick(weekness, fields);
				var time = new Date().getTime();
				weekness.created = time;
				weekness.updated = time;
				weekness.createdBy = user.get()._id;
				db.Weekness.save(weekness, {}, function(e){
					console.log(e);
					console.log('Created weekness: '+weekness.title);
					$rootScope.$broadcast('weeknessdone');
				});
			}
		};
	});

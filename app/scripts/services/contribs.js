'use strict';

angular.module('WeeknessApp')
  .service('contribs', function contribs(db, $rootScope, users) {
		var $error = '';
		var $contribFields = [
			'title',
			'body',
			'weekness',
			'artifactType',
			'artifact'
		];
	/*
		title		- text
		body		- text/html + summary
		weakness	- taxonomy (ex: art/music/guitar/do or art/music/guitar/did)
		image		
		audio/video	- embed code for external media
		audio/video could be hosted on Soundcloud/YouTube or related services
	*/
		return {
			error: $error,
			get: function (conditions, callback) {
				db.Contrib.query(conditions, {}, function(matches) {
					//console.log(matches);
					callback(matches);
				});
			},
			create: function(contrib) {
				contrib = _.pick(contrib, $contribFields);
				//contrib.artifact = JSON.stringify(contrib.artifact);
				var time = new Date().getTime();
				contrib.created = time;
				contrib.updated = time;
				contrib.owner = users.user.get('_id')._id;
				db.Contrib.save(contrib, {}, function(e){
					console.log(e);
					console.log('Created contrib: '+contrib.title);
					$rootScope.$broadcast('contribdone');
				});
			}
		};
	});

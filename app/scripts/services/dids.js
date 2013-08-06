'use strict';

angular.module('WeeknessApp')
  .service('dids', function dids($rootScope, db, user, _) {
		var $error = '';
		var $fields = [
			'title',
			'body',
			'weekness',
			'artifactType',
			'artifact'
		];
	/*
		title		- text
		body		- text/html + summary
		weakness	- taxonomy (ex: art/music/guitar/did or art/music/guitar/did)
		image		
		audio/video	- embed code for external media
		audio/video could be hosted on Soundcloud/YouTube or related services
	*/
		return {
			error: $error,
			get: function (conditions, callback) {
				db.Did.query(conditions, {}, function(matches) {
					//console.log(matches);
					callback(matches);
				});
			},
			create: function(did) {
				did = _.pick(did, $fields);
				//did.artifact = JSON.stringify(did.artifact);
				var time = new Date().getTime();
				did.created = time;
				did.updated = time;
				did.owner = user.get()._id;
				db.did.save(did, {}, function(e){
					console.log(e);
					console.log('Created did: '+did.title);
					$rootScope.$broadcast('diddone');
				});
			}
		};
	});

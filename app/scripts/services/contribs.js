'use strict';

angular.module('WeeknessApp')
  .service('contribs', function contribs(db) {
		var $error = '';
		var $contrib = {
			title: undefined,
			body: undefined,
			weakness: undefined,
			artifactType: undefined,
			artifact: undefined
		};
/*	title		- text
	body		- text/html + summary
	weakness	- taxonomy (ex: art/music/guitar/do or art/music/guitar/did)
	image		
	audio/video	- embed code for external media
		* audio/video could be hosted on Soundcloud/YouTube or related services
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
				db.Contrib.save(contrib, function(){
					console.log('Created contrib: '+contrib.title);
				});
			}
		};
	});

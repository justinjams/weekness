'use strict';

angular.module('WeeknessApp')
  .service('todos', function todos($rootScope, $stateParams, db, user, _) {
		var $error = '';
		var $fields = [
			'title',
			'slug',
			'body',
			'weekness',
			'artifactType',
			'artifact',
			'generation',
			'votes',
			'duration'
		];
	/*
		title		- text
		body		- text/html + summary
		weakness	- taxonomy (ex: art/music/guitar/todo or art/music/guitar/did)
		image		
		audio/video	- embed code for external media
		audio/video could be hosted on Soundcloud/YouTube or related services
	*/
		return {
			error: $error,
			get: function (conditions, callback) {
				db.Todo.query(conditions, {}, function(matches) {
					console.log(matches);
					callback(matches);
				});
			},
			create: function(todo, callback) {
				console.log(todo);
				todo = _.pick(todo, $fields);
				//todo.artifact = JSON.stringify(todo.artifact);
				var time = new Date().getTime();
				todo.created = time;
				todo.updated = time;
				todo.owner = user.get()._id;
				db.Todo.save(todo, {}, function(err){
					if(!err) {
						if(callback) callback();
						$rootScope.$broadcast('todos:created');
					}
				});
			}
		};
	});

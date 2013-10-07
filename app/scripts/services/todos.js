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
			'generation'
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
					console.log(conditions);
					console.log(matches);
					callback(matches);
				});
			},
			find: function(conditions, callback) {
				db.Todo.$find(conditions, {}, function(matches) {
					console.log(matches);
				});
			},
			create: function(todo) {
				todo = _.pick(todo, $fields);
				//todo.artifact = JSON.stringify(todo.artifact);
				var time = new Date().getTime();
				todo.created = time;
				todo.updated = time;
				todo.owner = user.get()._id;
				db.Todo.save(todo, {}, function(e){
					console.log(e);
					console.log('Created todo: '+todo.title);
					$rootScope.$broadcast('tododone');
				});
			}
		};
	});

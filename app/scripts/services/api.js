'use strict';

angular.module('WeeknessApp')
  .service('api', function contribs(db, user, todos, dids, weeknesses, categories) {

		return {
			db: db,
			user: user,
			contribs: contribs,
			weeknesses: weeknesses,
			categories: categories,
			todos: todos,
			dids: dids,
			urlToParams: function(url) {
				var tokens = url.split('/'),
					i = 0,
					paramKeys = [
						'sort', 'prompt', 'era', 'weekness'
					],
					params = {};
				while(tokens[i]) {
					params[paramKeys[i]] = tokens[i++]
				}
				return params;
			}
		};
	});

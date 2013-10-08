'use strict';

angular.module('WeeknessApp')
  .service('api', function contribs(db, user, todos, dids, weeknesses, categories, $location) {

		return {
			db: db,
			user: user,
			contribs: contribs,
			weeknesses: weeknesses,
			categories: categories,
			todos: todos,
			dids: dids,
			getCurrentTodo: function(weekness, callback) {
				db.Todo.query({limit: 1, weekness: weekness.name, sort: 'expires', order: 'desc'}, {}, function(results) {
					callback(results[0]);
				});
			},
			slugify: function(text) {
    return text
        .toLowerCase()
        .replace(/ /g,'-')
        .replace(/[^\w-]+/g,'');
			},
			getWeekness: function() {
				if($location.$$url.indexOf('/weekness/') !== -1)
					return $location.$$url.match(/\/weekness\/([_0-9a-zA-Z]*)[^\/]*/)[1];
				else
					return '';
			},
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

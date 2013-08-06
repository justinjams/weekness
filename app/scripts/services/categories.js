'use strict';

angular.module('WeeknessApp')
  .service('categories', function contribs($rootScope, db, user, _) {
		var $error = '';
		var categories = {
		health: {
			title: 'Health',
			name: 'health'
		},
		lifestyle: {
			title: 'Lifestyle',
			name: 'lifestyle'
		},
		home: {
			title: 'Home',
			name: 'home'
		},
		art: {
			title: 'Art',
			name: 'art'
		},
		tech: {
			title: 'Tech',
			name: 'tech'
		},
		education: {
			title: 'Education',
			name: 'education'
		}
	};

	categories = _.map(categories, function(category) {
		category.url = '/categories/'+category.name;
		category.type = 'category';
		return category;
	});
		return {
			error: $error,
			get: function () {
				return categories;
			}
		};
	});

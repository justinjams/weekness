/*jshint unused: false */
/*global $ */
'use strict';

angular.module('WeeknessApp')
.service('navi', function navi($rootScope, $http, api, _) {
	var $errors = [];

	var categories = api.categories.get();

 var subscriptions = {
		beginnerPiano: {
			title: 'Beginner Piano',
			name: 'BeginnerPiano',
			url: '/weekness/BeginnerPiano',
			state: 'weeknesses',
			params: {
				weekness: 'BeginnerPiano'
			}
		},
		beginnerAngularJS: {
			title: 'Beginner AngularJS',
			name: 'BeginnerAngularJS',
			url: '/weekness/BeginnerAngularJS',
			state: 'weeknesses',
			params: {
				weekness: 'BeginnerAngularJS',
			}
		},
		param_test: {
			title: 'Beginner Piano',
			name: 'BeginnerPiano',
			url: '/weekness/BeginnerPiano/do/PlayMapleLeafRag',
			state: 'weeknessesDos',
			params: {
				weekness: 'BeginnerPiano',
				do: 'PlayMapleLeafRag'
			}
		}
	};
 var sideBarItems = {
 	menu: {
			createWeekness: {
				title: 'Create Weekness',
				name: 'createWeekness',
				url: '/create',
				state: 'createWeekness',
				params: {}
				}
			},
			subscriptions: subscriptions,
			categories: categories
	};
	//_.extend(sideBarItems, categories, subscriptions);

	var boxies = {};

	var moveView = function(boxie) {
			console.log(boxies);
	};

	return {
		sideBarItems: sideBarItems,
		boxies: boxies,
		get: function() { return boxies; },
		moveTo: function(boxie) {
			if(boxies[boxie.name]) {
				boxies[boxie.name].params = _.clone(boxie.params);
			} else {
				console.log(boxies);
				boxies = {};
				boxies[boxie.name] = boxie;
			}
			moveView(boxies[boxie.name]);
		}
	};
});
/*jshint unused: true */
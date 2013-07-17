var angularIsotopeCtrl = function($scope, $timeout, optionsStore) {
	'use strict';

	var onLayoutEvent = "isotope.onLayout"
	, postInitialized = false
	, isotopeContainer = null
	, buffer = []
	, scope = ""
	, isoMode = ""
	;

	$scope.$on(onLayoutEvent, function(event) {});

	$scope.layoutEventEmit = function($elems, instance) {
		$timeout(function() {
			$scope.$apply(function() {
				$scope.$emit(onLayoutEvent);
			});
		});
	};

	optionsStore.store({onLayout: $scope.layoutEventEmit});

	var initEventHandler = function(fun, evt, hnd) {
		if (evt) fun.call($scope, evt, hnd);
	};

	$scope.init = function(isoInit) {
		isotopeContainer = isoInit.element;
		initEventHandler($scope.$on, isoInit.isoOptionsEvent, optionsHandler);
		initEventHandler($scope.$on, isoInit.isoMethodEvent, methodHandler);
		$scope.isoMode = isoInit.isoMode || "addItems";

		$timeout(
				function() {
					isotopeContainer.isotope(optionsStore.retrieve());
					postInitialized = true;
				}
		);
	};


	$scope.setIsoElement = function($element) {
		if (postInitialized) {
			$timeout(function() {isotopeContainer.isotope($scope.isoMode, $element);});
		}
	};

	$scope.refreshIso = function() {
		if (postInitialized) {
			isotopeContainer.isotope();
		}
	};

	$scope.updateOptions = function(option) {
		if (isotopeContainer) {
			isotopeContainer.isotope(option);
		} else {
			optionsStore.store(option);
		}
	};

	// Event handling.
	var optionsHandler = function(event, option) {
		$scope.updateOptions(option);
	};

	var methodHandler = function(event, option) {
		var fun = option.fun;
		var params = option.params;
		fun.apply($scope, params);
	};

	// Defaults
	initEventHandler($scope.$on, 'iso-opts', optionsHandler);
	initEventHandler($scope.$on, 'iso-method', methodHandler);

	// Not used here.
	$scope.removeAll = function(cb) {
		isotopeContainer.isotope('remove',
			isotopeContainer.data('isotope').$allAtoms,cb);
	};

	$scope.refresh = function() {
		isotopeContainer.isotope();
	};

};
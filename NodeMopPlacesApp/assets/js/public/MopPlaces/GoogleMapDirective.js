(function () {

    var mopPlaceMod = angular.module("mopPlacesModule");

    mopPlaceMod.directive("mopPlacesDirective", function () {

        return {
            templateUrl: "templates/GoogleMapTemplate.html",
            controller: "MapController as mapController"
        }
    })

})();
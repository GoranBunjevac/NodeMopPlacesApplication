(function () {

    angular.module("mopPlacesModule").controller("MapController", ["$http", "MapPlacesService", "growl", function ($http, MapPlacesService, growl) {

        var self = this;

        self.service = MapPlacesService;
        self.saveCoord = saveCoord;
        self.clear = clear;
        self.isDisabled = false;



        setTimeout(function () { initialize(); }, 1000); // sets timeout allowing maps to initialize 
       
        var myCenter = new google.maps.LatLng(43.8585, 18.4200);
        var myplaces = [];
        var count = 0;
        var markers = [];
        var geocoder = new google.maps.Geocoder;


        function initialize() {

            var mapProp = {
                center: myCenter,
                zoom: 19,
                mapTypeId: google.maps.MapTypeId.ROADMAP
            };

            self.map = new google.maps.Map(document.getElementById("googleMap"), mapProp);
            google.maps.event.addListener(self.map, 'click', function (event) {
            
                 //max selected locations is 1
                if (count < 1) {
                    geocodeLatLng(event.latLng);
                    var GoogleApi = {
                        Long: event.latLng.lng(),
                        Lati: event.latLng.lat()
                    };
                    myplaces[count] = GoogleApi;

                }
              
                count++;
            });
              
        }
      
        // geocoding tranlating Lon and Lat into Adress and adding marker
        function geocodeLatLng(location) {

            geocoder.geocode({ 'location': location }, function (results, status) {
                if (status === google.maps.GeocoderStatus.OK) {
                    if (results[1]) {
                        var marker = new google.maps.Marker({
                            position: location,
                            map: self.map
                        });
                        markers.push(marker);
                    }
                }
            });
        }

        // function for coordinates save
        function saveCoord() {
            if(myplaces.length <= 0){
                growl.warning("Marker not added !");
            }
            
           else if (myplaces.length > 0) {
                var place = {
                    Name: self.name,
                    Category: self.category,
                    Description: self.description,
                    Long: myplaces[0].Long,
                    Lati: myplaces[0].Lati
                }
                data = JSON.stringify(place);
                console.log(place);
                console.log(data);
                console.log(myplaces);

                if (place.Category == null || place.Name == null || place.Description == null) {
                    growl.error("Name, Description or Category not added !");
                } else {
                    $http.post(url = "/GoogleMap/create", data
               ).then(function (response) {
                   myplaces = []
                   //growl.warning("Location successfully saved !");
                   console.log(place);
                    //console.log(data);
                    //growl.info("Location saved !");

               }, function (error) {
                   console.log(error);
                   myplaces = []
               });
                growl.success("Location successfully saved !");
                }
              
            }
        }
            

        
        //delete marker
        function clear() {
            for (var i = 0; i < markers.length; i++) {
                markers[i].setMap(null);
            }
            markers = [];
            myplaces = [];
            count = 0;
            //growl.success("Markers successfully deleted !")
        }


        self.getFood = getFood;
        self.getBars = getBars;
        self.getClubs = getClubs;
        self.food = [];
        self.bars = [];
        self.clubs = [];
        self.pozicija = {};
       

        function getFood() {
            $http.get("/GoogleMap/find").then(function (response) {
                self.food = response.data;
                //add markers for all food places
                angular.forEach(self.food, function (value, key) {
                    geocodeLatLng(event.latLng);
                    var GoogleApi = {
                        lng: Number(value.long),
                        lat: Number(value.lati)
                    };
                    var marker = new google.maps.Marker({
                        position: GoogleApi,
                        map: self.map
                    });
                    markers.push(marker);
                });              
            }, function (error) {
            });
        }

        function getBars() {
            $http.get("/GoogleMap/findBars").then(function (response) {
                self.bars = response.data;
                //add markers for all bar places
                angular.forEach(self.bars, function (value, key) {
                    geocodeLatLng(event.latLng);
                    var GoogleApi = {
                        lng: Number(value.long),
                        lat: Number(value.lati)
                    };
                    var marker = new google.maps.Marker({
                        position: GoogleApi,
                        map: self.map
                    });
                    markers.push(marker);
                });
            }, function (error) {
            });
        }

        function getClubs() {
            $http.get("/GoogleMap/findClubs").then(function (response) {
                self.clubs = response.data;
                //add markers for all club places
                angular.forEach(self.clubs, function (value, key) {
                    geocodeLatLng(event.latLng);
                    var GoogleApi = {
                        lng: Number(value.long),
                        lat: Number(value.lati)
                    };
                    var marker = new google.maps.Marker({
                        position: GoogleApi,
                        map: self.map
                    });
                    markers.push(marker);
                });
            }, function (error) {
            });
        }
      


    }]);

})();
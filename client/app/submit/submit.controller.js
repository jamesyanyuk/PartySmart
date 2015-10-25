'use strict';

angular.module('partyappApp')
  .controller('SubmitCtrl', function ($scope, $http, uiGmapGoogleMapApi, uiGmapIsReady) {
    uiGmapGoogleMapApi.then(function(maps) {
      var geocoder = new maps.Geocoder();
      var map;

      uiGmapIsReady.promise(1).then(function(instances) {
        map = instances[0].map;
      });

      console.log('Google Maps API Loaded.');

      $scope.lat = 50;
      $scope.lng = 50;

      $scope.igMarkers = [];

      $scope.markerOptions = {
        mainMarker: {
          draggable: true
        },
        igMarkers: {
          animation: maps.Animation.DROP
        }
      };

      $scope.addressChanged = function(newAddress) {
        geocoder.geocode({
          'address': newAddress
        }, function(results, status) {
          if (status === maps.GeocoderStatus.OK) {
            var location = results[0].geometry.location;

            // Center map on location
            map.setCenter(location);

            // Set marker at location
            $scope.mainMarker = {
              id: 0,
              latitude: location.lat(),
              longitude: location.lng(),
              showWindow: false,
              events: {
                dragend: function(ev) {
                  this.latitude = ev.position.lat();
                  this.longitude = ev.position.lng();

                  $scope.lat = this.latitude;
                  $scope.lng = this.longitude;

                  updateAddress();
                }
              }
            };
          }
        });
      };

      $scope.map = {
        center: {latitude: 45, longitude: -73},
        zoom: 8, // orig 8
        options: {
          scrollwheel: false,
          streetViewControl: false
        },
        events: {
          click: function (map, eventName, eventArgs) {
            var ev = eventArgs[0];
            var lat = ev.latLng.lat();
            var lng = ev.latLng.lng();

            $scope.lat = lat;
            $scope.lng = lng;

            updateAddress();

            $scope.mainMarker = {
              id: 0,
              latitude: lat,
              longitude: lng,
              showWindow: false,
              events: {
                dragend: function (evd) {
                  this.latitude = evd.position.lat();
                  this.longitude = evd.position.lng();

                  $scope.lat = this.latitude;
                  $scope.lng = this.longitude;

                  updateAddress();
                }
              }
            };

            console.log(eventName);

            $scope.$apply();
          }
        }
      };
    });

    $scope.submit = function() {
      if (!$scope.complainant || !$scope.address) {
        console.log('Not enough input');
      } else {
        $http.post('/api/complaint', {
          complainant: $scope.complainant,
          address: $scope.address,
          details: $scope.details,
          latitude: $scope.lat,
          longitude: $scope.lng
        }).success(function (complaint) {
          console.log('Successfully submitted complaint');
        }).error(function (err) {
          console.log('ERROR: ' + err);
        });
      }
    }

    function updateAddress() {
      $http.get('http://maps.googleapis.com/maps/api/geocode/json?latlng=' + $scope.lat + ',' + $scope.lng)
        .success(function(data) {
          $scope.address = data.results[0].formatted_address;
        });
    }
  });

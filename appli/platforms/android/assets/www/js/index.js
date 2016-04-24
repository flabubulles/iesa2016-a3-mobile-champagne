/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
        document.getElementById("findButton").addEventListener("click", app.findContact);
        document.getElementById("getPosition").addEventListener("click", app.getPosition);
        document.getElementById("checkLanguage").addEventListener("click", app.checkLanguage);
        document.getElementById("getPosition").addEventListener("click", app.getPosition);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
        app.findPicture();
        StatusBar.hide();
        app.compassPosition();
        app.getPosition();
    },

    findContact: function (){

        var finder = $('#find').val();

        function onSuccess(contacts) {
            $('#name').html(contacts[0].name.givenName+' '+contacts[0].name.familyName+' '+contacts[0].phoneNumbers[0].value+' '+contacts[0].emails[0].value+' '+contacts[0].organizations[0].title);
            alert('Found ' + contacts.length + ' contacts.');
        }

        function onError(contactError) {
            alert('Une erreur est survenue');
        }

        // find contact
        var options = new ContactFindOptions();
        options.filter = finder;
        var fields = ["displayName", "name"];
        navigator.contacts.find(fields, onSuccess, onError, options);

    },


    findPicture: function () {
        $('#findPhotoAlbum').click(function () {
            function cameraSuccess(imageData) {
                var imgCamera = document.getElementById('imgCamera');
                imgCamera.style.display = 'block';
                imgCamera.src = imageData;
            };

            function cameraError(message) {
                alert('Erreur : ' + message);
            };

            var cameraOptions = {
                destinationType: Camera.DestinationType.FILE_URI,
                sourceType: Camera.PictureSourceType.PHOTOLIBRARY,
                popoverOptions: new CameraPopoverOptions(300, 300, 100, 100, Camera.PopoverArrowDirection.ARROW_ANY)
            };

            navigator.camera.getPicture(cameraSuccess, cameraError, cameraOptions);
        });

        $('#camera').click(function () {
            function cameraSuccess(imageURI) {
                var imgCamera = document.getElementById('imgCamera');
                imgCamera.style.display = 'block';
                imgCamera.src = imageURI;
            };

            function cameraError(message) {
                alert('Erreur : ' + message);
            };

            var cameraOptions = {
                quality: 50,
                destinationType: Camera.DestinationType.FILE_URI,
                popoverOptions: new CameraPopoverOptions(300, 300, 100, 100, Camera.PopoverArrowDirection.ARROW_ANY)
            };

            navigator.camera.getPicture(cameraSuccess, cameraError, cameraOptions);
        });
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    },

    compassPosition: function () {
        var element = document.getElementById("boussole");
        function onSuccess(heading) {
            element.innerHTML = 'Boussole: ' + Math.round(heading.magneticHeading * 100) / 100;
        }
        function onError(error) {
            element.innerHTML= "Boussole indisponible";
        }
        var options = {
            frequency: 0
        };

        navigator.compass.watchHeading(onSuccess, onError, options);
    },


    getPosition: function () {

        function initMap(){
            var onSuccess = function (position){
                var lat = position.coords.latitude,
                    lng = position.coords.longitude;

                var mycoord = new google.maps.LatLng(lat,lng);

                var mapOptions = {
                    center: mycoord,
                    zoom: 16,
                    mapTypeControl: false,
                    streetViewControl: false,
                    zoomControl: true
                };

                var map = new google.maps.Map(document.getElementById('map'),mapOptions);

                var marker = new google.maps.Marker({
                    position: mycoord,
                    map: map
                });
            };

            function onError(error) {
                alert('code: '    + error.code    + '\n' + 'message: ' + error.message + '\n');
            }
            navigator.geolocation.getCurrentPosition(onSucces,onError);
        }
        google.maps.event.addDomListener(window,'load',initMap);

        var watchID = navigator.geolocation.getCurrentPosition(onSuccess, onError, options);
    },


    checkLanguage: function() {
    navigator.globalization.getPreferredLanguage(
        function (language) {alert('language: ' + language.value + '\n');},
        function () {alert('Error getting language\n');}
    );
}

};



app.initialize();





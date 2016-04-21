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
        document.getElementById("getPosition").addEventListener("click", app.getPosition);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
        app.findPicture();
        //app.getPosition();

        var findContacts = function() {


            $('#findButton').click(function() {

                var finder = $('#find').val();
                // $('#name').html(finder);

                function onSuccess(contacts) {
                    $('#name').html(contacts[0].name.givenName+' '+contacts[0].name.familyName+' '+contacts[0].phoneNumbers[0].value+' '+contacts[0].emails[0].value+' '+contacts[0].organizations[0].title);
                    alert('Found ' + contacts.length + ' contacts.');
                };

                function onError(contactError) {
                    alert('onError!');
                };

                // find contact 
                var options = new ContactFindOptions();
                options.filter= finder; 
                var fields = ["displayName", "name"];
                navigator.contacts.find(fields, onSuccess, onError, options);

            });
        }

        findContacts();
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


    getPosition: function () {

        var options = {
            enableHighAccuracy: true,
            maximumAge: 3600000
        }


        function onSuccess(position) {

            alert('Latitude: '          + position.coords.latitude          + '\n' +
                'Longitude: '         + position.coords.longitude         + '\n' +
                'Altitude: '          + position.coords.altitude          + '\n' +
                'Accuracy: '          + position.coords.accuracy          + '\n' +
                'Altitude Accuracy: ' + position.coords.altitudeAccuracy  + '\n' +
                'Heading: '           + position.coords.heading           + '\n' +
                'Speed: '             + position.coords.speed             + '\n' +
                'Timestamp: '         + position.timestamp                + '\n');
        };

        function onError(error) {
            alert('code: '    + error.code    + '\n' + 'message: ' + error.message + '\n');
        }

        var watchID = navigator.geolocation.getCurrentPosition(onSuccess, onError, options);
    }

};


app.initialize();





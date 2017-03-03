 var map;
        var myCenter = {lat: 55.706361, lng: 12.539333};

      function initMap() {
         map = new google.maps.Map(document.getElementById('map'), {
          zoom: 19,
          center: myCenter
        });

    if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(function(position) {
                    var minPos = {
                        lat: position.coords.latitude,
                        lng: position.coords.longitude
                    };
                    map.setCenter(minPos);
                    var mig = new google.maps.Marker({
                        position: minPos,
                        map: map,
                    });
                });
            }

        var bounds = {
            north: 55.70709697115852,
            south: 55.705625014979425,
            east: 12.541158243234577,
            west: 12.537507756765308
        }

        var overlay = new google.maps.GroundOverlay('mitoverlay-04.svg', bounds);
        overlay.setMap(map);
        $.getJSON("Google.json", importData);
      }

        function importData(JSONdata){
            JSONdata.forEach(createMarker);
        }



        function createMarker(info) {
            var marker = new google.maps.Marker({
                position: info.position,
                map: map,
                animation: google.maps.Animation.BOUNCE,
                icon:"trollface.png",
                title: info.navn
        });


        var infowindow = new google.maps.InfoWindow({
            content: "Ligegyldigt"
        });


        marker.addListener('click', function() {
            var klon = document.querySelector("#template_indhold").content.cloneNode(true);
            klon.querySelector(".overskrift").textContent = info.navn;
            klon.querySelector(".billede").src = info.billede;
            klon.querySelector(".beskrivelse").textContent = info.beskrivelse;
            infowindow.setContent(klon);
            infowindow.open(map, marker);
        });
    }

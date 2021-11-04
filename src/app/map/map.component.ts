import { Component, OnInit } from '@angular/core';

declare const L: any;

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {
  title = 'LocationApp';
  
  // What to do when the app is charged 
  ngOnInit(){
    if(!navigator.geolocation) {
      alert("Geolocation is not available");
    } 
    navigator.geolocation.getCurrentPosition((position) => {
      const coords = position.coords;
      const latLong = [coords.latitude, coords.longitude];
      const mymap = L.map('mapid').setView(latLong, 8);

      L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        maxZoom: 18,
        id: 'mapbox/streets-v11',
        tileSize: 512,
        zoomOffset: -1,
        accessToken: 'pk.eyJ1IjoidHJpczQ2MCIsImEiOiJja3U5NGh3ZjYwMHdvMnNwNGRkaW5mOWl6In0.QmylwVimyPHfEpm0TQob3A'
      }).addTo(mymap);

      let marker = L.marker(latLong).addTo(mymap);
      marker.bindPopup("<b>You're here</b>").openPopup();

      let popup = L.popup()
        .setLatLng([coords.latitude, coords.longitude])
        .setContent('I am a popup')
        .openOn(mymap);

      // Add leaflet-routing-machine
      L.Routing.control({
        waypoints: [
          L.latLng(coords.latitude, coords.longitude),
          L.latLng(21.883623132655234, -102.295269894441786)
        ]
      }).addTo(mymap);

      // Add Esri leaflet
      let arcgisOnlineProvider = L.esri.Geocoding.arcgisOnlineProvider({
        apikey: 'AAPK2b894d73745048c8b59bbd997cfdace1-4SZpfhfwEIeF6QFmZG-1NKVqLEm_stfBKmRJVvSdmXoii7tC8-b3rzIb5HBxoqu' // replace with your api key - https://developers.arcgis.com
      });
      let searcher = L.esri.Geocoding.geosearch({
        providers: [arcgisOnlineProvider]
      }).addTo(mymap);

      let results = L.layerGroup().addTo(mymap);

      searcher.on('results', (data: any) => {
        results.clearLayers();
        for(let i = data.results.length - 1; i >= 0; i--) {
          results.addLayer(L.marker(data.results[i].latlng));
        }
        
      })
      });
      this.watchPosition();
    }

    watchPosition() {
      let desLat = 0;
      let desLon = 0;
      let id = navigator.geolocation.watchPosition((position) => {
        console.log(`Lat: ${position.coords.latitude}, Lon: ${position.coords.longitude}`);
        if (position.coords.latitude === desLat) {
          navigator.geolocation.clearWatch(id);
        }
      },
      (err)=>{
        console.log(`Error: ${err}`);
      },
      {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0,
      });
    }
  }

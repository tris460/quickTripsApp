import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

declare const L: any;

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {
  title = 'LocationApp';
  startingPoint: string;
  arrivalPoint: string;
  distance: number;
  startingCoords: number[];
  arrivalCoords: number[];
  cost: number;

  constructor(private router: Router) {
    const userInfo = localStorage.getItem('loggedUser');
    if(!userInfo){
      this.router.navigateByUrl('/login')
    }
    this.startingPoint = 'Right here';
    this.arrivalPoint = '';
    this.distance = 0;
    this.startingCoords = [];
    this.arrivalCoords = [];
    this.cost = 0;
  }
  
  // What to do when the app is charged 
  ngOnInit() {
    if(!navigator.geolocation) {
      alert("Geolocation is not available");
    } 
    navigator.geolocation.getCurrentPosition((position) => {
      const coords = position.coords;
      const latLong = [coords.latitude, coords.longitude];
      const mymap = L.map('mapid').setView(latLong, 13);
      this.startingCoords = latLong;

      L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        maxZoom: 18,
        id: 'mapbox/streets-v11',
        tileSize: 512,
        zoomOffset: -1,
        accessToken: 'pk.eyJ1IjoidHJpczQ2MCIsImEiOiJja3U5NGh3ZjYwMHdvMnNwNGRkaW5mOWl6In0.QmylwVimyPHfEpm0TQob3A'
      }).addTo(mymap);

      // Save the results of search/click a place
      let results = L.layerGroup().addTo(mymap);

      // Add marker when the user clicks
      mymap.on('click', (object: any) => {
        results.clearLayers();
        results.addLayer(L.marker(object.latlng));
        route.spliceWaypoints(1, 1, object.latlng);
        setTimeout(() => {
          const pathRoute = route._routes[0];
          const pathSelectRoute = route._selectedRoute.coordinates;
          const i = pathSelectRoute.length - 1;
          this.distance = pathRoute.summary.totalDistance;
          this.arrivalPoint = pathRoute.name;
          const lat = pathSelectRoute[i].lat;
          const lon = pathSelectRoute[i].lng;
          this.arrivalCoords = [lat,lon];
        }, 1000);
      });

      let popup = L.popup()
        .setLatLng([coords.latitude, coords.longitude])
        .setContent('You are here')
        .openOn(mymap);

      // Add leaflet-routing-machine
      const route = L.Routing.control({
        waypoints: [
          L.latLng(coords.latitude, coords.longitude)
        ]
      }).addTo(mymap);

      // Add Esri leaflet
      let arcgisOnlineProvider = L.esri.Geocoding.arcgisOnlineProvider({
        apikey: 'AAPK2b894d73745048c8b59bbd997cfdace1-4SZpfhfwEIeF6QFmZG-1NKVqLEm_stfBKmRJVvSdmXoii7tC8-b3rzIb5HBxoqu' // replace with your api key - https://developers.arcgis.com
      });
      let searcher = L.esri.Geocoding.geosearch({
        providers: [arcgisOnlineProvider]
      }).addTo(mymap);

      searcher.on('results', (data: any) => {
        results.clearLayers();
        for(let i = data.results.length - 1; i >= 0; i--) {
          results.addLayer(L.marker(data.results[i].latlng));
          route.spliceWaypoints(1, 1, data.results[i].latlng);
        }
        setTimeout(() => {
          const pathRoute = route._routes[0];
          const pathSelectRoute = route._selectedRoute.coordinates;
          const i = pathSelectRoute.length - 1;
          this.distance = pathRoute.summary.totalDistance;
          this.arrivalPoint = pathRoute.name;
          const lat = pathSelectRoute[i].lat;
          const lon = pathSelectRoute[i].lng;
          this.arrivalCoords = [lat,lon];
        }, 1000);
      });
      });
      this.watchPosition();
    }

    watchPosition() {
      let desLat = 0;
      let desLon = 0;
      let id = navigator.geolocation.watchPosition((position) => {
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

    logout() {
      localStorage.removeItem('loggedUser');
      this.router.navigateByUrl('/login');
    }
  }

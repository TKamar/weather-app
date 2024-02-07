import { Component, OnInit } from '@angular/core';
import { WeatherService } from 'src/app/services/weather.service';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.scss']
})
export class WeatherComponent implements OnInit {

  searchCity: string = '';
  weatherData: any;
  isFavorite: boolean = false;

  constructor(private weatherService: WeatherService) { }

  ngOnInit(): void {
    this.setDefaultLocation();
  }

  searchWeather() {
    this.weatherService.getLocation(this.searchCity).subscribe((locations: any) => {
      if (locations && locations.lenght > 0) {
        const locationKey = locations[0].key;
        this.weatherService.getCurrentWeather(locationKey).subscribe((currentWeather: any) => {
          this.weatherData = currentWeather;
        });
      }
    });
  }

  toggleFavorite() {

  }


  private setDefaultLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;
        this.weatherService.getLocationByLatLon(lat, lon).subscribe((locationKey: any) => {
          this.weatherService.getCurrentWeather(locationKey.key).subscribe((currentWeather: any) => {
            this.weatherData = currentWeather;
          });
        });
      });
    }

  }

}

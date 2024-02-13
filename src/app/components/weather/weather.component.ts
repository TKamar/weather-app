import { Component, OnInit, Inject } from '@angular/core';
import { WEATHER_SERVICE_TOKEN, WeatherService } from 'src/app/services/weather.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FavoritesService } from 'src/app/services/favorites.service';
import { log } from 'console';


@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.scss']
})
export class WeatherComponent implements OnInit {

  searchCity: string = '';
  weatherData: any;
  isFavorite: boolean = false;
  defaultLocationKey = 'New York';
  temperature = '';
  weather = '';
  cityName = '';


  constructor(
    @Inject(WEATHER_SERVICE_TOKEN)
    private weatherService: WeatherService,
    private route: ActivatedRoute,
    private router: Router,
    private favoritesService: FavoritesService
  ) { }

  ngOnInit(): void {
    this.setDefaultLocation();
    this.route.queryParams.subscribe((params) => {
      if (params['id'] && params['name']) {
        this.loadFavoriteDetails(params['id'], params['name']);
      }
    });
  }

  private loadFavoriteDetails(id: number, name: string) {
    this.searchCity = name;
    this.searchWeather(this.searchCity);
    this.isFavorite = true;
  }

  searchWeather(city: string) {
    this.weatherService.getLocation(city).subscribe((locations: any) => {
      if (locations && locations.length > 0) {
        console.log('locations: ', locations);
        const locationKey = locations[0].key;
        this.cityName = locations[0].LocalizedName;
        this.weatherService.getCurrentWeather(locationKey).subscribe((currentWeather: any) => {
          this.weatherData = currentWeather;
          this.temperature = this.weatherData.Temperature.Metric.Value;
          this.weather = this.weatherData.WeatherText
        });
      }
    });
  }

  toggleFavorite() {
    if (this.isFavorite) {
      this.favoritesService.removeFavorite(this.weatherData.Key);
    } else {
      const newFavorite = {
        id: this.weatherData.Key,
        name: this.cityName,
        currentWeather: this.weatherData.WeaterText,
      };
      this.favoritesService.addFavorite(newFavorite);
    }
    this.isFavorite = !this.isFavorite;
  }




  private setDefaultLocation() {

    const isFavorite = this.favoritesService.getFavorites().some((fav) => fav.id === this.defaultLocationKey);

    if (isFavorite) {
      const defaultFavorite = this.favoritesService.getFavorites().find((fav) => fav.id === this.defaultLocationKey);
      if (defaultFavorite) {
        this.searchCity = defaultFavorite.name;
        this.searchWeather(this.searchCity);
        this.isFavorite = true;
      }
    } else {
      this.weatherService.getLocation(this.defaultLocationKey).subscribe((locations: any) => {
        if (locations && locations.length > 0) {
          const locationKey = locations[0].Key;
          console.log('locations:', locations);
          this.cityName = locations[0].LocalizedName;
          this.weatherService.getCurrentWeather(locationKey).subscribe((currentWeather: any) => {
            this.weatherData = currentWeather[0];
            console.log('this.weatherData:', this.weatherData);
            console.log('currentWeather:', currentWeather);


          });
        }
      });
    }
  }


}
/*
private setDefaultLocationTemp() {
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
*/

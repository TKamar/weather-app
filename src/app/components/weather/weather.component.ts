import { Component, OnInit } from '@angular/core';
import { WeatherService } from 'src/app/services/weather.service';
import { FormsModule } from "@angular/forms"
import { ActivatedRoute, Router } from '@angular/router';
import { FavoritesService } from 'src/app/services/favorites.service';


@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.scss']
})
export class WeatherComponent implements OnInit {

  searchCity: string = '';
  weatherData: any;
  isFavorite: boolean = false;
  defaultLocationKey = 'Tel Aviv';


  constructor(
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
    this.searchWeather();
    this.isFavorite = true;
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
    if (this.isFavorite) {
      this.favoritesService.removeFavorite(this.weatherData.Location.Key);
    } else {
      const newFavorite = {
        id: this.weatherData.Location.Key,
        name: this.weatherData.Location.LocalizedName,
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
        this.searchWeather();
        this.isFavorite = true;
      }
    } else {
      this.weatherService.getLocation(this.defaultLocationKey).subscribe((locations: any) => {
        if (locations && locations.length > 0) {
          const locationKey = locations[0].Key;
          this.weatherService.getCurrentWeather(locationKey).subscribe((currentWeather: any) => {
            this.weatherData = currentWeather[0];
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

import { Injectable, InjectionToken } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

export const WEATHER_SERVICE_TOKEN = new InjectionToken<WeatherService>('7x9LDkQYiuOo7a8g0m09HJcpZRnqtoRg');
@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  private apiKey = '7x9LDkQYiuOo7a8g0m09HJcpZRnqtoRg';
  private apiUrl = 'http://dataservice.accuweather.com';

  constructor(private http: HttpClient) { }

  getLocation(query: string): Observable<any> {
    const url = `${this.apiUrl}/locations/v1/cities/autocomplete?`;
    const params = { apikey: this.apiKey, q: query };
    return this.http.get(url, { params });
  }

  getCurrentWeather(locationKey: string): Observable<any> {
    const url = `${this.apiUrl}/currentconditions/v1/${locationKey}`;
    const params = { apikey: this.apiKey };
    return this.http.get(url, { params });
  }

  getLocationByLatLon(lat: number, lon: number): Observable<any> {
    const url = `${this.apiUrl}/locations/v1/cities/geoposition/search`;
    const params = { apikey: this.apiKey, q: `${lat},${lon}` };
    return this.http.get(url, { params });
  }

  get5Day(locationKey: string): Observable<any> {
    const url = `${this.apiUrl}/forecasts/v1/daily/5day/${locationKey}`;
    const params = { apikey: this.apiKey };
    return this.http.get(url, { params });
  }

}


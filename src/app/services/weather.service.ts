import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  private apiKey = 'dUDXKxunOL3I3mxtaV2XRgeLV1CKQ1WJ';
  private apiUrl = 'https://dataservice.accuweather.com';

  constructor(private http: HttpClient) { }

  getLocation(query: string): Observable<any> {
    const url = `${this.apiUrl}/locations/v1/cities/autocomplete`;
    const params = { apiKey: this.apiKey, q: query };
    return this.http.get(url, { params });
  }

  getCurrentWeather(locationKey: string): Observable<any> {
    const url = `${this.apiUrl}/currentconditions/v1/${locationKey}`;
    const params = { apiKey: this.apiKey };
    return this.http.get(url, { params });
  }

  getLocationByLatLon(lat: number, lon: number): Observable<any> {
    const url = `${this.apiUrl}/locations/v1/cities/geoposition/search`;
    const params = { apiKey: this.apiKey, q: `${lat},${lon}` };
    return this.http.get(url, { params });
  }

  get5Day(locationKey: string): Observable<any> {
    const url = `${this.apiUrl}/forecasts/v1/daily/5day/${locationKey}`;
    const params = { apiKey: this.apiKey };
    return this.http.get(url, { params });
  }

}


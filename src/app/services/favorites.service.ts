import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FavoritesService {

  private favorites: any[] = [];

  constructor() { }


  getFavorites(): any[] {
    return this.favorites;
  }

  addFavorite(favorite: any): void {
    this.favorites.push(favorite);
  }

  removeFavorite(id: number): void {
    this.favorites = this.favorites.filter((fav) => fav.id !== id);
  }
}

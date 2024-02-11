import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FavoritesService } from 'src/app/services/favorites.service';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.scss']
})
export class FavoritesComponent implements OnInit {

  favorites: any[] = [];

  constructor(
    private router: Router,
    private favoritesService: FavoritesService
  ) {
    this.favorites = this.favoritesService.getFavorites();
  }

  ngOnInit(): void {
  }

  viewFavorite(id: number) {
    const favorite = this.favorites.find((fav) => fav.id === id);
    if (favorite) {
      this.router.navigate(['/'], { queryParams: { id: favorite.id, name: favorite.name } });
    }

  }

}

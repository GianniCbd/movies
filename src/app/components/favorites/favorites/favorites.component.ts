import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Movies } from 'src/app/models/movies'; // Assuming Movies is the correct type
import { MoviesService } from 'src/app/service/movies.service';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.scss'],
})
export class FavoritesComponent implements OnInit {
  favoriteMovies: Movies[] = [];

  constructor(private router: Router, private moviesSrv: MoviesService) {}

  ngOnInit(): void {
    this.favoriteMovies = this.moviesSrv.getFavoriteMovies();
  }

  addToFavorites(movie: Movies): void {
    this.moviesSrv.addToFavorites(movie).subscribe(
      () => {
        console.log('Film aggiunto ai preferiti:', movie);
      },
      (error) => {
        console.error("Errore durante l'aggiunta ai preferiti:", error);
      }
    );
  }

  navigateToFavoritePage(): void {
    this.router.navigate(['/preferiti', { favorites: this.favoriteMovies }]);
  }
}

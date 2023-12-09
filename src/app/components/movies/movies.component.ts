import { Component, OnInit } from '@angular/core';
import { Movies } from 'src/app/models/movies';
import { MoviesService } from 'src/app/service/movies.service';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.scss'],
})
export class MoviesComponent implements OnInit {
  movies: Movies[] | undefined;
  movieStates: { [movieId: number]: boolean } = {};

  constructor(private moviesSrv: MoviesService) {}

  ngOnInit(): void {
    setTimeout(() => {
      this.moviesSrv.recupera().subscribe(
        (movies: Movies[]) => {
          this.movies = movies;
        },
        (error) => {
          console.error('Error fetching movies:', error);
        }
      );
    }, 1000);
  }

  getMoviePosterUrl(posterPath: string | null): string {
    return this.moviesSrv.getMoviePosterUrl(posterPath);
  }

  addToFavorites(movie: Movies): void {
    const movieId = movie.id;
    if (!this.movieStates.hasOwnProperty(movieId)) {
      this.movieStates[movieId] = false;
    }
    this.movieStates[movieId] = !this.movieStates[movieId];

    this.moviesSrv.addToFavorites(movie).subscribe(
      () => {
        console.log('Movie added to favorites successfully');
      },
      (error) => {
        console.error('Error adding movie to favorites:', error);
      }
    );
  }
}

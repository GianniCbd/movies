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

  constructor(private moviesSrv: MoviesService) {}

  ngOnInit(): void {
    setTimeout(() => {
      this.moviesSrv.recupera().subscribe((movies: Movies[]) => {
        this.movies = movies;
      });
    }, 1000);
  }

  getMoviePosterUrl(posterPath: string | null): string {
    return this.moviesSrv.getMoviePosterUrl(posterPath);
  }
}

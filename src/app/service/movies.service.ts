import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { Movies } from '../models/movies';
import { AuthService } from '../auth/auth.service';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class MoviesService {
  apiURL = environment.apiURL;

  private favoriteMovies: Movies[] = [];

  constructor(private http: HttpClient, private authSrv: AuthService) {}

  recupera(): Observable<Movies[]> {
    return this.http.get<Movies[]>(`${this.apiURL}movies-popular`);
  }

  getMoviePosterUrl(posterPath: string | null): string {
    const imageUrl = posterPath
      ? `${this.apiURL}${posterPath}`
      : 'path_to_default_image';
    console.log('Image URL:', imageUrl);
    return imageUrl;
  }

  addToFavorites(movie: Movies): Observable<any> {
    const userId = this.authSrv.getUserId();

    const endpoint = `${this.apiURL}favorites`;
    const payload = { userId: userId, movieId: movie.id };

    this.favoriteMovies.push(movie);

    return this.http.post(endpoint, payload);
  }

  getFavorites(): Observable<Movies[]> {
    const userId = this.authSrv.getUserId();

    return this.http
      .get<Movies[]>(`${this.apiURL}favorites?userId=${userId}`)
      .pipe(
        catchError((error) => {
          console.error('Error fetching favorites:', error);
          return throwError(
            'Failed to fetch favorites. Please try again later.'
          );
        })
      );
  }

  getFavoriteMovies(): Movies[] {
    return this.favoriteMovies;
  }
}

import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { SpotifyTokenService } from './spotify-token.service';
import { mergeMap } from 'rxjs/operators';
import { SearchResponse } from './types/search';
import { environment } from './../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MusicDataService {
  constructor(
    private spotifyToken: SpotifyTokenService,
    private http: HttpClient
  ) {}

  getNewReleases(): Observable<any> {
    return this.spotifyToken.getBearerToken().pipe(
      mergeMap((token: string) => {
        return this.http.get<any>(
          'https://api.spotify.com/v1/browse/new-releases',
          { headers: { Authorization: `Bearer ${token}` } }
        );
      })
    );
  }

  getArtistById(id: string): Observable<any> {
    return this.spotifyToken.getBearerToken().pipe(
      mergeMap((token: string) => {
        return this.http.get<any>(`https://api.spotify.com/v1/artists/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
      })
    );
  }

  getAlbumsByArtistId(id: string): Observable<any> {
    return this.spotifyToken.getBearerToken().pipe(
      mergeMap((token: string) => {
        return this.http.get<any>(
          `https://api.spotify.com/v1/artists/${id}/albums?include_groups=album,single&limit=50`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
      })
    );
  }

  getAlbumByID(id: string): Observable<any> {
    return this.spotifyToken.getBearerToken().pipe(
      mergeMap((token: string) => {
        return this.http.get<any>(`https://api.spotify.com/v1/albums/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
      })
    );
  }

  searchArtists(searchString: any): Observable<SearchResponse> {
    return this.spotifyToken.getBearerToken().pipe(
      mergeMap((token: string) => {
        return this.http.get<any>(
          `https://api.spotify.com/v1/search?q=${searchString}&type=artist&limit=50`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
      })
    );
  }

  addToFavourites(id: string): Observable<[String]> {
    return this.http
      .put<[String]>(`${environment.userAPIBase}/favourites/${id}`, id)
      .pipe(
        mergeMap((favourites) => {
          if (favourites.length > 0) {
            return this.spotifyToken.getBearerToken().pipe(
              mergeMap((token) => {
                return this.http.get<any>(
                  `https://api.spotify.com/v1/tracks?ids=${favourites.join(',')}`,
                  {
                    headers: { Authorization: `Bearer ${token}` },
                  }
                );
              })
            );
          } else {
            return new Observable((o) => o.next({ tracks: [] }));
          }
        })
      );
  }

  removeFromFavourites(id:string): Observable<any> {
    return this.http
      .delete<[String]>(`${environment.userAPIBase}/favourites/${id}`)
      .pipe(
        mergeMap((favourites) => {
          if (favourites.length > 0) {
            return this.spotifyToken.getBearerToken().pipe(
              mergeMap((token) => {
                return this.http.get<any>(
                  `https://api.spotify.com/v1/tracks?ids=${favourites.join(',')}`,
                  {
                    headers: { Authorization: `Bearer ${token}` },
                  }
                );
              })
            );
          } else {
            return new Observable((o) => o.next({ tracks: [] }));
          }
        })
      );
  }

  getFavourites(): Observable<any> {
    return this.http
      .get<[String]>(`${environment.userAPIBase}/favourites/`)
      .pipe(
        mergeMap((favourites) => {
          if (favourites.length > 0) {
            return this.spotifyToken.getBearerToken().pipe(
              mergeMap((token) => {
                return this.http.get<any>(
                  `https://api.spotify.com/v1/tracks?ids=${favourites.join(',')}`,
                  {
                    headers: { Authorization: `Bearer ${token}` },
                  }
                );
              })
            );
          } else {
            return new Observable((o) => o.next({ tracks: [] }));
          }
        })
      );
  }
}

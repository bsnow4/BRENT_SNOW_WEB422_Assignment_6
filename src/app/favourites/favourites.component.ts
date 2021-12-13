import { Component, OnInit } from '@angular/core';
import { MusicDataService } from '../music-data.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TracksResponse } from '../types/tracks';

@Component({
  selector: 'app-favourites',
  templateUrl: './favourites.component.html',
  styleUrls: ['./favourites.component.css'],
})
export class FavouritesComponent implements OnInit {
  favourites: any[] = [];

  constructor(
    private spotifyDataService: MusicDataService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.spotifyDataService
      .getFavourites()
      .subscribe((data: TracksResponse) => this.favourites = data.tracks);
  }

  removeFromFavourites(id: string) {
    this.spotifyDataService
      .removeFromFavourites(id)
      .subscribe((data: TracksResponse) => this.favourites = data.tracks);
    this.snackBar.open('Removing from Favourites...', 'Done', {
      duration: 15000,
    });
  }
}

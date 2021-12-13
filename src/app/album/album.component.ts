import { Component, OnInit } from '@angular/core';
import { MusicDataService } from '../music-data.service';
import { ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Album } from '../types/album';

@Component({
  selector: 'app-album',
  templateUrl: './album.component.html',
  styleUrls: ['./album.component.css'],
})
export class AlbumComponent implements OnInit {
  album!: Album;
  id!: string;

  constructor(
    private spotifyDataService: MusicDataService,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar
  ) {
    this.route.params.subscribe((params: any) => (this.id = params['id']));
  }

  ngOnInit(): void {
    this.spotifyDataService
      .getAlbumByID(this.id)
      .subscribe((album: Album) => (this.album = album));
  }

  addToFavourites(trackID: string) {
    this.spotifyDataService.addToFavourites(trackID).subscribe(
      success => {
        this.snackBar.open('Added to Favourites...', 'Done', {
          duration: 15000,
        });
      }
    );
  }
}

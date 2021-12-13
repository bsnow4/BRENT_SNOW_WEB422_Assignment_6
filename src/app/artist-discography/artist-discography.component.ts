import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MusicDataService } from '../music-data.service';
import { Album, Albums } from '../types/albums';
import { Artist } from '../types/artist';

@Component({
  selector: 'app-artist-discography',
  templateUrl: './artist-discography.component.html',
  styleUrls: ['./artist-discography.component.css'],
})
export class ArtistDiscographyComponent implements OnInit {
  id!: string;
  albums!: Album[];
  artist!: Artist;

  constructor(
    private route: ActivatedRoute,
    private spotifyDataService: MusicDataService
  ) {
    this.route.params.subscribe((params: any) => (this.id = params['id']));
  }

  ngOnInit(): void {
    this.spotifyDataService
      .getArtistById(this.id)
      .subscribe((artist: Artist) => (this.artist = artist));
    this.spotifyDataService.getAlbumsByArtistId(this.id).subscribe((albums: Albums) => {
      this.albums = albums.items.filter(
        (curValue: any, index: any, self: any) =>
          self.findIndex(
            (t: any) => t.name.toUpperCase() === curValue.name.toUpperCase()
          ) === index
      );
    });
  }
}

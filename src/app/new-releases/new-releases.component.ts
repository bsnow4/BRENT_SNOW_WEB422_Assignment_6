import { Component, OnInit } from '@angular/core';
import { MusicDataService } from '../music-data.service';
import { AlbumsResponse } from '../types/albums';

@Component({
  selector: 'app-new-releases',
  templateUrl: './new-releases.component.html',
  styleUrls: ['./new-releases.component.css'],
})
export class NewReleasesComponent implements OnInit {
  releases: any[] = [];

  constructor(private spotifyDataService: MusicDataService) {}

  ngOnInit(): void {
    this.spotifyDataService
      .getNewReleases()
      .subscribe((data: AlbumsResponse) => this.releases = data.albums.items);
  }
}

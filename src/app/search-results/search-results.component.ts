import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MusicDataService } from '../music-data.service';
import { SearchResponse, Item } from '../types/search';

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.css'],
})
export class SearchResultsComponent implements OnInit {
  searchResults: any;
  searchQuery: string = '';

  constructor(
    private route: ActivatedRoute,
    private dataService: MusicDataService
  ) {
    this.route.queryParamMap.subscribe((params: any) => {
      this.searchQuery = params.get('q');
    });
  }

  ngOnInit(): void {
    this.dataService.searchArtists(this.searchQuery).subscribe((data: SearchResponse) => {
      this.searchResults = data
        .artists
        .items
        .filter((item: Item) => item.images.length > 0);
    });
  }
}

import { Component, OnInit } from '@angular/core';
import { NgxLoadingService } from 'ngx-loading';
import { StoryModel } from 'src/app/model/StoryModel';
import { StoryService } from 'src/app/story.service';

@Component({
  selector: 'app-story',
  templateUrl: './story.component.html',
  styleUrls: ['./story.component.scss']
})
export class StoryComponent implements OnInit {

  currentPage = 1; // Current page number
  itemsPerPage = 5; // Number of items per page
  pages: number[] = []; // Array to hold page numbers
  totalItems: number =0; // Total number of items
  storyModel : StoryModel[] =[];
  keyword = '';

  public loading = false;

  constructor(private storyService: StoryService,private spinner: NgxLoadingService) {
   
  }

  fetchStory(){
    this.loading = true;
    this.storyService.getData(0,20,this.keyword).subscribe(
      (response) => {
        this.storyModel = response.data; 
        console.log( response);
        this.loading = false;
        this.totalItems = this.storyModel.length;
      },
      error => {
        this.loading = false;
        console.error('Error fetching data:', error);
      }
    );
    this.updatePaginatedItems();
  }

  ngOnInit(): void {
  this.fetchStory();
  }
  isNullOrWhiteSpace(value: string | null | undefined): boolean {
    return !value || !value.trim();
  }
  updatePaginatedItems(): void {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.storyModel = this.storyModel.slice(startIndex, endIndex);
  }

  goToPage(page: number): void {
    this.currentPage = page;
    this.updatePaginatedItems();
  }

  get totalPages(): number {
    return Math.ceil(this.totalItems / this.itemsPerPage);
  }

}

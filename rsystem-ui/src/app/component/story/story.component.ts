import { Component, OnInit } from '@angular/core';
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

  constructor(private storyService: StoryService) {
   
  }

  ngOnInit(): void {
    this.storyService.getData().subscribe(
      (response) => {
        this.storyModel = response.data; 
        console.log( this.storyModel);
        this.totalItems = this.storyModel.length;
      },
      error => {
        console.error('Error fetching data:', error);
      }
    );
    this.updatePaginatedItems();
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

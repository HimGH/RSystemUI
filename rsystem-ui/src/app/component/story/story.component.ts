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

  currentPage = 1; 
  itemsPerPage = 10; 
  pages: number[] = []; 
  totalItems: number =-1; 
  storyModel : StoryModel[] =[];
  keyword = '';
messag = "";
  public loading = false;

  constructor(private storyService: StoryService,private spinner: NgxLoadingService) {
   
  }

  fetchStory(pN=0,pS=10){
    this.loading = true;
    this.storyService.getData(pN,pS,this.keyword).subscribe(
      (response) => {
        this.storyModel = response.data; 
        console.log( response);
        console.log( this.storyModel);
        this.loading = false;
        this.totalItems = response.totalCount;
        console.log( this.totalItems);
        
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
    this.fetchStory(this.currentPage);
    this.updatePaginatedItems();
  }

  get totalPages(): number {

    return  Math.ceil(this.totalItems / this.itemsPerPage);
  }

  get totalPagesArr(): number[] {

    let noOfPage =  Math.ceil(this.totalItems / this.itemsPerPage);
    return Array.from({ length: 5 }, (_, i) => i + 1);
  }



}

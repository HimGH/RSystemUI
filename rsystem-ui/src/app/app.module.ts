import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StoryComponent } from './component/story/story.component';
import { HttpClientModule } from '@angular/common/http';
import { StoryService } from './story.service';
import { NgxLoadingModule } from 'ngx-loading';
import { FormsModule } from '@angular/forms';
@NgModule({
  declarations: [
    AppComponent,
    StoryComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgxLoadingModule.forRoot({}),
    FormsModule
  ],
  providers: [StoryService],
  bootstrap: [AppComponent],
  schemas:[CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }

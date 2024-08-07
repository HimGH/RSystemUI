import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StoryComponent } from './component/story/story.component';
import { HttpClientModule } from '@angular/common/http';
import { StoryService } from './story.service';

@NgModule({
  declarations: [
    AppComponent,
    StoryComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [StoryService],
  bootstrap: [AppComponent]
})
export class AppModule { }

import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CloudinaryModule } from '@cloudinary/ng'
import { AppRoutingModule } from './app-routing.module';

// Custom modules

import { AppComponent } from './app.component';

// Services
import { MessageService } from './services/message.service';
import { MessageComponent } from './chat/ui/message/message.component';

@NgModule({
  declarations: [
    AppComponent,
    MessageComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    FontAwesomeModule,
    CloudinaryModule,
  ],
  providers: [MessageService],
  bootstrap: [AppComponent]
})
export class AppModule { }

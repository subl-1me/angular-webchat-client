import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoaderSkeletonRoutingModule } from './loader-skeleton-routing.module';
import { LoaderSkeletonComponent } from './loader-skeleton.component';


@NgModule({
  declarations: [LoaderSkeletonComponent],
  imports: [
    CommonModule,
    LoaderSkeletonRoutingModule
  ],
  exports: [ LoaderSkeletonComponent ]
})
export class LoaderSkeletonModule { }

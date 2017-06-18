import {Routes} from '@angular/router';
import {MediaStreamComponent} from './media-stream/media-stream.component';
import {InstantSearchComponent} from './instant-search/instant-search.component';

export const BARCODE_ROUTE: Routes = [
  {
    path: 'search',
    component: InstantSearchComponent
  },
  {
    path: 'media',
    component: MediaStreamComponent
  },
];

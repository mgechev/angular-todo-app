import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';

import { BrowserModule } from '@angular/platform-browser';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    RouterModule.forRoot([
      {
        path: 'todos',
        component: AppComponent,
        children: [
          {
            path: 'app',
            loadChildren: () => import('./home/home.module').then(m => m.HomeModule),
          },
          {
            path: '**',
            redirectTo: 'app',
          },
        ],
      },
      {
        path: '**',
        redirectTo: 'todos',
      },
    ]),
  ],
  exports: [AppComponent],
  bootstrap: [AppComponent],
})
export class AppModule {}

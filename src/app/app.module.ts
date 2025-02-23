import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';

import 'hammerjs';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TranslateModule } from '@ngx-translate/core';
import { ToastrModule } from 'ngx-toastr'; // For auth after login toast

import { CoreModule } from '@core/core.module';
import { CoreCommonModule } from '@core/common.module';
import { CoreSidebarModule, CoreThemeCustomizerModule } from '@core/components';

import { coreConfig } from 'app/app-config';

import { AppComponent } from 'app/app.component';
import { LayoutModule } from 'app/layout/layout.module';
import { SampleModule } from 'app/main/sample/sample.module';
import { FormsModule } from '@angular/forms';
import { AuthGuard } from './auth/guards/auth.guard';

const appRoutes: Routes = [
  {
    path: 'pages',
    loadChildren: () => import('./main/pages/pages.module').then(m => m.PagesModule)
  },
  {
    path: 'profile',
    loadChildren: () => import('./main/pages/profile/profile.module').then(m => m.ProfileModule)
  },
  {
    path: 'gestion-des-entities',
    loadChildren: () =>import('./main/gestion-des-entites/gestion-des-entites.module').then(m=>m.GestionDesEntitesModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'reglement',
    loadChildren: () => import('./main/reglement/reglement.module').then(m=>m.ReglementModule),
    canActivate: [AuthGuard]
  },
  {
    path:'tresorerie',
    loadChildren: () => import('./main/tresorerie/tresorerie.module').then(m=>m.TresorerieModule),
    canActivate: [AuthGuard]
  },
 
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: '/pages/miscellaneous/error' //Error 404 - Page not found
  }
];

@NgModule({
  declarations: [AppComponent],
  imports: [
    FormsModule ,
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes, {
      scrollPositionRestoration: 'enabled', // Add options right here
      relativeLinkResolution: 'legacy'
    }),
    TranslateModule.forRoot(),

    //NgBootstrap
    NgbModule,
    ToastrModule.forRoot(),

    // Core modules
    CoreModule.forRoot(coreConfig),
    CoreCommonModule,
    CoreSidebarModule,
    CoreThemeCustomizerModule,

    // App modules
    LayoutModule,
    SampleModule
  ],

  bootstrap: [AppComponent]
})
export class AppModule { }

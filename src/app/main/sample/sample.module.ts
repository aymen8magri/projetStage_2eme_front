import { Component, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

import { CoreCommonModule } from '@core/common.module';

import { ContentHeaderModule } from 'app/layout/components/content-header/content-header.module';

import { SampleComponent } from './sample.component';
import { HomeComponent } from './home.component';
import { ChartsModule } from 'ng2-charts';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgApexchartsModule } from 'ng-apexcharts';
import { AuthGuard } from 'app/auth/guards/auth.guard';

const routes = [
  {
    path: 'statistics',
    title: 'Statistics',
    component: SampleComponent,
    canActivate: [AuthGuard],
    data: { animation: 'sample' }
  },
  {
    path: 'home',
    title: 'Home',
    component: HomeComponent,
    data: { animation: 'home' }
  }
];

@NgModule({
  declarations: [SampleComponent, HomeComponent],
  imports: [RouterModule.forChild(routes), ContentHeaderModule, TranslateModule, CoreCommonModule, ChartsModule, NgbModule, NgApexchartsModule ],
  exports: [SampleComponent, HomeComponent]
})
export class SampleModule {}

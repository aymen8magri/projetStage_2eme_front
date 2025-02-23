import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableauDeBordComponent } from './tableau-de-bord/tableau-de-bord.component';
import { RouterModule } from '@angular/router';
import { CoreCommonModule } from '@core/common.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgxMaskModule } from 'ngx-mask';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { CoreSidebarModule } from '@core/components';
import { CoreDirectivesModule } from '@core/directives/directives';
import { CorePipesModule } from '@core/pipes/pipes.module';
import { Ng2FlatpickrModule } from 'ng2-flatpickr';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { QuillModule } from 'ngx-quill';
import { SituationDuMoisComponent } from './situation-du-mois/situation-du-mois.component';

const routes = [
  {
    path: 'tableau-de-bord',
    component: TableauDeBordComponent,
    title: 'Tableau de Bord',
    data: { animation: 'tableau-de-bord' }
  },
  {
    path:'situation-du-mois',
    component: SituationDuMoisComponent,
    title: 'Situation du Mois',
    data: { animation:'situation-du-mois' }
  }
]


@NgModule({
  declarations: [
    TableauDeBordComponent,
    SituationDuMoisComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    CoreCommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    Ng2FlatpickrModule,
    CorePipesModule,
    CoreDirectivesModule,
    CoreSidebarModule,
    NgxDatatableModule,
    NgxMaskModule.forRoot(),
    NgSelectModule,
    QuillModule.forRoot()
  ]
})
export class TresorerieModule { }

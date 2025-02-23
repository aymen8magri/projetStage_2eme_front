import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddPayementClientComponent } from './payement-client/add-payement-client/add-payement-client.component';
import { ListPayementClientComponent } from './payement-client/list-payement-client/list-payement-client.component';
import { ListPayementFournisseurComponent } from './payement-fournisseur/list-payement-fournisseur/list-payement-fournisseur.component';
import { AddPayementFournisseurComponent } from './payement-fournisseur/add-payement-fournisseur/add-payement-fournisseur.component';
import { RouterModule, Routes } from '@angular/router';
import { CoreCommonModule } from '@core/common.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { Ng2FlatpickrModule } from 'ng2-flatpickr';
import { CorePipesModule } from '@core/pipes/pipes.module';
import { CoreDirectivesModule } from '@core/directives/directives';
import { CoreSidebarModule } from '@core/components';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { NgxMaskModule } from 'ngx-mask';
import { NgSelectModule } from '@ng-select/ng-select';
import { EditPayementClientComponent } from './payement-client/edit-payement-client/edit-payement-client.component';
import { EditPayementFournisseurComponent } from './payement-fournisseur/edit-payement-fournisseur/edit-payement-fournisseur.component';

const routes: Routes = [
  { path: 'add-payement-client', title: 'Ajouter Payement Client', component: AddPayementClientComponent },
  { path: 'add-payement-fournisseur', title: 'Ajouter Payement Fournisseur', component: AddPayementFournisseurComponent },

  { path: 'list-payement-client', title: 'Liste Payement Client', component: ListPayementClientComponent },
  { path: 'list-payement-fournisseur', title: 'Liste Payement Fournisseur', component: ListPayementFournisseurComponent },

  { path: 'edit-payement-client/:id', title: 'Modifier Payement Client', component: EditPayementClientComponent },
  { path: 'edit-payement-fournisseur/:id', title: 'Modifier Payement Fournisseur', component: EditPayementFournisseurComponent },
];

@NgModule({
  declarations: [
    AddPayementClientComponent,
    ListPayementClientComponent,
    ListPayementFournisseurComponent,
    AddPayementFournisseurComponent,
    EditPayementClientComponent,
    EditPayementFournisseurComponent
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
    NgSelectModule
  ]
})
export class ReglementModule { }

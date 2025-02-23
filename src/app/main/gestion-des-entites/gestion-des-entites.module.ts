import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddBanquesComponent } from './banques/add-banques/add-banques.component';
import { RouterModule, Routes } from '@angular/router';
import { AddRegionsComponent } from './regions/add-regions/add-regions.component';
import { AddSocieteComponent } from './societe/add-societe/add-societe.component';
import { AddModeDePayementComponent } from './modeDePayement/add-mode-de-payement/add-mode-de-payement.component';
import { ListModeDePayementComponent } from './modeDePayement/list-mode-de-payement/list-mode-de-payement.component';
import { ListBanquesComponent } from './banques/list-banques/list-banques.component';
import { ListRegionsComponent } from './regions/list-regions/list-regions.component';
import { ListSocieteComponent } from './societe/list-societe/list-societe.component';
import { ListClientComponent } from './clients/list-client/list-client.component';
import { AddClientComponent } from './clients/add-client/add-client.component';
import { AddFournisseureComponent } from './fournisseures/add-fournisseure/add-fournisseure.component';
import { ListFournisseureComponent } from './fournisseures/list-fournisseure/list-fournisseure.component';
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
import { EditBanqueComponent } from './banques/edit-banque/edit-banque.component';
import { EditClientComponent } from './clients/edit-client/edit-client.component';
import { EditFournisseuresComponent } from './fournisseures/edit-fournisseures/edit-fournisseures.component';
import { EditModeDePayementComponent } from './modeDePayement/edit-mode-de-payement/edit-mode-de-payement.component';
import { EditRegionsComponent } from './regions/edit-regions/edit-regions.component';
import { EditSocieteComponent } from './societe/edit-societe/edit-societe.component';
import { ViewBanqueComponent } from './banques/view-banque/view-banque.component';
import { ViewClientComponent } from './clients/view-client/view-client.component';
import { ViewFournisseurComponent } from './fournisseures/view-fournisseur/view-fournisseur.component';
import { ViewSocieteComponent } from './societe/view-societe/view-societe.component';

const routes: Routes = [
  { path: 'add-banques', title: "Ajouter Banques", component: AddBanquesComponent },
  { path: 'add-regions', title: "Ajouter Régions", component: AddRegionsComponent },
  { path: 'add-mode-de-payement', title: "Ajouter Mode de Paiement", component: AddModeDePayementComponent },
  { path: 'add-societe', title: "Ajouter Société", component: AddSocieteComponent },
  { path: 'add-client', title: "Ajouter Client", component: AddClientComponent },
  { path: 'add-fournisseur', title: "Ajouter Fournisseur", component: AddFournisseureComponent },

  { path: 'list-mode-de-payement', title: "Liste des Modes de Paiement", component: ListModeDePayementComponent },
  { path: 'list-banques', title: "Liste des Banques", component: ListBanquesComponent },
  { path: 'list-regions', title: "Liste des Régions", component: ListRegionsComponent },
  { path: 'list-societe', title: "Liste des Sociétés", component: ListSocieteComponent },
  { path: 'list-client', title: "Liste des Clients", component: ListClientComponent },
  { path: 'list-fournisseur', title: "Liste des Fournisseurs", component: ListFournisseureComponent },

  { path: 'edit-banque/:id', title: "Modifier Banque", component: EditBanqueComponent },
  { path: 'edit-client/:id', title: "Modifier Client", component: EditClientComponent },
  { path: 'edit-fournisseur/:id', title: "Modifier Fournisseur", component: EditFournisseuresComponent },
  { path: 'edit-mode-de-payement/:id', title: "Modifier Mode de Paiement", component: EditModeDePayementComponent },
  { path: 'edit-regions/:id', title: "Modifier Région", component: EditRegionsComponent },
  { path: 'edit-societe/:id', title: "Modifier Société", component: EditSocieteComponent },

  { path: 'view-banque/:id', title: "Voir Banque", component: ViewBanqueComponent },
  { path: 'view-client/:id', title: "Voir Client", component: ViewClientComponent },
  { path: 'view-fournisseur/:id', title: "Voir Fournisseur", component: ViewFournisseurComponent },
  { path: 'view-societe/:id', title: "Voir Société", component: ViewSocieteComponent },

];

@NgModule({
  declarations: [
    AddBanquesComponent,
    AddRegionsComponent,
    AddModeDePayementComponent,
    AddSocieteComponent,
    AddModeDePayementComponent,
    ListModeDePayementComponent,
    ListBanquesComponent,
    ListRegionsComponent,
    ListSocieteComponent,
    ListClientComponent,
    AddClientComponent,
    AddFournisseureComponent,
    ListFournisseureComponent,
    EditBanqueComponent,
    EditClientComponent,
    EditFournisseuresComponent,
    EditModeDePayementComponent,
    EditRegionsComponent,
    EditSocieteComponent,
    ViewBanqueComponent,
    ViewClientComponent,
    ViewFournisseurComponent,
    ViewSocieteComponent,
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
export class GestionDesEntitesModule { }

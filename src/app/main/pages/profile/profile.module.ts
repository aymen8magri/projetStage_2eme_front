import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { RouterModule, Routes } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CoreCommonModule } from '@core/common.module';
import { ContentHeaderModule } from 'app/layout/components/content-header/content-header.module';
import { Ng2FlatpickrModule } from 'ng2-flatpickr';
import { UserService } from 'app/auth/service';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthGuard } from 'app/auth/guards/auth.guard';


const routes: Routes = [
  {
    path: 'edit-profile',
    component: EditProfileComponent,
    canActivate: [AuthGuard]
  }
];


@NgModule({
  declarations: [
    EditProfileComponent
  ],
  imports: [
    CommonModule,
    NgbModule,
    RouterModule.forChild(routes),
    CoreCommonModule,
    ContentHeaderModule,
    Ng2FlatpickrModule,
    ReactiveFormsModule
  ],
  providers: [
    UserService
  ]
})
export class ProfileModule { }

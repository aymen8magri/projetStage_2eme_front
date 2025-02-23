import { Component, OnInit, OnDestroy, ViewEncapsulation, inject } from '@angular/core';

import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { FlatpickrOptions } from 'ng2-flatpickr';
import { UserService } from 'app/auth/service';
import { FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss'],
  encapsulation: ViewEncapsulation.None

})
export class EditProfileComponent implements OnInit, OnDestroy {
  // public
  public contentHeader: object;
  public data: any;
  public birthDateOptions: FlatpickrOptions = {
    altInput: true
  };
  public passwordTextTypeOld = false;
  public passwordTextTypeNew = false;
  public passwordTextTypeRetype = false;

  // private
  private _unsubscribeAll: Subject<any>;

  /**
   * Constructor
   *
   * @param {AccountSettingsService} _accountSettingsService
   * @param {ToastrService} _toastrService

   */
  constructor(private _userService: UserService) {
    this._unsubscribeAll = new Subject();
  }
  readonly fb: FormBuilder = inject(FormBuilder);
  readonly toastr: ToastrService = inject(ToastrService);



  // Public Methods
  // -----------------------------------------------------------------------------------------------------


  /**
   * Toggle Password Text Type New
   */
  togglePasswordTextTypeNew() {
    this.passwordTextTypeNew = !this.passwordTextTypeNew;
  }


  /**
   * Upload Image
   *
   * @param event
   */

  image: any;
  public avatarImage: string;

  uploadImage(event: any): void {
    if (event.target.files && event.target.files[0]) {
      let reader = new FileReader();

      reader.onload = (event: any) => {
        this.avatarImage = event.target.result;
      };

      reader.readAsDataURL(event.target.files[0]);
    }
    this.image = event.target.files[0];
  }

  resetImage(): void {
    this.avatarImage = null;
  }

  saveProfile() {
    const formData = new FormData();

    // Ajout des valeurs du formulaire dans FormData
    formData.append('firstname', this.editForm.value.firstname || '');
    formData.append('lastname', this.editForm.value.lastname || '');
    formData.append('email', this.editForm.value.email || '');

    // Ajouter le mot de passe seulement si il est rempli
    if (this.editForm.value.newPassword) {
      formData.append('password', this.editForm.value.newPassword);
    }

    // Ajouter l'image si elle est présente
    if (this.image) {
      formData.append('image', this.image);
    }

    // Envoi de la requête avec FormData
    this._userService.editUser(this.userId, formData).subscribe(
      (response) => {
        window.location.reload();  // Recharge la page pour voir les modifications
      },
      (error) => {
        this.toastr.error('Failed to update profile. Please try again.', 'Error', { closeButton: true });
        console.error(error);
      }
    );
  }



  editForm = this.fb.group({
    firstname: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
    lastname: [
      '',
      [Validators.required, Validators.minLength(2), Validators.maxLength(50)]
    ],
    email: [
      '',
      [Validators.required, Validators.email]
    ],
    newPassword: ['', [Validators.minLength(6), Validators.maxLength(20)]],
  })


  cancel() {
    this.editForm.reset(this.user);
  }

  get f() {
    return this.editForm.controls;
  }

  user: any;
  userId: any;
  ngOnInit() {

    this.userId = this._userService.getUserIdFromToken();
    this._userService.getUserById(this.userId).subscribe(
      (response) => {
        this.user = response;
        this.editForm.reset(response);

      },
      (error) => {
        console.log(error);
      }
    );


    // content header
    this.contentHeader = {
      headerTitle: 'Account Settings',
      actionButton: true,
      breadcrumb: {
        type: '',
        links: [
          {
            name: 'Home',
            isLink: true,
            link: '/'
          },
          {
            name: 'Account Settings',
            isLink: false
          }
        ]
      }
    };
  }

  /**
   * On destroy
   */
  ngOnDestroy(): void {
    // Unsubscribe from all subscriptions
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }
}

import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { RegionService } from 'app/auth/service/region.service';
import { BanqueService } from 'app/auth/service/banque.service';

@Component({
  selector: 'app-add-banques',
  templateUrl: './add-banques.component.html',
  styleUrls: ['./add-banques.component.scss']
})
export class AddBanquesComponent implements OnInit {

  codeBanque: number;


  constructor() { }

  readonly router: Router = inject(Router);
  readonly fb: FormBuilder = inject(FormBuilder);
  readonly regionService: RegionService = inject(RegionService);
  readonly banqueService: BanqueService = inject(BanqueService);

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
  onUploadClick(event: MouseEvent): void {
    event.preventDefault(); // Empêche l'événement par défaut
    const fileInput = document.getElementById('account-upload') as HTMLElement;
    fileInput.click();
  }

  resetImage(): void {
    this.avatarImage = null;
  }

  get formBanque() {
    return this.addBanqueForm.controls;
  }



  submitted = false;
  addBanque() {

    this.submitted = true;
    if (this.addBanqueForm.valid) {

      const formData = new FormData();
      formData.append('code', this.addBanqueForm.get('code')?.value.toString());
      formData.append('libelle', this.addBanqueForm.value.libelle);
      formData.append('adresse', this.addBanqueForm.value.adresse);
      formData.append('codePostal', this.addBanqueForm.value.code_postal);
      formData.append('ville', this.addBanqueForm.value.ville);
      formData.append('idRegion', this.addBanqueForm.value.region);
      formData.append('telephone', this.addBanqueForm.value.telephone);
      formData.append('fax', this.addBanqueForm.value.telecopie);
      formData.append('email', this.addBanqueForm.value.email);
      formData.append('siteWeb', this.addBanqueForm.value.site_web);
      formData.append('pays', this.addBanqueForm.value.pays);

      if (this.image) {
        formData.append('sigle', this.image);
      }
      this.banqueService.addBanque(formData).subscribe(
        (response: any) => {
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Banque ajoutée avec succès",
            text: "La banque a été ajoutée avec succès.",
            showConfirmButton: false,
            timer: 1500
          });
          this.addBanqueForm.reset();
          this.submitted = false;
          this.onIncrementCode();
          this.router.navigate(['/gestion-des-entities/list-banques']);
        },
        (error: any) => {
          Swal.fire({
            icon: "error",
            title: "Une erreur est survenue",
            text: "Nous n'avons pas pu ajouter la banque. Veuillez réessayer plus tard.",
            timer: 2100
          });
          console.error('Error:', error);
        }
      );
    } else {
      // Invalid form message
      Swal.fire({
        icon: "warning",
        title: "Formulaire incomplet",
        text: "Veuillez remplir tous les champs obligatoires avant de soumettre.",
        showConfirmButton: true,
        confirmButtonText: "D'accord"
      });
    }
  }

  resetFormBanque() {
    this.addBanqueForm.reset();
    this.addBanqueForm.controls['code'].setValue(this.codeBanque);
  }

  onIncrementCode() {
    this.codeBanque += 1;
    localStorage.setItem('codeBanque', this.codeBanque.toString());
    this.addBanqueForm.patchValue({
      code: { value: this.codeBanque, disabled: true }
    });
  }


  addBanqueForm: FormGroup;

  listRegions: any;
  ngOnInit(): void {
    //get les regions
    this.regionService.getAllRegions().subscribe(
      (response: any) => {
        this.listRegions = response;
        console.log('Liste des régions:', this.listRegions);
      },
      (error: any) => {
        console.error('Error:', error);
      }
    );


    const savedCode = localStorage.getItem('codeBanque');
    this.codeBanque = savedCode ? +savedCode : 1;

    this.addBanqueForm = this.fb.group({
      code: [{ value: this.codeBanque, disabled: true }],
      libelle: ['', Validators.required],
      adresse: ['', Validators.required],
      code_postal: [''],
      region: ['', Validators.required],
      pays: [''],
      telephone: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      telecopie: [''],
      site_web: [''],
      ville: ['', Validators.required]
    });

  }
}



import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { RegionService } from 'app/auth/service/region.service';
import { BanqueService } from 'app/auth/service/banque.service';

@Component({
  selector: 'app-edit-banque',
  templateUrl: './edit-banque.component.html',
  styleUrls: ['./edit-banque.component.scss']
})
export class EditBanqueComponent implements OnInit {

  constructor() { }

  readonly router: Router = inject(Router);
  readonly fb: FormBuilder = inject(FormBuilder);
  readonly regionService: RegionService = inject(RegionService);
  readonly banqueService: BanqueService = inject(BanqueService);
  readonly act: ActivatedRoute = inject(ActivatedRoute);

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
    return this.updateBanqueForm.controls;
  }



  submitted = false;
  updateBanque() {

    this.submitted = true;
    if (this.updateBanqueForm.valid) {

      const formData = new FormData();
      formData.append('code', this.updateBanqueForm.get('code')?.value.toString());
      formData.append('libelle', this.updateBanqueForm.value.libelle);
      formData.append('adresse', this.updateBanqueForm.value.adresse);
      formData.append('codePostal', this.updateBanqueForm.value.codePostal);
      formData.append('ville', this.updateBanqueForm.value.ville);
      formData.append('idRegion', this.updateBanqueForm.value.region);
      formData.append('telephone', this.updateBanqueForm.value.telephone);
      formData.append('fax', this.updateBanqueForm.value.fax);
      formData.append('email', this.updateBanqueForm.value.email);
      formData.append('siteWeb', this.updateBanqueForm.value.siteWeb);
      formData.append('pays', this.updateBanqueForm.value.pays);

      if (this.image) {
        formData.append('sigle', this.image);
      }
      this.banqueService.updateBanque(this.idBanque, formData).subscribe(
        (response: any) => {
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Banque mettre a jour avec succès",
            text: "La banque a été mettre a jour avec succès.",
            showConfirmButton: false,
            timer: 1500
          });
          this.submitted = false;
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
    this.updateBanqueForm.reset();
  }




  updateBanqueForm: FormGroup;

  listRegions: any;
  idBanque: any;
  banque: any;
  selectedRegionId: any;
  ngOnInit(): void {
    this.idBanque = this.act.snapshot.params.id;
    this.banqueService.getBanqueById(this.idBanque).subscribe(
      (response: any) => {
        this.selectedRegionId = response.idRegion._id; // La région sélectionnée est l'ID de la région du fournisseur
        console.log("idRegion:", this.selectedRegionId);
        console.log("Banque:", response);
        this.banque = response;

        this.updateBanqueForm.patchValue({
          ...response,
          region: this.selectedRegionId // Assurez-vous que le champ "region" reçoit l'ID correct
        });
      },
      (error: any) => {
        console.error('Error:', error);
      }
    );

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



    this.updateBanqueForm = this.fb.group({
      code: [''],
      libelle: ['', Validators.required],
      adresse: ['', Validators.required],
      codePostal: [''],
      region: ['', Validators.required],
      pays: [''],
      telephone: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      fax: [''],
      siteWeb: [''],
      ville: ['', Validators.required]
    });

  }
}



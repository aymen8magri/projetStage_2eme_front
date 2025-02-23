import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { RegionService } from 'app/auth/service/region.service';
import { BanqueService } from 'app/auth/service/banque.service';
import { SocieteService } from 'app/auth/service/societe.service';

@Component({
  selector: 'app-edit-societe',
  templateUrl: './edit-societe.component.html',
  styleUrls: ['./edit-societe.component.scss']
})
export class EditSocieteComponent implements OnInit {


  constructor() { }

  readonly router: Router = inject(Router);
  readonly fb: FormBuilder = inject(FormBuilder);
  readonly societeService: SocieteService = inject(SocieteService);
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

  get formulaireSociete() {
    return this.updateSociete.controls;
  }
  get formulaireSocieteGeneral() {
    return this.updateSocieteGeneral.controls;
  }
  get formulaireSocieteInfos() {
    return this.updateSocieteInfos.controls;
  }



  submitted = false;
  onUpdateSociete() {
    this.submitted = true;
    // Logs pour déboguer les formulaires
    console.log('updateSociete valid:', this.updateSociete.valid, 'value:', this.updateSociete.value);
    console.log('updateSocieteGeneral valid:', this.updateSocieteGeneral.valid, 'value:', this.updateSocieteGeneral.value);
    console.log('updateSocieteInfos valid:', this.updateSocieteInfos.valid, 'value:', this.updateSocieteInfos.value);

    // Validate form before submission
    if (this.updateSociete.valid && this.updateSocieteGeneral.valid && this.updateSocieteInfos.valid) {

      const formData = new FormData();
      formData.append('code', this.updateSociete.get('code')?.value.toString());
      formData.append('libelle', this.updateSociete.value.libelle);
      formData.append('contact', this.updateSociete.value.contact);

      formData.append('raison_sociale', this.updateSocieteGeneral.value.raison_sociale);
      formData.append('adresse', this.updateSocieteGeneral.value.adresse);
      formData.append('codePostal', this.updateSocieteGeneral.value.codePostal);
      formData.append('ville', this.updateSocieteGeneral.value.ville);
      formData.append('idRegion', this.updateSocieteGeneral.value.region);
      formData.append('pays', this.updateSocieteGeneral.value.pays);
      formData.append('telephone', this.updateSocieteGeneral.value.telephone);
      formData.append('email', this.updateSocieteGeneral.value.email);
      formData.append('fax', this.updateSocieteGeneral.value.fax);
      formData.append('siteWeb', this.updateSocieteGeneral.value.siteWeb);
      formData.append('registre_commerciale', this.updateSocieteGeneral.value.registre_commerciale);
      formData.append('matriculeFiscal', this.updateSocieteGeneral.value.matriculeFiscal);

      formData.append('idBanque', this.updateSocieteInfos.value.banque);
      formData.append('agence', this.updateSocieteInfos.value.agence);
      formData.append('compte', this.updateSocieteInfos.value.compte);
      formData.append('RIB', this.updateSocieteInfos.value.RIB);
      if (this.image) {
        formData.append('sigle', this.image);
      }
      // Submit form data
      this.societeService.updateSociete(this.idSociete, formData).subscribe(
        (response: any) => {
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Société mettre a jour avec succès",
            text: "La Société a été mettre a jour correctement.",
            showConfirmButton: false,
            timer: 1500
          });

          this.submitted = false;

          // Navigate to SOCIETE list
          this.router.navigate(['/gestion-des-entities/list-societe']);
        },
        (error: any) => {
          Swal.fire({
            icon: "error",
            title: "Une erreur s'est produite",
            text: "Veuillez réessayer plus tard.",
            timer: 2000
          });
          console.error('Error:', error);
        }
      );
    } else {
      // Show warning if form is incomplete
      Swal.fire({
        icon: "warning",
        title: "Formulaire incomplet",
        text: "Veuillez remplir tous les champs obligatoires avant de soumettre.",
        showConfirmButton: true,
        confirmButtonText: "D'accord"
      });
    }
  }

  resetformulaireSocieteInfos() {
    this.updateSocieteInfos.reset();
  }
  resetformulaireSocieteGeneral() {
    this.updateSocieteGeneral.reset();
  }


  updateSociete: FormGroup;
  updateSocieteGeneral: FormGroup;
  updateSocieteInfos: FormGroup;

  listRegions: any;
  listBanques: any;
  idSociete: any;
  societe: any;
  selectedRegionId: any;
  selectedBanquesId: any;
  ngOnInit(): void {
    this.idSociete = this.act.snapshot.params.id;
    this.societeService.getSocieteById(this.idSociete).subscribe(
      (response: any) => {
        this.selectedRegionId = response.idRegion._id; // La région sélectionnée est l'ID de la région du client
        this.selectedBanquesId = response.idBanque._id; // La banque sélectionnée est l'ID de la banque du client
        this.societe = response;
        console.log('Société:', this.societe);

        // Remplir les champs du formulaire avec les données de la société
        this.updateSociete.patchValue(response);
        this.updateSocieteGeneral.patchValue({
          ...response,
          region: this.selectedRegionId // Mettre à jour la région avec l'ID du client
        });
        this.updateSocieteInfos.patchValue({
          ...response,
          banque: this.selectedBanquesId // Mettre à jour la banque avec l'ID du client
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
    //get les banques
    this.banqueService.getAllBanque().subscribe(
      (response: any) => {
        this.listBanques = response;
        console.log('Liste des banques:', this.listBanques);
      },
      (error: any) => {
        console.error('Error:', error);
      }
    );

    this.updateSociete = this.fb.group({
      code: [''],
      libelle: ['', Validators.required],
      contact: ['', Validators.required]
    });
    this.updateSocieteGeneral = this.fb.group({
      // Entreprise Information
      raison_sociale: ['', Validators.required],
      adresse: ['', Validators.required],
      codePostal: [''],
      ville: [''],
      region: ['', Validators.required],
      pays: [''],
      telephone: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      fax: [''],
      siteWeb: [''],
      registre_commerciale: [''],
      matriculeFiscal: ['', Validators.required]
    });

    this.updateSocieteInfos = this.fb.group({
      // Bank Information
      banque: ['', Validators.required],
      agence: ['', Validators.required],
      compte: ['', Validators.required],
      RIB: ['', Validators.required]
    });

    console.log('updateSociete initial:', this.updateSociete.value);
    console.log('updateSocieteGeneral initial:', this.updateSocieteGeneral.value);
    console.log('updateSocieteInfos initial:', this.updateSocieteInfos.value);
  }


}




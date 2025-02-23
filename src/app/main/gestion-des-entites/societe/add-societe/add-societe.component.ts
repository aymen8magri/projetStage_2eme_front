import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { RegionService } from 'app/auth/service/region.service';
import { BanqueService } from 'app/auth/service/banque.service';
import { SocieteService } from 'app/auth/service/societe.service';

@Component({
  selector: 'app-add-societe',
  templateUrl: './add-societe.component.html',
  styleUrls: ['./add-societe.component.scss']
})
export class AddSocieteComponent implements OnInit {


  codeSociete: number;


  constructor() { }

  readonly router: Router = inject(Router);
  readonly fb: FormBuilder = inject(FormBuilder);
  readonly societeService: SocieteService = inject(SocieteService);
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

  get formulaireSociete() {
    return this.addSociete.controls;
  }
  get formulaireSocieteGeneral() {
    return this.addSocieteGeneral.controls;
  }
  get formulaireSocieteInfos() {
    return this.addSocieteInfos.controls;
  }



  submitted = false;
  onAddSociete() {
    this.submitted = true;
  // Logs pour déboguer les formulaires
  console.log('addSociete valid:', this.addSociete.valid, 'value:', this.addSociete.value);
  console.log('addSocieteGeneral valid:', this.addSocieteGeneral.valid, 'value:', this.addSocieteGeneral.value);
  console.log('addSocieteInfos valid:', this.addSocieteInfos.valid, 'value:', this.addSocieteInfos.value);

    // Validate form before submission
    if (this.addSociete.valid && this.addSocieteGeneral.valid && this.addSocieteInfos.valid) {

      const formData = new FormData();
      formData.append('code', this.addSociete.get('code')?.value.toString());
      formData.append('libelle', this.addSociete.value.libelle);
      formData.append('contact', this.addSociete.value.contact);

      formData.append('raison_sociale', this.addSocieteGeneral.value.raison_sociale);
      formData.append('adresse', this.addSocieteGeneral.value.adresse);
      formData.append('codePostal', this.addSocieteGeneral.value.code_postal);
      formData.append('ville', this.addSocieteGeneral.value.ville);
      formData.append('idRegion', this.addSocieteGeneral.value.region);
      formData.append('pays', this.addSocieteGeneral.value.pays);
      formData.append('telephone', this.addSocieteGeneral.value.telephone);
      formData.append('email', this.addSocieteGeneral.value.email);
      formData.append('fax', this.addSocieteGeneral.value.telecopie);
      formData.append('siteWeb', this.addSocieteGeneral.value.site_web);
      formData.append('registre_commerciale', this.addSocieteGeneral.value.registre_comercial);
      formData.append('matriculeFiscal', this.addSocieteGeneral.value.matricule_fiscal);

      formData.append('idBanque', this.addSocieteInfos.value.banque);
      formData.append('agence', this.addSocieteInfos.value.agence);
      formData.append('compte', this.addSocieteInfos.value.compte);
      formData.append('RIB', this.addSocieteInfos.value.RIB);
      if (this.image) {
        formData.append('sigle', this.image);
      }
      // Submit form data
      this.societeService.addSociete(formData).subscribe(
        (response: any) => {
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Société ajouté avec succès",
            text: "La Société a été ajouté correctement.",
            showConfirmButton: false,
            timer: 1500
          });

          // Reset all forms
          this.addSociete.reset();
          this.addSocieteGeneral.reset();
          this.addSocieteInfos.reset();
          this.submitted = false;
          this.onIncrementCode(); // Handle code increment

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
    this.addSocieteInfos.reset();
  }
  resetformulaireSocieteGeneral() {
    this.addSocieteGeneral.reset();
  }


  onIncrementCode() {
    this.codeSociete += 1;
    localStorage.setItem('codeSociete', this.codeSociete.toString());
    this.addSociete.patchValue({
      code: { value: this.codeSociete, disabled: true }
    });
  }


  addSociete: FormGroup;
  addSocieteGeneral: FormGroup;
  addSocieteInfos: FormGroup;

  listRegions: any;
  listBanques: any;
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



    const savedCode = localStorage.getItem('codeSociete');
    this.codeSociete = savedCode ? +savedCode : 1;

    this.addSociete = this.fb.group({
      code: [{ value: this.codeSociete, disabled: true }],
      libelle: ['', Validators.required],
      contact: ['', Validators.required]
    });
    this.addSocieteGeneral = this.fb.group({
      // Entreprise Information
      raison_sociale: ['', Validators.required],
      adresse: ['', Validators.required],
      code_postal: [''],
      ville: [''],
      region: ['', Validators.required],
      pays: [''],
      telephone: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      telecopie: [''],
      site_web: [''],
      registre_comercial: [''],
      matricule_fiscal: ['', Validators.required]
    });

    this.addSocieteInfos = this.fb.group({
      // Bank Information
      banque: ['', Validators.required],
      agence: ['', Validators.required],
      compte: ['', Validators.required],
      RIB: ['', Validators.required]
    });

    console.log('addSociete initial:', this.addSociete.value);
  console.log('addSocieteGeneral initial:', this.addSocieteGeneral.value);
  console.log('addSocieteInfos initial:', this.addSocieteInfos.value);
  }

  
}



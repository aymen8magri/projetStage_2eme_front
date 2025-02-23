import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TiersService } from 'app/auth/service/tiers.service';
import Swal from 'sweetalert2';
import { RegionService } from 'app/auth/service/region.service';
import { BanqueService } from 'app/auth/service/banque.service';
@Component({
  selector: 'app-add-fournisseure',
  templateUrl: './add-fournisseure.component.html',
  styleUrls: ['./add-fournisseure.component.scss']
})
export class AddFournisseureComponent implements OnInit {


  codeValue: number;


  constructor() { }

  readonly router: Router = inject(Router);
  readonly fb: FormBuilder = inject(FormBuilder);
  readonly tiersService: TiersService = inject(TiersService);
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

  get formulaireFournisseur() {
    return this.addfournisseurForm.controls;
  }
  get formulaireFournisseurGeneral() {
    return this.addfournisseurFormGeneral.controls;
  }
  get formulaireFournisseurPersonne() {
    return this.addfournisseurFormPersonne.controls;
  }
  get formulaireFournisseurInfos() {
    return this.addfournisseurFormInfos.controls;
  }



  submitted = false;
  addfournisseur() {
    this.submitted = true;
  
    // Validate form before submission
    if (this.addfournisseurForm.valid && this.addfournisseurFormGeneral.valid &&
        this.addfournisseurFormPersonne.valid && this.addfournisseurFormInfos.valid) {
      

    const formData = new FormData();
    formData.append('typeTiers', "fournisseur");
    formData.append('code', this.addfournisseurForm.get('code')?.value.toString());
    formData.append('libelle', this.addfournisseurForm.value.libelle);
    formData.append('contact', this.addfournisseurForm.value.contact);

    formData.append('raison_sociale', this.addfournisseurFormGeneral.value.raison_sociale);
    formData.append('adresse', this.addfournisseurFormGeneral.value.adresse);
    formData.append('codePostal', this.addfournisseurFormGeneral.value.code_postal);
    formData.append('ville', this.addfournisseurFormGeneral.value.ville);
    formData.append('idRegion', this.addfournisseurFormGeneral.value.region);
    formData.append('pays', this.addfournisseurFormGeneral.value.pays);
    formData.append('telephone', this.addfournisseurFormGeneral.value.telephone);
    formData.append('email', this.addfournisseurFormGeneral.value.email);
    formData.append('fax', this.addfournisseurFormGeneral.value.telecopie);
    formData.append('siteWeb', this.addfournisseurFormGeneral.value.site_web);
    formData.append('registre_commerciale', this.addfournisseurFormGeneral.value.registre_comercial);
    formData.append('matriculeFiscal', this.addfournisseurFormGeneral.value.matricule_fiscal);

    formData.append('nom', this.addfournisseurFormPersonne.value.nom);
    formData.append('prenom', this.addfournisseurFormPersonne.value.prenom);
    formData.append('CIN_Num', this.addfournisseurFormPersonne.value.num_cin);
    formData.append('CIN_Date', this.addfournisseurFormPersonne.value.date_obtenation_cin);
    formData.append('CIN_Lieu', this.addfournisseurFormPersonne.value.lieu_obtenation_cin);
    formData.append('adresse_Permanente', this.addfournisseurFormPersonne.value.adresse_Permanente);
    formData.append('passport_Num', this.addfournisseurFormPersonne.value.num_passeport);
    formData.append('passport_Date', this.addfournisseurFormPersonne.value.date_obtenation_passeport);
    formData.append('passport_Lieu', this.addfournisseurFormPersonne.value.lieu_obtenation_passeport);
    formData.append('permis_Num', this.addfournisseurFormPersonne.value.num_permi);
    formData.append('date_obtention_permis', this.addfournisseurFormPersonne.value.date_obtenation_permis);
    formData.append('lieu_obtention_permis', this.addfournisseurFormPersonne.value.lieu_obtenation_permis);

    formData.append('idBanque', this.addfournisseurFormInfos.value.banque);
    formData.append('agence', this.addfournisseurFormInfos.value.agence);
    formData.append('compte', this.addfournisseurFormInfos.value.compte);
    formData.append('creditMax', this.addfournisseurFormInfos.value.credit_max);
    formData.append('RIB', this.addfournisseurFormInfos.value.RIB);
    if (this.image) {
      formData.append('image', this.image);
    }
    // Submit form data
    this.tiersService.addTiers(formData).subscribe(
      (response: any) => {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Fournisseur ajouté avec succès",
          text: "Le Fournisseur a été ajouté correctement.",
          showConfirmButton: false,
          timer: 1500
        });
        
        // Reset all forms
        this.addfournisseurForm.reset();
        this.addfournisseurFormGeneral.reset();
        this.addfournisseurFormPersonne.reset();
        this.addfournisseurFormInfos.reset();
        this.submitted = false;
        this.onIncrementCode(); // Handle code increment

        // Navigate to fournisseur list
        this.router.navigate(['/gestion-des-entities/list-fournisseur']);
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

  resetformulaireFournisseurInfos(){
    this.addfournisseurFormInfos.reset();
  }
  resetformulaireFournisseurPersonne(){
    this.addfournisseurFormPersonne.reset();
  }
  resetformulaireFournisseurGeneral(){
    this.addfournisseurFormGeneral.reset();
  }


  onIncrementCode() {
    this.codeValue += 1;
    localStorage.setItem('codeValue', this.codeValue.toString());
    this.addfournisseurForm.patchValue({
      code: { value: this.codeValue, disabled: true }
    });
  }


  addfournisseurForm: FormGroup;
  addfournisseurFormGeneral: FormGroup;
  addfournisseurFormPersonne: FormGroup;
  addfournisseurFormInfos: FormGroup;

  listRegions:any;
  listBanques:any;
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
    


    const savedCode = localStorage.getItem('codeValue');
    this.codeValue = savedCode ? +savedCode : 1;

    this.addfournisseurForm = this.fb.group({
      code: [{ value: this.codeValue, disabled: true }],
      libelle: ['', Validators.required],
      contact: ['', Validators.required]
    });
    this.addfournisseurFormGeneral = this.fb.group({
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
    this.addfournisseurFormPersonne = this.fb.group({
      // Personal Information
      nom: ['', Validators.required],
      prenom: ['', Validators.required],
      num_cin: [''],
      date_obtenation_cin: [''],
      lieu_obtenation_cin: [''],
      adresse_Permanente: [''],
      num_passeport: [''],
      date_obtenation_passeport: [''],
      lieu_obtenation_passeport: [''],
      num_permi: [''],
      date_obtenation_permis: [''],
      lieu_obtenation_permis: ['']
    });
    this.addfournisseurFormInfos = this.fb.group({
      // Bank Information
      banque: ['', Validators.required],
      agence: ['', Validators.required],
      compte: ['', Validators.required],
      credit_max: ['', Validators.required],
      RIB: ['', Validators.required]
    });
  }
}



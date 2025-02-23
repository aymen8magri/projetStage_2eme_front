import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TiersService } from 'app/auth/service/tiers.service';
import Swal from 'sweetalert2';
import { RegionService } from 'app/auth/service/region.service';
import { BanqueService } from 'app/auth/service/banque.service';

@Component({
  selector: 'app-add-client',
  templateUrl: './add-client.component.html',
  styleUrls: ['./add-client.component.scss']
})
export class AddClientComponent implements OnInit {

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

  get formulaireClient() {
    return this.addClientForm.controls;
  }
  get formulaireClientGeneral() {
    return this.addClientFormGeneral.controls;
  }
  get formulaireClientPersonne() {
    return this.addClientFormPersonne.controls;
  }
  get formulaireClientInfos() {
    return this.addClientFormInfos.controls;
  }



  submitted = false;
  addClient() {
    this.submitted = true;
  
    // Validate form before submission
    if (this.addClientForm.valid && this.addClientFormGeneral.valid && this.addClientFormPersonne.valid && this.addClientFormInfos.valid) {

    const formData = new FormData();
    formData.append('typeTiers', "client");
    formData.append('code', this.addClientForm.get('code')?.value.toString());
    formData.append('libelle', this.addClientForm.value.libelle);
    formData.append('contact', this.addClientForm.value.contact);

    formData.append('raison_sociale', this.addClientFormGeneral.value.raison_sociale);
    formData.append('adresse', this.addClientFormGeneral.value.adresse);
    formData.append('codePostal', this.addClientFormGeneral.value.code_postal);
    formData.append('ville', this.addClientFormGeneral.value.ville);
    formData.append('idRegion', this.addClientFormGeneral.value.region);
    formData.append('pays', this.addClientFormGeneral.value.pays);
    formData.append('telephone', this.addClientFormGeneral.value.telephone);
    formData.append('email', this.addClientFormGeneral.value.email);
    formData.append('fax', this.addClientFormGeneral.value.telecopie);
    formData.append('siteWeb', this.addClientFormGeneral.value.site_web);
    formData.append('registre_commerciale', this.addClientFormGeneral.value.registre_comercial);
    formData.append('matriculeFiscal', this.addClientFormGeneral.value.matricule_fiscal);

    formData.append('nom', this.addClientFormPersonne.value.nom);
    formData.append('prenom', this.addClientFormPersonne.value.prenom);
    formData.append('CIN_Num', this.addClientFormPersonne.value.num_cin);
    formData.append('CIN_Date', this.addClientFormPersonne.value.date_obtenation_cin);
    formData.append('CIN_Lieu', this.addClientFormPersonne.value.lieu_obtenation_cin);
    formData.append('adresse_Permanente', this.addClientFormPersonne.value.adresse_Permanente);
    formData.append('passport_Num', this.addClientFormPersonne.value.num_passeport);
    formData.append('passport_Date', this.addClientFormPersonne.value.date_obtenation_passeport);
    formData.append('passport_Lieu', this.addClientFormPersonne.value.lieu_obtenation_passeport);
    formData.append('permis_Num', this.addClientFormPersonne.value.num_permi);
    formData.append('date_obtention_permis', this.addClientFormPersonne.value.date_obtenation_permis);
    formData.append('lieu_obtention_permis', this.addClientFormPersonne.value.lieu_obtenation_permis);

    formData.append('idBanque', this.addClientFormInfos.value.banque);
    formData.append('agence', this.addClientFormInfos.value.agence);
    formData.append('compte', this.addClientFormInfos.value.compte);
    formData.append('creditMax', this.addClientFormInfos.value.credit_max);
    formData.append('RIB', this.addClientFormInfos.value.RIB);
    if (this.image) {
      formData.append('image', this.image);
    }
    // Submit form data
    this.tiersService.addTiers(formData).subscribe(
      (response: any) => {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Client ajouté avec succès",
          text: "Le client a été ajouté correctement.",
          showConfirmButton: false,
          timer: 1500
        });
        
        // Reset all forms
        this.addClientForm.reset();
        this.addClientFormGeneral.reset();
        this.addClientFormPersonne.reset();
        this.addClientFormInfos.reset();
        this.submitted = false;
        this.onIncrementCode(); // Handle code increment

        // Navigate to client list
        this.router.navigate(['/gestion-des-entities/list-client']);
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

  resetformulaireClientInfos(){
    this.addClientFormInfos.reset();
  }
  resetformulaireClientPersonne(){
    this.addClientFormPersonne.reset();
  }
  resetformulaireClientGeneral(){
    this.addClientFormGeneral.reset();
  }


  onIncrementCode() {
    this.codeValue += 1;
    localStorage.setItem('codeValue', this.codeValue.toString());
    this.addClientForm.patchValue({
      code: { value: this.codeValue, disabled: true }
    });
  }


  addClientForm: FormGroup;
  addClientFormGeneral: FormGroup;
  addClientFormPersonne: FormGroup;
  addClientFormInfos: FormGroup;

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

    this.addClientForm = this.fb.group({
      code: [{ value: this.codeValue, disabled: true }],
      libelle: ['', Validators.required],
      contact: ['', Validators.required]
    });
    this.addClientFormGeneral = this.fb.group({
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
    this.addClientFormPersonne = this.fb.group({
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
    this.addClientFormInfos = this.fb.group({
      // Bank Information
      banque: ['', Validators.required],
      agence: ['', Validators.required],
      compte: ['', Validators.required],
      credit_max: ['', Validators.required],
      RIB: ['', Validators.required]
    });
  }
}


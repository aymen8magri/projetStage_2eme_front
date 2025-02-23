import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TiersService } from 'app/auth/service/tiers.service';
import Swal from 'sweetalert2';
import { RegionService } from 'app/auth/service/region.service';
import { BanqueService } from 'app/auth/service/banque.service';

@Component({
  selector: 'app-edit-client',
  templateUrl: './edit-client.component.html',
  styleUrls: ['./edit-client.component.scss']
})
export class EditClientComponent implements OnInit {

  constructor() { }

  readonly router: Router = inject(Router);
  readonly fb: FormBuilder = inject(FormBuilder);
  readonly tiersService: TiersService = inject(TiersService);
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

  get formulaireClient() {
    return this.updateClientForm.controls;
  }
  get formulaireClientGeneral() {
    return this.updateClientFormGeneral.controls;
  }
  get formulaireClientPersonne() {
    return this.updateClientFormPersonne.controls;
  }
  get formulaireClientInfos() {
    return this.updateClientFormInfos.controls;
  }



  submitted = false;
  updateClient() {
    this.submitted = true;

    // Validate form before submission
    if (this.updateClientForm.valid && this.updateClientFormGeneral.valid && this.updateClientFormPersonne.valid && this.updateClientFormInfos.valid) {

      const formData = new FormData();
      formData.append('code', this.updateClientForm.get('code')?.value.toString());
      formData.append('libelle', this.updateClientForm.value.libelle);
      formData.append('contact', this.updateClientForm.value.contact);

      formData.append('raison_sociale', this.updateClientFormGeneral.value.raison_sociale);
      formData.append('adresse', this.updateClientFormGeneral.value.adresse);
      formData.append('codePostal', this.updateClientFormGeneral.value.codePostal);
      formData.append('ville', this.updateClientFormGeneral.value.ville);
      formData.append('idRegion', this.updateClientFormGeneral.value.region);
      formData.append('pays', this.updateClientFormGeneral.value.pays);
      formData.append('telephone', this.updateClientFormGeneral.value.telephone);
      formData.append('email', this.updateClientFormGeneral.value.email);
      formData.append('fax', this.updateClientFormGeneral.value.fax);
      formData.append('siteWeb', this.updateClientFormGeneral.value.siteWeb);
      formData.append('registre_commerciale', this.updateClientFormGeneral.value.registre_commerciale);
      formData.append('matriculeFiscal', this.updateClientFormGeneral.value.matriculeFiscal);

      formData.append('nom', this.updateClientFormPersonne.value.nom);
      formData.append('prenom', this.updateClientFormPersonne.value.prenom);
      formData.append('CIN_Num', this.updateClientFormPersonne.value.CIN_Num);
      formData.append('CIN_Date', this.updateClientFormPersonne.value.CIN_Date);
      formData.append('CIN_Lieu', this.updateClientFormPersonne.value.CIN_Lieu);
      formData.append('adresse_Permanente', this.updateClientFormPersonne.value.adresse_Permanente);
      formData.append('passport_Num', this.updateClientFormPersonne.value.passport_Num);
      formData.append('passport_Date', this.updateClientFormPersonne.value.passport_Date);
      formData.append('passport_Lieu', this.updateClientFormPersonne.value.passport_Lieu);
      formData.append('permis_Num', this.updateClientFormPersonne.value.permis_Num);
      formData.append('date_obtention_permis', this.updateClientFormPersonne.value.date_obtention_permis);
      formData.append('lieu_obtention_permis', this.updateClientFormPersonne.value.lieu_obtention_permis);

      formData.append('idBanque', this.updateClientFormInfos.value.banque);
      formData.append('agence', this.updateClientFormInfos.value.agence);
      formData.append('compte', this.updateClientFormInfos.value.compte);
      formData.append('creditMax', this.updateClientFormInfos.value.creditMax);
      formData.append('RIB', this.updateClientFormInfos.value.RIB);
      if (this.image) {
        formData.append('image', this.image);
      }
      // Submit form data
      this.tiersService.updateTiers(this.idClient,formData).subscribe(
        (response: any) => {
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Client mettre a jour avec succès",
            text: "Le client a été mettre a jour correctement.",
            showConfirmButton: false,
            timer: 1500
          });

          this.submitted = false;

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

  resetformulaireClientInfos() {
    this.updateClientFormInfos.reset();
  }
  resetformulaireClientPersonne() {
    this.updateClientFormPersonne.reset();
  }
  resetformulaireClientGeneral() {
    this.updateClientFormGeneral.reset();
  }



  updateClientForm: FormGroup;
  updateClientFormGeneral: FormGroup;
  updateClientFormPersonne: FormGroup;
  updateClientFormInfos: FormGroup;

  listRegions: any;
  listBanques: any;
  idClient: any;
  client: any;
  selectedRegionId: any;
  selectedBanquesId: any;
  ngOnInit(): void {
    this.idClient = this.act.snapshot.params.id;
    this.tiersService.getTiersById(this.idClient).subscribe(
      (response: any) => {
        this.selectedRegionId = response.idRegion._id; // La région sélectionnée est l'ID de la région du client
        this.selectedBanquesId = response.idBanque._id; // La banque sélectionnée est l'ID de la banque du client
        this.client = response; // Récupérer les données du client
        const dateCin = response.CIN_Date ? new Date(response.CIN_Date).toISOString().split('T')[0] : '';
        const datePasseport = response.passport_Date ? new Date(response.passport_Date).toISOString().split('T')[0] : '';
        const datePermis = response.date_obtention_permis ? new Date(response.date_obtention_permis).toISOString().split('T')[0] : '';

        this.updateClientForm.patchValue(response);

        this.updateClientFormGeneral.patchValue({
          ...response,
          region: this.selectedRegionId // Mettre à jour la région avec l'ID du client
        });

        this.updateClientFormPersonne.patchValue({
          ...response,
          CIN_Date: dateCin,
          passport_Date: datePasseport,
          date_obtention_permis: datePermis
        });

        this.updateClientFormInfos.patchValue({
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


    this.updateClientForm = this.fb.group({
      code: [''],
      libelle: ['', Validators.required],
      contact: ['', Validators.required]
    });
    this.updateClientFormGeneral = this.fb.group({
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
    this.updateClientFormPersonne = this.fb.group({
      // Personal Information
      nom: ['', Validators.required],
      prenom: ['', Validators.required],
      CIN_Num: [''],
      CIN_Date: [''],
      CIN_Lieu: [''],
      adresse_Permanente: [''],
      passport_Num: [''],
      passport_Date: [''],
      passport_Lieu: [''],
      permis_Num: [''],
      date_obtention_permis: [''],
      lieu_obtention_permis: ['']
    });
    this.updateClientFormInfos = this.fb.group({
      // Bank Information
      banque: ['', Validators.required],
      agence: ['', Validators.required],
      compte: ['', Validators.required],
      creditMax: ['', Validators.required],
      RIB: ['', Validators.required]
    });
  }
}


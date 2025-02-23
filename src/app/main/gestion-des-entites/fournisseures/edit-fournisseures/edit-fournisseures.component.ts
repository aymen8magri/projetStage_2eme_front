import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TiersService } from 'app/auth/service/tiers.service';
import Swal from 'sweetalert2';
import { RegionService } from 'app/auth/service/region.service';
import { BanqueService } from 'app/auth/service/banque.service';

@Component({
  selector: 'app-edit-fournisseures',
  templateUrl: './edit-fournisseures.component.html',
  styleUrls: ['./edit-fournisseures.component.scss']
})
export class EditFournisseuresComponent implements OnInit {


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

  get formulaireFournisseur() {
    return this.updateFournisseurForm.controls;
  }
  get formulaireFournisseurGeneral() {
    return this.updateFournisseurFormGeneral.controls;
  }
  get formulaireFournisseurPersonne() {
    return this.updateFournisseurFormPersonne.controls;
  }
  get formulaireFournisseurInfos() {
    return this.updateFournisseurFormInfos.controls;
  }



  submitted = false;
  updateFournisseur() {
    this.submitted = true;

    // Validate form before submission
    if (this.updateFournisseurForm.valid && this.updateFournisseurFormGeneral.valid && this.updateFournisseurFormPersonne.valid && this.updateFournisseurFormInfos.valid) {

      const formData = new FormData();
      formData.append('code', this.updateFournisseurForm.get('code')?.value.toString());
      formData.append('libelle', this.updateFournisseurForm.value.libelle);
      formData.append('contact', this.updateFournisseurForm.value.contact);

      formData.append('raison_sociale', this.updateFournisseurFormGeneral.value.raison_sociale);
      formData.append('adresse', this.updateFournisseurFormGeneral.value.adresse);
      formData.append('codePostal', this.updateFournisseurFormGeneral.value.codePostal);
      formData.append('ville', this.updateFournisseurFormGeneral.value.ville);
      formData.append('idRegion', this.updateFournisseurFormGeneral.value.region);
      formData.append('pays', this.updateFournisseurFormGeneral.value.pays);
      formData.append('telephone', this.updateFournisseurFormGeneral.value.telephone);
      formData.append('email', this.updateFournisseurFormGeneral.value.email);
      formData.append('fax', this.updateFournisseurFormGeneral.value.fax);
      formData.append('siteWeb', this.updateFournisseurFormGeneral.value.siteWeb);
      formData.append('registre_commerciale', this.updateFournisseurFormGeneral.value.registre_commerciale);
      formData.append('matriculeFiscal', this.updateFournisseurFormGeneral.value.matriculeFiscal);

      formData.append('nom', this.updateFournisseurFormPersonne.value.nom);
      formData.append('prenom', this.updateFournisseurFormPersonne.value.prenom);
      formData.append('CIN_Num', this.updateFournisseurFormPersonne.value.CIN_Num);
      formData.append('CIN_Date', this.updateFournisseurFormPersonne.value.CIN_Date);
      formData.append('CIN_Lieu', this.updateFournisseurFormPersonne.value.CIN_Lieu);
      formData.append('adresse_Permanente', this.updateFournisseurFormPersonne.value.adresse_Permanente);
      formData.append('passport_Num', this.updateFournisseurFormPersonne.value.passport_Num);
      formData.append('passport_Date', this.updateFournisseurFormPersonne.value.passport_Date);
      formData.append('passport_Lieu', this.updateFournisseurFormPersonne.value.passport_Lieu);
      formData.append('permis_Num', this.updateFournisseurFormPersonne.value.permis_Num);
      formData.append('date_obtention_permis', this.updateFournisseurFormPersonne.value.date_obtention_permis);
      formData.append('lieu_obtention_permis', this.updateFournisseurFormPersonne.value.lieu_obtention_permis);

      formData.append('idBanque', this.updateFournisseurFormInfos.value.banque);
      formData.append('agence', this.updateFournisseurFormInfos.value.agence);
      formData.append('compte', this.updateFournisseurFormInfos.value.compte);
      formData.append('creditMax', this.updateFournisseurFormInfos.value.creditMax);
      formData.append('RIB', this.updateFournisseurFormInfos.value.RIB);
      if (this.image) {
        formData.append('image', this.image);
      }
      // Submit form data
      this.tiersService.updateTiers(this.idFournisseur,formData).subscribe(
        (response: any) => {
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Fournisseur mettre a jour avec succès",
            text: "Le Fournisseur a été mettre a jour correctement.",
            showConfirmButton: false,
            timer: 1500
          });

          this.submitted = false;

          // Navigate to Fournisseur list
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

  resetformulaireFournisseurInfos() {
    this.updateFournisseurFormInfos.reset();
  }
  resetformulaireFournisseurPersonne() {
    this.updateFournisseurFormPersonne.reset();
  }
  resetformulaireFournisseurGeneral() {
    this.updateFournisseurFormGeneral.reset();
  }



  updateFournisseurForm: FormGroup;
  updateFournisseurFormGeneral: FormGroup;
  updateFournisseurFormPersonne: FormGroup;
  updateFournisseurFormInfos: FormGroup;

  listRegions: any;
  listBanques: any;
  idFournisseur: any;
  fournisseur: any;
  selectedRegionId: any;
  selectedBanquesId: any;
  ngOnInit(): void {
    this.idFournisseur = this.act.snapshot.params.id;
    this.tiersService.getTiersById(this.idFournisseur).subscribe(
      (response: any) => {
        this.selectedRegionId = response.idRegion._id; // La région sélectionnée est l'ID de la région du fournisseur
        this.selectedBanquesId = response.idBanque._id; // La banque sélectionnée est l'ID de la banque du fournisseur
        this.fournisseur = response; // Récupérer les données du fournisseur
        const dateCin = response.CIN_Date ? new Date(response.CIN_Date).toISOString().split('T')[0] : '';
        const datePasseport = response.passport_Date ? new Date(response.passport_Date).toISOString().split('T')[0] : '';
        const datePermis = response.date_obtention_permis ? new Date(response.date_obtention_permis).toISOString().split('T')[0] : '';

        this.updateFournisseurForm.patchValue(response);

        this.updateFournisseurFormGeneral.patchValue({
          ...response,
          region: this.selectedRegionId // Mettre à jour la région avec l'ID du fournisseur
        });

        this.updateFournisseurFormPersonne.patchValue({
          ...response,
          CIN_Date: dateCin,
          passport_Date: datePasseport,
          date_obtention_permis: datePermis
        });

        this.updateFournisseurFormInfos.patchValue({
            ...response,
            banque: this.selectedBanquesId // Mettre à jour la banque avec l'ID du fournisseur
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


    this.updateFournisseurForm = this.fb.group({
      code: [''],
      libelle: ['', Validators.required],
      contact: ['', Validators.required]
    });
    this.updateFournisseurFormGeneral = this.fb.group({
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
    this.updateFournisseurFormPersonne = this.fb.group({
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
    this.updateFournisseurFormInfos = this.fb.group({
      // Bank Information
      banque: ['', Validators.required],
      agence: ['', Validators.required],
      compte: ['', Validators.required],
      creditMax: ['', Validators.required],
      RIB: ['', Validators.required]
    });
  }
}



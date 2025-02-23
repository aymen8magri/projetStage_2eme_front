import { Component, OnInit, AfterViewInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { BanqueService } from 'app/auth/service/banque.service';
import { PayementClientService } from 'app/auth/service/payement-client.service';
import { PayementFournissseurService } from 'app/auth/service/payement-fournissseur.service';
import { SupplementaireService } from 'app/auth/service/supplementaire.service';
import { TabDeBordService } from 'app/auth/service/tab-de-bord.service';
import { Chart } from 'chart.js';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-tableau-de-bord',
  templateUrl: './tableau-de-bord.component.html',
  styleUrls: ['./tableau-de-bord.component.scss']
})
export class TableauDeBordComponent implements OnInit {
  years: number[] = [];
  listBanques: any;
  supplementaryEncaissementForm!: FormGroup;

  encaissements: any;
  decaissements: any;
  encaissementsEscompter: any;
  supplementairesEncaissement: any;
  supplementairesDecaissement: any;

  totalEncaissement: number = 0;
  totalDecaissement: number = 0;

  selectedAnnee: string = '';
  selectedMois: string = '';
  selectedBanque: string = '';

  filteredEncaissements: any[] = [];
  filteredDecaissements: any[] = [];
  filtredEncaissementsEscompter: any[] = [];
  filteredSupplementairesEncaissement: any[] = [];
  filteredSupplementairesDecaissement: any[] = [];

  readonly banqueService = inject(BanqueService);
  readonly payementClient = inject(PayementClientService);
  readonly payementFournisseur = inject(PayementFournissseurService);
  readonly supplementaire = inject(SupplementaireService);
  readonly tabDeBordService = inject(TabDeBordService);
  readonly fb = inject(FormBuilder);


  ngOnInit() {
    this.generateYears();
    this.loadData();
    this.intializeFormTreso();
  }


  loadData() {
    this.banqueService.getAllBanque().subscribe(data => this.listBanques = data);
    this.payementClient.getAllPayementClient().subscribe(data => this.encaissements = data);
    this.payementFournisseur.getAllPayementFournisseur().subscribe(data => this.decaissements = data);
    this.payementClient.getAllPayementClientEscompter().subscribe(data => this.encaissementsEscompter = data);
    this.supplementaire.getSupplementaireByType("encaissements").subscribe((data: any[]) => {
      this.supplementairesEncaissement = data.map(response => ({
        ...response,
        dateSupp: response.dateSupp ? new Date(response.dateSupp).toISOString().split('T')[0] : null
      }));
    });
    this.supplementaire.getSupplementaireByType("décaissements").subscribe((data: any[]) => {
      this.supplementairesDecaissement = data.map(response => ({
        ...response,
        dateSupp: response.dateSupp ? new Date(response.dateSupp).toISOString().split('T')[0] : null
      }));
    });
  }


  /**
   * Generate years for the dropdown
   */
  generateYears() {
    const currentYear = new Date().getFullYear();
    this.years = Array.from({ length: 11 }, (_, i) => currentYear - i);
  }

  /**
   * apply filter function 
   */
  applyFilters() {

    this.filteredEncaissements = this.encaissements.filter(enc => {
      const encDate = new Date(enc.echeance);
      return (!this.selectedAnnee || encDate.getFullYear().toString() === this.selectedAnnee) &&
        (!this.selectedMois || (encDate.getMonth() + 1).toString().padStart(2, '0') === this.selectedMois) &&
        (!this.selectedBanque || enc.idBanque._id === this.selectedBanque);
    });

    this.filteredDecaissements = this.decaissements.filter(dec => {
      const decDate = new Date(dec.echeance);
      return (!this.selectedAnnee || decDate.getFullYear().toString() === this.selectedAnnee) &&
        (!this.selectedMois || (decDate.getMonth() + 1).toString().padStart(2, '0') === this.selectedMois) &&
        (!this.selectedBanque || dec.idBanque._id === this.selectedBanque);
    });

    this.filtredEncaissementsEscompter = this.encaissementsEscompter.filter(encEscompter => {
      const encEscompterDate = new Date(encEscompter.echeance);
      return (!this.selectedAnnee || encEscompterDate.getFullYear().toString() === this.selectedAnnee) &&
        (!this.selectedMois || (encEscompterDate.getMonth() + 1).toString().padStart(2, '0') === this.selectedMois) &&
        (!this.selectedBanque || encEscompter.idBanque._id === this.selectedBanque);
    });
    this.filteredSupplementairesEncaissement = this.supplementairesEncaissement.filter(suppEnc => {
      const suppEncDate = new Date(suppEnc.dateSupp);
      return (!this.selectedAnnee || suppEncDate.getFullYear().toString() === this.selectedAnnee) &&
        (!this.selectedMois || (suppEncDate.getMonth() + 1).toString().padStart(2, '0') === this.selectedMois);
    });
    this.filteredSupplementairesDecaissement = this.supplementairesDecaissement.filter(suppDec => {
      const suppDecDate = new Date(suppDec.dateSupp);
      return (!this.selectedAnnee || suppDecDate.getFullYear().toString() === this.selectedAnnee) &&
        (!this.selectedMois || (suppDecDate.getMonth() + 1).toString().padStart(2, '0') === this.selectedMois);
    });


    this.soldeInitial = 0;
    this.getSoldeInitiales();

    this.impayesPrevusClients = 0;
    this.impayesConfirmesClients = 0;
    this.selectedImpayeClient = {};
    this.previousImpaye = {};

    this.selectedImpayeFournisseur = {};
    this.previousDecImpaye = {};
    this.impayesPrevusFournisseurs = 0;
    this.impayesConfirmesFournisseurs = 0;

    this.selectedEncEscompter = {};
    this.previousEncEscompter = {};
    this.impayesPrevusEscompter = 0;
    this.impayesConfirmesEscompter = 0;
    this.intializeFormTreso()

  }

  /**
   * reset all the select
   */
  resetFilters() {
    this.selectedAnnee = '';
    this.selectedMois = '';
    this.selectedBanque = '';
    this.filteredEncaissements = [];
    this.filteredDecaissements = [];
    this.filtredEncaissementsEscompter = [];
    this.filteredSupplementairesEncaissement = [];
    this.filteredSupplementairesDecaissement = [];
  }

  /**
   *  total montant filtered encaissements
   */
  getTotalEncaissements(): number {
    return this.filteredEncaissements.reduce((total, enc) => total + Number(enc.montant), 0);
  }

  /**
   *  total montant filtered décaissements
   */
  getTotalDecaissements(): number {
    return this.filteredDecaissements.reduce((total, dec) => total + Number(dec.montant), 0);
  }

  /**
   *  total montant filtered encaissements escomptés
   */
  getTotalEncaissementsEscompter(): number {
    return this.filtredEncaissementsEscompter.reduce((total, encEscompter) => total + Number(encEscompter.montant), 0);
  }

  /**
   * total montant encaissements supplementaire
   */
  getTotalEncaissementsSupplementaire(): number {
    return this.filteredSupplementairesEncaissement.reduce((total, suppEnc) => total + Number(suppEnc.montant), 0);
  }

  /**
   * total montant decaissement Supplementaire
   */
  getTotalDecaissementsSupplementaire(): number {
    return this.filteredSupplementairesDecaissement.reduce((total, suppDec) => total + Number(suppDec.montant), 0);
  }

  addEncaissementRow() {
    this.filteredSupplementairesEncaissement.push({ dateSupp: '', designation: '', montant: '' });
  }

  addDecaissementRow() {
    this.filteredSupplementairesDecaissement.push({ dateSupp: '', designation: '', montant: '' });
  }

  addSupplementaireEncaissement(index: number) {
    const newEncaissement = this.filteredSupplementairesEncaissement[index];
    newEncaissement.typeSupplementaire = 'encaissements';
    const dateSupp = new Date(newEncaissement.dateSupp);

    this.supplementaire.addSupplementaire(newEncaissement).subscribe(response => {
      Swal.fire({
        title: 'Succès !',
        text: 'Encaissement ajouté avec succès.',
        icon: 'success',
        confirmButtonText: 'OK'
      });
      this.intializeFormTreso()

      if (dateSupp.getFullYear() !== Number(this.selectedAnnee) || dateSupp.getMonth() + 1 !== Number(this.selectedMois)) {
        this.filteredSupplementairesEncaissement.splice(index, 1);
        this.intializeFormTreso()

      }
    }, error => {
      Swal.fire({
        title: 'Erreur !',
        text: 'L\'ajout de l\'encaissement a échoué.',
        icon: 'error',
        confirmButtonText: 'OK'
      });
    });
  }

  addSupplementaireDecaissement(index: number) {
    const newDecaissement = this.filteredSupplementairesDecaissement[index];
    newDecaissement.typeSupplementaire = 'décaissements';

    const dateSupp = new Date(newDecaissement.dateSupp);

    this.supplementaire.addSupplementaire(newDecaissement).subscribe(response => {
      // Show success message
      Swal.fire({
        icon: 'success',
        title: 'Ajout réussi',
        text: 'Le décaissement a été ajouté avec succès!',
      });
      this.intializeFormTreso()

      if (dateSupp.getFullYear() !== Number(this.selectedAnnee) || dateSupp.getMonth() + 1 !== Number(this.selectedMois)) {
        this.filteredSupplementairesDecaissement.splice(index, 1);
        this.intializeFormTreso()

      }
    },
      error => {
        Swal.fire({
          title: 'Erreur !',
          text: 'L\'ajout de decaissement a échoué.',
          icon: 'error',
          confirmButtonText: 'OK'
        });
      });
  }

  /*****************IMPAYE PREVU CLINET******************* */
  impayesPrevusClients: number = 0;
  impayesConfirmesClients: number = 0;
  selectedImpayeClient: { [key: number]: 'prevu' | 'confirme' | null } = {};
  previousImpaye: { [key: number]: 'prevu' | 'confirme' | null } = {};

  // Méthode pour mettre à jour les montants
  updateImpayeValueClient(index: number, montant: number) {
    montant = Number(montant);

    // Récupérer la nouvelle valeur sélectionnée via ngModel (elle est déjà mise à jour)
    const newValue = this.selectedImpayeClient[index];
    // Récupérer la valeur précédente stockée
    const oldValue = this.previousImpaye[index];

    // Si aucune valeur n'était définie auparavant, c'est le premier changement
    if (!oldValue) {
      if (newValue === 'prevu') {
        this.impayesPrevusClients += montant;
      } else if (newValue === 'confirme') {
        this.impayesConfirmesClients += montant;
      }
    } else if (oldValue !== newValue) {
      // Si on change d'option, on retire le montant de l'option précédente et on l'ajoute à la nouvelle
      if (oldValue === 'prevu' && newValue === 'confirme') {
        this.impayesPrevusClients -= montant;
        this.impayesConfirmesClients += montant;
      } else if (oldValue === 'confirme' && newValue === 'prevu') {
        this.impayesConfirmesClients -= montant;
        this.impayesPrevusClients += montant;
      }
    }

    // Mettez à jour l'état précédent pour cette ligne
    this.previousImpaye[index] = newValue;

    this.intializeFormTreso()

    // Affichage dans la console pour vérification
    console.log(`Ligne ${index} - Impayés Prévus: ${this.impayesPrevusClients}, Impayés Confirmés: ${this.impayesConfirmesClients}`);
  }

  /************************IMPAYE PREVU FOURNISSEUR********************************** */

  selectedImpayeFournisseur: { [key: number]: 'prevu' | 'confirme' | null } = {};
  previousDecImpaye: { [key: number]: 'prevu' | 'confirme' | null } = {};
  impayesPrevusFournisseurs: number = 0;
  impayesConfirmesFournisseurs: number = 0;

  updateFournisseurImpayeValue(index: number, montant: number) {
    montant = Number(montant); // S'assurer que c'est un nombre
    const newValue = this.selectedImpayeFournisseur[index];
    const oldValue = this.previousDecImpaye[index];

    // Si c'est la première sélection sur cette ligne
    if (!oldValue) {
      if (newValue === 'prevu') {
        this.impayesPrevusFournisseurs += montant;
      } else if (newValue === 'confirme') {
        this.impayesConfirmesFournisseurs += montant;
      }
    }
    // Si l'utilisateur change sa sélection
    else if (oldValue !== newValue) {
      if (oldValue === 'prevu' && newValue === 'confirme') {
        this.impayesPrevusFournisseurs -= montant;
        this.impayesConfirmesFournisseurs += montant;
      } else if (oldValue === 'confirme' && newValue === 'prevu') {
        this.impayesConfirmesFournisseurs -= montant;
        this.impayesPrevusFournisseurs += montant;
      }
    }

    // Mettre à jour l'état précédent pour cette ligne
    this.previousDecImpaye[index] = newValue;
    this.intializeFormTreso()

    // Affichage dans la console pour vérification
    console.log(`Fournisseur ligne ${index} - Impayés Prévu: ${this.impayesPrevusFournisseurs}, Impayés Confirmé: ${this.impayesConfirmesFournisseurs}`);
  }

  /*****************IMPAYE PREVU CLINET escompter******************* */
  selectedEncEscompter: { [key: number]: 'prevu' | 'confirme' | null } = {};
  previousEncEscompter: { [key: number]: 'prevu' | 'confirme' | null } = {};

  impayesPrevusEscompter: number = 0;
  impayesConfirmesEscompter: number = 0;

  updateEncEscompterValue(index: number, montant: number) {
    montant = Number(montant); // S'assurer que c'est un nombre
    const newValue = this.selectedEncEscompter[index];
    const oldValue = this.previousEncEscompter[index];

    // Première sélection
    if (!oldValue) {
      if (newValue === 'prevu') {
        this.impayesPrevusEscompter += montant;
      } else if (newValue === 'confirme') {
        this.impayesConfirmesEscompter += montant;
      }
    }
    // Changement de sélection
    else if (oldValue !== newValue) {
      if (oldValue === 'prevu' && newValue === 'confirme') {
        this.impayesPrevusEscompter -= montant;
        this.impayesConfirmesEscompter += montant;
      } else if (oldValue === 'confirme' && newValue === 'prevu') {
        this.impayesConfirmesEscompter -= montant;
        this.impayesPrevusEscompter += montant;
      }
    }

    // Mettre à jour l'état précédent pour cette ligne
    this.previousEncEscompter[index] = newValue;
    this.intializeFormTreso()

    console.log(`Client Escompter ligne ${index} - Impayés Prévu: ${this.impayesPrevusEscompter}, Impayés Confirmé: ${this.impayesConfirmesEscompter}`);
  }




  tresorerieForm!: FormGroup;

  intializeFormTreso() {
    // Calcule le solde prévus
    const soldePrevusCalculated =
      this.soldeInitial +
      this.getTotalEncaissements() -
      this.getTotalDecaissements() -
      this.impayesPrevusClients +
      this.impayesPrevusFournisseurs +
      this.getTotalEncaissementsSupplementaire() -
      (this.getTotalDecaissementsSupplementaire() + this.getTotalEncaissementsEscompter() - this.impayesPrevusEscompter);
    // Calcule le solde final
    const soldeFinalCalculated =
      this.soldeInitial +
      this.getTotalEncaissements() -
      this.getTotalDecaissements() -
      this.impayesConfirmesClients +
      this.impayesConfirmesFournisseurs +
      this.getTotalEncaissementsSupplementaire() -
      this.getTotalDecaissementsSupplementaire()+
      this.getTotalEncaissementsEscompter()-
      this.impayesConfirmesEscompter;

    this.tresorerieForm = this.fb.group({
      encaissement: [this.getTotalEncaissements(), Validators.required],
      decaissement: [this.getTotalDecaissements(), Validators.required],
      escompte: [this.getTotalEncaissementsEscompter(), Validators.required],

      impayesPrevusClients: [this.impayesPrevusClients, Validators.required],
      impayesPrevusFournisseurs: [this.impayesPrevusFournisseurs, Validators.required],
      impayesPrevusEscompte: [this.impayesPrevusEscompter, Validators.required],

      impayesConfirmesClients: [this.impayesConfirmesClients, Validators.required],
      impayesConfirmesFournisseurs: [this.impayesConfirmesFournisseurs, Validators.required],
      impayesConfirmesEscompte: [this.impayesConfirmesEscompter, Validators.required],

      encaissementSupp: [this.getTotalEncaissementsSupplementaire(), Validators.required],
      decaissementSupp: [this.getTotalDecaissementsSupplementaire(), Validators.required],
      montantSupp: [this.getTotalEncaissementsSupplementaire() - this.getTotalDecaissementsSupplementaire(), Validators.required],


      soldePrevus: [soldePrevusCalculated, Validators.required],
      soldeFinal: [soldeFinalCalculated, Validators.required],
      tresorerie_de_mois:[this.getTotalEncaissements()-this.getTotalDecaissements(), Validators.required],

      observation: [''] // contrôle pour l'éditeur

    });
  }


  /**
   * Returns le solde initial de le mois precedent
   */
  solde_initial_object: any;
  soldeInitial: number = 0;
  getSoldeInitiales(): void {
    if (this.selectedAnnee !== "" && this.selectedMois !== "" && this.selectedBanque !== "") {
      // Variables pour la requête sur le mois précédent
      let queryYear = this.selectedAnnee;
      let queryMonth = this.selectedMois;

      // Calcul du mois précédent
      if (queryMonth === "01") {
        // Si c'est janvier, utiliser décembre de l'année précédente
        queryYear = (parseInt(queryYear, 10) - 1).toString();
        queryMonth = "12";
      } else {
        // Sinon, décrémenter le mois
        const previousMonth = parseInt(queryMonth, 10) - 1;
        // Format avec deux chiffres (ex: "02", "09")
        queryMonth = previousMonth < 10 ? "0" + previousMonth : previousMonth.toString();
      }

      // Appel au service pour récupérer le tableau de bord du mois précédent
      this.tabDeBordService
        .getTabDeBordByMoisAndAnneAndBanque(queryMonth, queryYear, this.selectedBanque)
        .subscribe(data => {
          this.solde_initial_object = data;
          this.soldeInitial = this.solde_initial_object.soldeFinal;
        });
    }
  }



  /**
   * Fonction pour valider les données (peut être envoyée à une API)
   */
  valider() {
    if (this.selectedAnnee === "" || this.selectedMois === "" || this.selectedBanque === "") {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "La sélection des filtres est obligatoire...",
      });
    } else {
      const formValue = this.tresorerieForm.value;
      formValue.annee = this.selectedAnnee;
      formValue.mois = this.selectedMois;
      formValue.idBanque = this.selectedBanque;
      this.tabDeBordService.addEditTabDeBord(formValue).subscribe(
        (response) => {
          Swal.fire({
            icon: "success",
            title: "Succès!",
            text: "Tableau de bord ajouté/mis à jour avec succès.",
          });
        },
        (error) => {
          Swal.fire({
            icon: "error",
            title: "Erreur!",
            text: "Une erreur s'est produite lors de l'ajout/mise à jour.",
          });
          console.error('Erreur:', error);
        }
      );
    }
  }



  editorModules = {
    toolbar: [
      ['bold', 'italic', 'underline', 'strike'],        // styles de base
      [{ 'header': 1 }, { 'header': 2 }],                 // titres
      [{ 'list': 'ordered' }, { 'list': 'bullet' }],       // listes
      [{ 'indent': '-1' }, { 'indent': '+1' }],            // indentation
      [{ 'size': ['small', false, 'large', 'huge'] }],    // taille du texte
      [{ 'color': [] }, { 'background': [] }],            // couleurs
      [{ 'align': [] }],                                  // alignement
      ['clean']                                           // effacer la mise en forme
    ]
  };




}
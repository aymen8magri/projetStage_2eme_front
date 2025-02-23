import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BanqueService } from 'app/auth/service/banque.service';
import { ModePayementService } from 'app/auth/service/mode-payement.service';
import { PayementFournissseurService } from 'app/auth/service/payement-fournissseur.service';
import { TiersService } from 'app/auth/service/tiers.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-payement-fournisseur',
  templateUrl: './edit-payement-fournisseur.component.html',
  styleUrls: ['./edit-payement-fournisseur.component.scss']
})
export class EditPayementFournisseurComponent implements OnInit {

  constructor() { }
  readonly router: Router = inject(Router);
  readonly payementFournisseurService: PayementFournissseurService = inject(PayementFournissseurService);
  readonly act: ActivatedRoute = inject(ActivatedRoute);
  readonly modePayementService: ModePayementService = inject(ModePayementService);
  readonly banqueService: BanqueService = inject(BanqueService);
  readonly fb: FormBuilder = inject(FormBuilder);

  get formPayementFournisseur() {
    return this.editPayementFournisseurForm.controls;
  }

  isEscompteChecked: boolean = false;
  toggleEscompte(event: Event): void {
    const checkbox = event.target as HTMLInputElement;
    this.isEscompteChecked = checkbox.checked;
  
    const dateEscompteControl = this.editPayementFournisseurForm.get('dateEsCompte');
  
    if (this.isEscompteChecked) {
      // Enable the field and set today's date as default
      dateEscompteControl?.enable();
      dateEscompteControl?.setValue(new Date().toISOString().split('T')[0]);
    } else {
      // Disable the field and clear its value
      dateEscompteControl?.disable();
      dateEscompteControl?.setValue(null);
    }
  }

  submitted = false;
  editPaymentFournisseur() {
    this.submitted = true;
    if (this.editPayementFournisseurForm.valid) {
      const formData = {
        ...this.editPayementFournisseurForm.value,
        numPaiement: this.editPayementFournisseurForm.get('numPaiement')?.value?.toString(),
        idFournisseur : this.responsePayement.idFournisseur,
        dateEsCompte: this.editPayementFournisseurForm.get('dateEsCompte')?.value
      }
      this.payementFournisseurService.updatePayementFournisseur(this.idPayementFournisseur, formData).subscribe(
        (response: any) => {
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Fournisseur ajouté avec succès",
            text: "Le Fournisseur a été ajouté correctement.",
            showConfirmButton: false,
            timer: 1500
          });



          this.router.navigate(['/reglement/list-payement-fournisseur']);
          this.submitted = false;


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

  resetFormPayementFournisseur() {
    this.editPayementFournisseurForm.reset();
  }

  editPayementFournisseurForm: FormGroup;
  listBanques: any;
  listModePayement: any;
  idPayementFournisseur: any;
  selectedModePayement: any;
  selectedBanque: any;
  responsePayement: any;
  ngOnInit(): void {
    this.idPayementFournisseur = this.act.snapshot.params.id;
    this.payementFournisseurService.getPayementFournisseurById(this.idPayementFournisseur).subscribe(
      (response: any) => {
        this.responsePayement = response;
        this.selectedModePayement = response.idModePayement._id;
        this.selectedBanque = response.idBanque._id;
        const leFournisseur = response.idFournisseur.nom + ' ' + response.idFournisseur.prenom;
        const DateCreation = response.dateCreation ? new Date(response.dateCreation).toISOString().split('T')[0] : null;
        const Echeance = response.echeance ? new Date(response.echeance).toISOString().split('T')[0] : null ;
        const DateRegle = response.dateRegle ? new Date(response.dateRegle).toISOString().split('T')[0] : null;
        const DateEscompte = response.dateEsCompte ? new Date(response.dateEsCompte).toISOString().split('T')[0] : null;

        this.editPayementFournisseurForm.patchValue({
          ...response,
          idModePayement: this.selectedModePayement,
          idBanque: this.selectedBanque,
          dateCreation: DateCreation,
          echeance: Echeance,
          dateRegle: DateRegle,
          dateEsCompte: DateEscompte,
          idFournisseur: leFournisseur
        });
      },
      (error: any) => {
        console.log('Erreur:', error);
      }
    );

    // Get list mode payement
    this.modePayementService.getAllModePayements().subscribe(
      (response: any) => {
        this.listModePayement = response;
      },
      (error: any) => {
        console.log('Erreur:', error);
      }
    );

    // Get list banque
    this.banqueService.getAllBanque().subscribe(
      (response: any) => {
        this.listBanques = response;
      },
      (error: any) => {
        console.log('Erreur:', error);
      }
    );

    this.editPayementFournisseurForm = this.fb.group({
      numPaiement: [''],
      dateCreation: [''],
      idFournisseur: [''],
      idModePayement: ['', Validators.required],
      montant: ['', Validators.required],
      echeance: ['', Validators.required],
      numPiece: ['', Validators.required],
      idBanque: ['', Validators.required],
      regle: ['', Validators.required],
      dateRegle: ['', Validators.required],
      esCompte: [''],
      dateEsCompte: ['']
    });
  }

}


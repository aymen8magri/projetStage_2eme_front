import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { BanqueService } from 'app/auth/service/banque.service';
import { TiersService } from 'app/auth/service/tiers.service';
import { PayementClientService } from 'app/auth/service/payement-client.service';
import { ModePayementService } from 'app/auth/service/mode-payement.service';
import { PayementFournissseurService } from 'app/auth/service/payement-fournissseur.service';

@Component({
  selector: 'app-add-payement-fournisseur',
  templateUrl: './add-payement-fournisseur.component.html',
  styleUrls: ['./add-payement-fournisseur.component.scss']
})
export class AddPayementFournisseurComponent implements OnInit {

  numPaiement: number;
  constructor() { }
  readonly router: Router = inject(Router);
  readonly fb: FormBuilder = inject(FormBuilder);
  readonly banqueService: BanqueService = inject(BanqueService);
  readonly clientService: TiersService = inject(TiersService);
  readonly modePayementService: ModePayementService = inject(ModePayementService);
  readonly payementFournisseurService: PayementFournissseurService = inject(PayementFournissseurService);

  get formPayementFournisseur() {
    return this.addPayementFournisseurForm.controls;
  }



  submitted = false;
  isEscompteChecked: boolean = false;
  toggleEscompte(event: Event): void {
    const checkbox = event.target as HTMLInputElement;
    this.isEscompteChecked = checkbox.checked;
  
    const dateEscompteControl = this.addPayementFournisseurForm.get('dateEsCompte');
  
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
  addPaymentFournisseur() {
    this.submitted = true;

    // Validate form before submission
    if (this.addPayementFournisseurForm.valid) {
      const formData = {
        ...this.addPayementFournisseurForm.value, // Copier toutes les valeurs du formulaire
        numPaiement: this.addPayementFournisseurForm.get('numPaiement')?.value?.toString(), // Ajouter la nouvelle propriété
      };
      // Submit form data
      this.payementFournisseurService.addPayementFournisseur(formData).subscribe(
        (response: any) => {
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Client ajouté avec succès",
            text: "Le client a été ajouté correctement.",
            showConfirmButton: false,
            timer: 1500
          });


          // Reset form after submission
          this.resetFormPayementFournisseur();
          // Redirect to the list page after success
          this.router.navigate(['/reglement/list-payement-fournisseur']);
          this.submitted = false;
          this.onIncrementCode(); // Handle code increment


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
    this.addPayementFournisseurForm.reset();
    this.addPayementFournisseurForm.controls['numPaiement'].setValue(this.numPaiement);
    this.addPayementFournisseurForm.controls['dateCreation'].setValue(new Date().toISOString().split('T')[0]);
  }

  onIncrementCode() {
    this.numPaiement += 1;
    localStorage.setItem('numPaiement', this.numPaiement.toString());
    this.addPayementFournisseurForm.patchValue({
      numPaiement: { value: this.numPaiement, disabled: true }
    });
  }


  addPayementFournisseurForm: FormGroup;

  listBanques: any;
  listFournisseurs: any;
  listModePayement: any;
  ngOnInit(): void {
    //get les banques
    this.banqueService.getAllBanque().subscribe(
      (response: any) => {
        this.listBanques = response;
        //console.log('Liste des banques:', this.listBanques);
      },
      (error: any) => {
        console.error('Error:', error);
      }
    );

    //get les clients
    this.clientService.getTiersByType("fournisseur").subscribe(
      (response: any) => {
        this.listFournisseurs = response;
        //console.log('Liste des clients:', this.listFournisseurs);
      },
      (error: any) => {
        console.error('Error:', error);
      }
    );

    //get les modes de paiement
    this.modePayementService.getAllModePayements().subscribe(
      (response: any) => {
        this.listModePayement = response;
        //console.log('Liste des modes de paiement:', this.listModePayement);
      },
      (error: any) => {
        console.error('Error:', error);
      }
    );


    const savedCode = localStorage.getItem('numPaiement');
    this.numPaiement = savedCode ? +savedCode : 1;

    this.addPayementFournisseurForm = this.fb.group({
      numPaiement: [{ value: this.numPaiement, disabled: true }],
      dateCreation: [new Date().toISOString().split('T')[0],Validators.required],
      idFournisseur: ['',Validators.required],
      idModePayement: ['',Validators.required],
      montant: ['', Validators.required],
      echeance: ['',Validators.required],
      numPiece: ['',Validators.required],
      idBanque: ['',Validators.required],
      regle: ['',Validators.required],
      dateRegle: ['',Validators.required],
      esCompte: [false],
      dateEsCompte: [{ value: null, disabled: true }]
    });

  }
}
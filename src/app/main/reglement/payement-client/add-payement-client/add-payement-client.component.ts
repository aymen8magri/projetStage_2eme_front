import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { BanqueService } from 'app/auth/service/banque.service';
import { TiersService } from 'app/auth/service/tiers.service';
import { PayementClientService } from 'app/auth/service/payement-client.service';
import { ModePayementService } from 'app/auth/service/mode-payement.service';

@Component({
  selector: 'app-add-payement-client',
  templateUrl: './add-payement-client.component.html',
  styleUrls: ['./add-payement-client.component.scss']
})
export class AddPayementClientComponent implements OnInit {

  numPaiement: number;
  constructor() { }
  readonly router: Router = inject(Router);
  readonly fb: FormBuilder = inject(FormBuilder);
  readonly banqueService: BanqueService = inject(BanqueService);
  readonly clientService: TiersService = inject(TiersService);
  readonly modePayementService: ModePayementService = inject(ModePayementService);
  readonly payementClientService: PayementClientService = inject(PayementClientService);

  get formPayementClient() {
    return this.addPayementClientForm.controls;
  }


  isEscompteChecked: boolean = false;
  toggleEscompte(event: Event): void {
    const checkbox = event.target as HTMLInputElement;
    this.isEscompteChecked = checkbox.checked;
  
    const dateEscompteControl = this.addPayementClientForm.get('dateEsCompte');
  
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

  addPaymentClient() {
    this.submitted = true;

    console.log('Form:', this.addPayementClientForm.value);

    // Validate form before submission
    if (this.addPayementClientForm.valid) {
      
      const formData = {
        ...this.addPayementClientForm.value, // Copier toutes les valeurs du formulaire
        numPaiement: this.addPayementClientForm.get('numPaiement')?.value?.toString(), // Ajouter la nouvelle propriété
      };
      
      // Submit form data
      this.payementClientService.addPayementClient(formData).subscribe(
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
          this.resetFormPayementClient();
          this.router.navigate(['/reglement/list-payement-client']);
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


  resetFormPayementClient() {
    this.addPayementClientForm.reset();
    this.addPayementClientForm.controls['numPaiement'].setValue(this.numPaiement);
    this.addPayementClientForm.controls['dateCreation'].setValue(new Date().toISOString().split('T')[0]);
  }

  onIncrementCode() {
    this.numPaiement += 1;
    localStorage.setItem('numPaiement', this.numPaiement.toString());
    this.addPayementClientForm.patchValue({
      numPaiement: { value: this.numPaiement, disabled: true }
    });
  }


  addPayementClientForm: FormGroup;

  listBanques: any;
  listClient: any;
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
    this.clientService.getTiersByType("client").subscribe(
      (response: any) => {
        this.listClient = response;
        //console.log('Liste des clients:', this.listClient);
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

    this.addPayementClientForm = this.fb.group({
      numPaiement: [{ value: this.numPaiement, disabled: true }],
      dateCreation: [new Date().toISOString().split('T')[0], Validators.required],
      idClient: ['', Validators.required],
      idModePayement: ['', Validators.required],
      montant: ['', Validators.required],
      echeance: ['', Validators.required],
      numPiece: ['', Validators.required],
      idBanque: ['', Validators.required],
      regle: ['', Validators.required],
      dateRegle: ['', Validators.required],
      esCompte: [false],
      dateEsCompte: [{ value: null, disabled: true }]
    });

  }
}
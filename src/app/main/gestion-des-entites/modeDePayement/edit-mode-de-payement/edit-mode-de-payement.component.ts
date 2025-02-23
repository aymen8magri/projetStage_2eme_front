import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ModePayementService } from 'app/auth/service/mode-payement.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-mode-de-payement',
  templateUrl: './edit-mode-de-payement.component.html',
  styleUrls: ['./edit-mode-de-payement.component.scss']
})
export class EditModeDePayementComponent implements OnInit {

  
    constructor() { }
  
    submitted = false;
  
    readonly modeDePayementService: ModePayementService = inject(ModePayementService);
    readonly fb: FormBuilder = inject(FormBuilder);
    readonly router: Router = inject(Router);
    readonly act: ActivatedRoute = inject(ActivatedRoute);
  
    modePayementForm = this.fb.group({
      libelle: ['', Validators.required]
    });
  
    updateModePayement() {
      this.submitted = true;
    
      // Check if the form is valid
      if (this.modePayementForm.valid) {
        this.modeDePayementService.updateModePayement(this.idModePayement, this.modePayementForm.value).subscribe(
          (response: any) => {
            // Success message
            Swal.fire({
              position: "top-end",
              icon: "success",
              title: "Mode de paiement mettre a jour avec succès",
              text: "Le mode de paiement a été mettre a jour correctement.",
              showConfirmButton: false,
              timer: 1500
            });
            this.submitted = false;
    
            // Redirect to the list page after success
            this.router.navigate(['/gestion-des-entities/list-mode-de-payement']);
          },
          (error: any) => {
            // Error message
            Swal.fire({
              icon: "error",
              title: "Une erreur s'est produite",
              text: "Il y a eu un problème lors de l'ajout du mode de paiement. Veuillez réessayer plus tard.",
              showConfirmButton: true,
              confirmButtonText: "Fermer"
            });
            console.error('Error:', error);
          }
        );
      } else {
        // Invalid form message
        Swal.fire({
          icon: "warning",
          title: "Formulaire incomplet",
          text: "Veuillez remplir tous les champs obligatoires avant de soumettre.",
          showConfirmButton: true,
          confirmButtonText: "D'accord"
        });
      }
    }
    
    idModePayement: any;
    ngOnInit(): void {
      this.idModePayement = this.act.snapshot.params.id;
      this.modeDePayementService.getModePayementById(this.idModePayement).subscribe(data => {
        this.modePayementForm.patchValue(data);
      });
    }
  
  }
  
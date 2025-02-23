import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ModePayementService } from 'app/auth/service/mode-payement.service';
import { RegionService } from 'app/auth/service/region.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-regions',
  templateUrl: './edit-regions.component.html',
  styleUrls: ['./edit-regions.component.scss']
})
export class EditRegionsComponent implements OnInit {

  constructor() { }

  submitted = false;

  readonly regionService: RegionService = inject(RegionService);

  readonly fb: FormBuilder = inject(FormBuilder);
  readonly router: Router = inject(Router);

  readonly act: ActivatedRoute = inject(ActivatedRoute);

  regionForm = this.fb.group({
    libelle: ['', Validators.required]
  });

  onUpdateRegion() {
    this.submitted = true;

    // Check if the form is valid
    if (this.regionForm.valid) {
      this.regionService.updateRegion(this.regionId, this.regionForm.value).subscribe(
        (response: any) => {
          // Success message
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Région ajouté avec succès",
            text: "Le Région a été ajouté correctement.",
            showConfirmButton: false,
            timer: 1500
          });

          this.submitted = false;

          // Redirect to the list page after success
          this.router.navigate(['/gestion-des-entities/list-regions']);
        },
        (error: any) => {
          // Error message
          Swal.fire({
            icon: "error",
            title: "Une erreur s'est produite",
            text: "Il y a eu un problème lors de l'ajout du Région. Veuillez réessayer plus tard.",
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

  regionId: any ;
  ngOnInit(): void {
    // Get the region id from the route
    this.regionId = this.act.snapshot.params.id;

    // Fetch the region data and populate the form
    this.regionService.getRegionById(this.regionId).subscribe(
      (response: any) => {
        this.regionForm.patchValue(response);
      },
      (error: any) => {
        console.error('Error:', error);
      }
    );
  }

}



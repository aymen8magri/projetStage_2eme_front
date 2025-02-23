import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PayementClientService } from 'app/auth/service/payement-client.service';
import { PayementFournissseurService } from 'app/auth/service/payement-fournissseur.service';
import { TiersService } from 'app/auth/service/tiers.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list-payement-fournisseur',
  templateUrl: './list-payement-fournisseur.component.html',
  styleUrls: ['./list-payement-fournisseur.component.scss']
})
export class ListPayementFournisseurComponent implements OnInit {


  constructor() { }
  readonly tiersService: TiersService = inject(TiersService);
  readonly payementFournisseurService: PayementFournissseurService = inject(PayementFournissseurService);
  readonly router: Router = inject(Router);
  listFournisseur: any;
  listPayementFournisseur: any;
  montantTotal: number;
  fournisseurInfo: any[] = [];

  onGetPayementFournisseur(id: any) {
    this.montantTotal = 0; // Assurez-vous que 'montantTotal' est une propriété de votre classe.

    this.payementFournisseurService.getPayementFournisseurByFournisseurId(id).subscribe((data) => {
      this.listPayementFournisseur = data;
      if (this.listPayementFournisseur.length > 0) {
        const fournisseur = this.listPayementFournisseur[0].idFournisseur;

        // Remplir les informations du fournisseur
        this.fournisseurInfo = [
          { label: 'Nom', value: fournisseur.nom, icon: 'user' },
          { label: 'Prénom', value: fournisseur.prenom, icon: 'user' },
          { label: 'Adresse', value: fournisseur.adresse, icon: 'map-pin' },
          { label: 'Contact', value: fournisseur.contact, icon: 'phone' },
          { label: 'Pays', value: fournisseur.pays, icon: 'globe' },
        ];
      }

      // Calcul du montant total
      this.listPayementFournisseur.forEach((element) => {
        this.montantTotal += Number(element.montant || 0); // Gérer les montants null/undefined
      });

    });
  }

  onViewFournisseurDetails() {
    this.router.navigate(['/gestion-des-entities/view-fournisseur/' + this.listPayementFournisseur[0].idFournisseur._id]);
  }

  ngOnInit(): void {
    this.tiersService.getTiersByType('fournisseur').subscribe((data) => {
      this.listFournisseur = data;
    });
  }

  onDeletePayementFournisseur(id: any) {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6", // Blue color for confirmation
      cancelButtonColor: "#d33", // Red color for cancel
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
      backdrop: true, // Optional: Adds a backdrop to emphasize the dialog
      allowOutsideClick: false, // Prevents closing when clicked outside
      customClass: {
        popup: 'popup-confirmation', // Custom class for the popup
        title: 'title-style', // Custom title style
        icon: 'icon-style', // Custom icon style
        confirmButton: 'confirm-btn', // Custom confirm button style
        cancelButton: 'cancel-btn' // Custom cancel button style
      }
    }).then((result) => {
      if (result.isConfirmed) {
        this.payementFournisseurService.deletePayementFournisseur(id).subscribe(
          (data: any) => {
            window.location.reload();
            Swal.fire({
              title: "Deleted!",
              text: "Your file has been deleted.",
              icon: "success",
              confirmButtonColor: "#28a745", // Green color for success
              customClass: {
                popup: 'popup-success',
                title: 'success-title',
                confirmButton: 'success-btn'
              }
            });
          }
        );
      }
    });
  }
}

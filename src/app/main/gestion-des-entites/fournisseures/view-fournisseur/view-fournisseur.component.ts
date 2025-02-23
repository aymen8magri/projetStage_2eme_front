import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TiersService } from 'app/auth/service/tiers.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-fournisseur',
  templateUrl: './view-fournisseur.component.html',
  styleUrls: ['./view-fournisseur.component.scss']
})
export class ViewFournisseurComponent implements OnInit {


  constructor() { }

  readonly fournisseurService: TiersService = inject(TiersService);
  readonly act: ActivatedRoute = inject(ActivatedRoute);
  readonly router: Router = inject(Router);

  fournisseur: any;
  idfournisseur: any;

  ngOnInit(): void {
    this.idfournisseur = this.act.snapshot.params.id;
    this.fournisseurService.getTiersById(this.idfournisseur).subscribe(data => {
      this.fournisseur = data;
    });
  }


  deletefournisseur() {
    Swal.fire({
      title: "Êtes-vous sûr ?",
      text: "Cette action est irréversible. Voulez-vous vraiment supprimer ce fournisseur ?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6", // Bleu pour confirmer
      cancelButtonColor: "#d33", // Rouge pour annuler
      confirmButtonText: "Oui, supprimer !",
      cancelButtonText: "Annuler",
      backdrop: true, // Ajout d'un arrière-plan pour mettre en évidence la boîte de dialogue
      allowOutsideClick: false, // Empêche la fermeture en cliquant à l'extérieur
      customClass: {
        popup: 'popup-confirmation', // Classe personnalisée pour la fenêtre modale
        title: 'title-style', // Classe personnalisée pour le titre
        icon: 'icon-style', // Classe personnalisée pour l'icône
        confirmButton: 'confirm-btn', // Classe personnalisée pour le bouton de confirmation
        cancelButton: 'cancel-btn' // Classe personnalisée pour le bouton d'annulation
      }
    }).then((result) => {
      if (result.isConfirmed) {
        this.fournisseurService.deleteTiers(this.idfournisseur).subscribe(
          (data: any) => {
            this.router.navigate(['/gestion-des-entities/list-fournisseur']);
            Swal.fire({
              title: "Supprimé !",
              text: "Le fournisseur a été supprimé avec succès.",
              icon: "success",
              confirmButtonColor: "#28a745", // Vert pour le succès
              customClass: {
                popup: 'popup-success', // Classe personnalisée pour la fenêtre modale
                title: 'success-title', // Classe personnalisée pour le titre
                confirmButton: 'success-btn' // Classe personnalisée pour le bouton de confirmation
              }
            });
          }
        );
      }
    });
  }
  
}


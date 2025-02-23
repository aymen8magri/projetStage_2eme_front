import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BanqueService } from 'app/auth/service/banque.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-banque',
  templateUrl: './view-banque.component.html',
  styleUrls: ['./view-banque.component.scss']
})
export class ViewBanqueComponent implements OnInit {

 
   constructor() { }
 
   readonly banqueService: BanqueService = inject(BanqueService);
   readonly act: ActivatedRoute = inject(ActivatedRoute);
   readonly router: Router = inject(Router);
 
   banque: any;
   idbanque: any;
 
   ngOnInit(): void {
     this.idbanque = this.act.snapshot.params.id;
     this.banqueService.getBanqueById(this.idbanque).subscribe(data => {
       this.banque = data;
     });
   }
 
 
   deletebanque() {
     Swal.fire({
       title: "Êtes-vous sûr ?",
       text: "Cette action est irréversible. Voulez-vous vraiment supprimer ce banque ?",
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
         this.banqueService.deleteBanque(this.idbanque).subscribe(
           (data: any) => {
             this.router.navigate(['/gestion-des-entities/list-banques']);
             Swal.fire({
               title: "Supprimé !",
               text: "Le banque a été supprimé avec succès.",
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
 
 

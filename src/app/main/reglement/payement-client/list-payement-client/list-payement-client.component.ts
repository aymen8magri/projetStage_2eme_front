import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PayementClientService } from 'app/auth/service/payement-client.service';
import { TiersService } from 'app/auth/service/tiers.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list-payement-client',
  templateUrl: './list-payement-client.component.html',
  styleUrls: ['./list-payement-client.component.scss']
})
export class ListPayementClientComponent implements OnInit {

  constructor() { }
  readonly tiersService: TiersService = inject(TiersService);
  readonly payementClientService: PayementClientService = inject(PayementClientService);
  readonly router: Router = inject(Router);
  listClient: any;
  listPayementClient: any[] = [];
  montantTotal: number;
  clientInfo: Array<{ label: string; value: string; icon: string }> = [];
  onGetPayementClient(id: any) {
    this.montantTotal = 0;
    this.payementClientService.getPayementClientByClientId(id).subscribe((data) => {
      this.listPayementClient = Array.isArray(data) ? data : [];

      if (this.listPayementClient.length > 0 && this.listPayementClient[0]?.idClient) {
        const idClient = this.listPayementClient[0].idClient;
        this.clientInfo = [
          {
            label: 'Type',
            value: idClient.typeTiers || 'N/A',
            icon: 'info',
          },
          {
            label: 'Label',
            value: idClient.libelle || 'N/A',
            icon: 'link',
          },
          {
            label: 'Contact',
            value: idClient.contact || 'N/A',
            icon: 'mail',
          },
          {
            label: 'Raison Sociale',
            value: idClient.raison_sociale || 'N/A',
            icon: 'flag',
          },
          {
            label: 'Pays',
            value: idClient.pays || 'N/A',
            icon: 'map-pin',
          },
        ];
      } else {
        console.warn('Aucune donnée client disponible.');
      }

      // Calcul du montant total
      this.listPayementClient.forEach((element) => {
        this.montantTotal += Number(element.montant || 0);
      });

      // Affiche les données et le montant total pour vérification
      console.log('Données des paiements :', this.listPayementClient);
      console.log('Montant total :', this.montantTotal);
      console.log('Client :', this.clientInfo);
    });
  }

  onViewDetails() {
    this.router.navigate(['/gestion-des-entities/view-client/' + this.listPayementClient[0].idClient._id]);
  }


  ngOnInit(): void {
    this.tiersService.getTiersByType('client').subscribe((data) => {
      this.listClient = data;
    });
  }

  onDeletePayementClient(id: any): void {
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
        this.payementClientService.deletePayementClient(id).subscribe(
          (data: any) => {
            window.location.reload();
            // Show a success message
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

          });
      }
    });
  }


}

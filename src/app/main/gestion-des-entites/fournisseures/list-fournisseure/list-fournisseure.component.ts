import { Component, inject, OnInit, ViewEncapsulation } from '@angular/core';
import Swal from 'sweetalert2'
import { TiersService } from 'app/auth/service/tiers.service';
import { BanqueService } from 'app/auth/service/banque.service';
import { RegionService } from 'app/auth/service/region.service';

@Component({
  selector: 'app-list-fournisseure',
  templateUrl: './list-fournisseure.component.html',
  styleUrls: ['./list-fournisseure.component.scss'],
  encapsulation: ViewEncapsulation.None

})
export class ListFournisseureComponent implements OnInit {

  paginatedFournisseure: any[] = []; // Subset of data for the current page
  totalItems: number = 0; // Total number of items
  currentPage: number = 1; // Current page number
  itemsPerPage: number = 10; // Items per page

  constructor() { }


  readonly tiersService: TiersService = inject(TiersService);
  readonly banquetService: BanqueService = inject(BanqueService);
  readonly regionService: RegionService = inject(RegionService);
  listBanque: any;
  listRegion: any;
  listeFournisseure: any;

  ngOnInit(): void {
    this.tiersService.getTiersByType("fournisseur").subscribe(
      (data: any) => {
        console.log(data);
        this.listeFournisseure = data;
        this.filteredFournisseur = [...this.listeFournisseure];

        this.totalItems = data.length;
        this.updatePaginatedData();
      },
      (error: any) => {
        console.log(error);
      }
    )
    //get les banques
    this.banquetService.getAllBanque().subscribe(
      (data: any) => {
        console.log(data);
        this.listBanque = data;
      },
      (error: any) => {
        console.log(error);
      }
    )

    //get les regions
    this.regionService.getAllRegions().subscribe(
      (data: any) => {
        console.log(data);
        this.listRegion = data;
      },
      (error: any) => {
        console.log(error);
      }
    )
  }

  // Update the paginated data based on the current page and items per page
  updatePaginatedData(): void {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.paginatedFournisseure = this.filteredFournisseur.slice(startIndex, endIndex);
  }
  // Handle page changes
  onPageChange(page: number): void {
    this.currentPage = page;
    this.updatePaginatedData();
  }

  // Optional: Handle changes in items per page
  onItemsPerPageChange(itemsPerPage: number): void {
    this.itemsPerPage = itemsPerPage;
    this.currentPage = 1; // Reset to the first page
    this.updatePaginatedData();
  }

  // la logique de recherche et de filtrage
  applyFilters(): void {
    let filtered = [...this.listeFournisseure];

    // Filtrage par banque
    if (this.selectedBanque) {
      filtered = filtered.filter(fournisseur => fournisseur.idBanque?._id === this.selectedBanque);
    }

    // Filtrage par région
    if (this.selectedRegion) {
      filtered = filtered.filter(fournisseur => fournisseur.idRegion?._id === this.selectedRegion);
    }

    // Filtrage par nom, prénom, email
    if (this.searchQuery.trim()) {
      const query = this.searchQuery.toLowerCase();
      filtered = filtered.filter(fournisseur =>
        (fournisseur.nom + ' ' + fournisseur.prenom).toLowerCase().includes(query) ||
        fournisseur.email?.toLowerCase().includes(query)
      );
    }

    // Mettre à jour la liste filtrée et paginée
    this.filteredFournisseur = filtered;
    this.totalItems = this.filteredFournisseur.length;
    this.updatePaginatedData();
  }

  selectedBanque: string = ''; // Banque sélectionnée
  selectedRegion: string = ''; // Région sélectionnée
  filteredFournisseur: any[] = []; // Liste filtrée
  searchQuery: string = ''; // la mot de recherche

  // Réinitialiser les filtres
  resetFilters(): void {
    this.selectedBanque = '';
    this.selectedRegion = '';
    this.searchQuery = '';
    this.filteredFournisseur = [...this.listeFournisseure]; // Réinitialise à la liste complète
    this.totalItems = this.filteredFournisseur.length;
    this.currentPage = 1;
    this.updatePaginatedData();
  }

  deleteFournisseur(id: any): void {
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
        this.tiersService.deleteTiers(id).subscribe(
          (data: any) => {
            this.ngOnInit(); // Reload or update the list
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


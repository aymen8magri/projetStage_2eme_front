import { Component, inject, OnInit } from '@angular/core';
import { ModePayementService } from 'app/auth/service/mode-payement.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list-mode-de-payement',
  templateUrl: './list-mode-de-payement.component.html',
  styleUrls: ['./list-mode-de-payement.component.scss']
})
export class ListModeDePayementComponent implements OnInit {
  paginatedModePayement: any[] = []; // Subset of data for the current page
  totalItems: number = 0; // Total number of items
  currentPage: number = 1; // Current page number
  itemsPerPage: number = 10; // Items per page

  constructor() { }


  readonly modeDePayementService: ModePayementService = inject(ModePayementService);
  listeModePayement: any;
  ngOnInit(): void {
    this.modeDePayementService.getAllModePayements().subscribe(
      (data: any) => {
        console.log(data);
        this.listeModePayement = data;
        console.log(this.listeModePayement);

        this.totalItems = data.length;
        this.updatePaginatedData();
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
    this.paginatedModePayement = this.listeModePayement.slice(startIndex, endIndex);
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

  deleteMode(id: any): void {
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
        this.modeDePayementService.deleteModePayement(id).subscribe(
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

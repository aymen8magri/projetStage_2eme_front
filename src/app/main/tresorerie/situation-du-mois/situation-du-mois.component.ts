import { Component, inject, OnInit } from '@angular/core';
import { BanqueService } from 'app/auth/service/banque.service';
import { TabDeBordService } from 'app/auth/service/tab-de-bord.service';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-situation-du-mois',
  templateUrl: './situation-du-mois.component.html',
  styleUrls: ['./situation-du-mois.component.scss']
})
export class SituationDuMoisComponent implements OnInit {
  selectedAnnee: string = '';
  selectedMois: string = '';
  selectedBanque: string = '';
  listBanques: any;
  years: number[] = [];
  tabDeBord: any = {};

  readonly banqueService = inject(BanqueService);
  readonly tabDeBordService = inject(TabDeBordService);

  barChart!: Chart;

  constructor() { }

  ngOnInit(): void {
    this.generateYears();
    this.loadData();
    this.generateChart();

  }

  /**
   * Generate years for the dropdown
   */
  generateYears() {
    const currentYear = new Date().getFullYear();
    this.years = Array.from({ length: 11 }, (_, i) => currentYear - i);
  }

  loadData() {
    this.banqueService.getAllBanque().subscribe(data => this.listBanques = data);
  }

  applyFilters() {
    // Vérifier s'il y a un ancien graphique et le détruire
    if (this.barChart) {
      this.barChart.destroy();
    }
    this.tabDeBord = {};
    this.tabDeBordService.getTabDeBordByMoisAndAnneAndBanque(this.selectedMois, this.selectedAnnee, this.selectedBanque).subscribe(data => {
      this.tabDeBord = data;
      this.generateChart();

      console.log('Données récupérées:', this.tabDeBord);
    }, error => {
      console.log('Erreur:', error);
    });
  }

  resetFilters() {
    this.selectedAnnee = '';
    this.selectedMois = '';
    this.selectedBanque = '';
  }
  isTabDeBordNotEmpty(): boolean {
    return this.tabDeBord && Object.keys(this.tabDeBord).length > 0;
  }


  generateChart(): void {
    const ctx = document.getElementById('barChart') as HTMLCanvasElement;
    this.barChart = new Chart(ctx, {
      type: 'bar', // Type de graphique à barres
      data: {
        labels: ['Encaissements', 'Décaissements'], // Labels pour l'axe X
        datasets: [
          {
            label: 'Encaissements',
            data: [this.tabDeBord.encaissement,0], // Valeurs des encaissements
            backgroundColor: '#00db89', // Vert pour encaissements
            borderColor: '#28A745',
            borderWidth: 1
          },
          {
            label: 'Décaissements',
            data: [0,this.tabDeBord.decaissement], // Valeurs des décaissements
            backgroundColor: '#EA5455', // Rouge pour décaissements
            borderColor: '#DC3545',
            borderWidth: 1
          }
        ]
        
      },
      options: {
        responsive: true,
        scales: {
          yAxes: [{
            display: true,
            ticks: {
              beginAtZero: true,
              stepSize: 1000
            }

          }],
          xAxes: [{
            display: true,

          }]
        },
        plugins: {
          legend: {
            display: true,
            position: 'top'
          }
        }
      }
    });
  }
}

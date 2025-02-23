import { Component, inject, OnInit } from '@angular/core';
import { BanqueService } from 'app/auth/service/banque.service';
import { SocieteService } from 'app/auth/service/societe.service';
import { TabDeBordService } from 'app/auth/service/tab-de-bord.service';
import { TiersService } from 'app/auth/service/tiers.service';
import { colors } from 'app/colors.const';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-sample',
  templateUrl: './sample.component.html',
  styleUrls: ['./sample.component.scss']
})
export class SampleComponent implements OnInit {
  public contentHeader: object;

  // Couleurs
  private tooltipShadow = 'rgba(0, 0, 0, 0.25)';
  private lineChartDanger = '#ff4961';
  private gridLineColor = 'rgba(200, 200, 200, 0.2)';
  private labelColor = '#6e6b7b';

  readonly tiersService: TiersService = inject(TiersService);
  readonly banqueService: BanqueService = inject(BanqueService);
  readonly societeService: SocieteService = inject(SocieteService);
  readonly tabDeBordersService: TabDeBordService = inject(TabDeBordService);

  dataClient: number[] = [];
  nbClients: number = 0;
  dataFournisseur: number[] = [];
  nbFournisseurs: number = 0;
  currentYear = new Date().getFullYear();
  nbBanques: number = 0;
  nbSociete: number = 0;
  isMenuToggled: boolean = false;

  dataSoldeFinal: number[] = Array(12).fill(0);


  public lineChart: any;

  ngOnInit() {
    this.initializeContentHeader();
    this.initializeData();
    this.loadDataLineChart();
    this.createChart();

    // Récupération des données des banques
    this.banqueService.getAllBanque().subscribe(
      (data: any) => {
        this.nbBanques = data.length;
        this.updateChart();
      },
      (error) => {
        console.error('Erreur lors de la récupération des données :', error);
      }
    );

    // Récupération des données des sociétés
    this.societeService.getAllSociete().subscribe(
      (data: any) => {
        this.nbSociete = data.length;
        this.updateChart();
      },
      (error) => {
        console.error('Erreur lors de la récupération des données :', error);
      }
    );
  }

  /**
   * Initialisation de l'en-tête de contenu
   */
  private initializeContentHeader() {
    this.contentHeader = {
      headerTitle: 'Statistics',
      actionButton: true,
      breadcrumb: {
        type: '',
        links: [
          {
            name: 'Statistics',
            isLink: false
          },
          {
            name: 'Home',
            isLink: true,
            link: '/'
          }
        ]
      }
    };
  }

  /**
   * Initialisation des données du graphique
   */
  private initializeData() {
    this.dataClient = Array(12).fill(0); // Tableau pour 12 mois initialisé à 0
    this.dataFournisseur = Array(12).fill(0); // Tableau pour les fournisseurs

    this.lineChart = {
      chartType: 'line',
      options: this.getChartOptions(),
      labels: [
        'Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin',
        'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'
      ],
      datasets: [
        {
          data: this.dataClient,
          label: 'Clients',
          borderColor: this.lineChartDanger,
          lineTension: 0.5,
          pointStyle: 'circle',
          backgroundColor: 'transparent',
          fill: false,
          pointRadius: 3,
          pointHoverRadius: 5,
          pointHoverBorderWidth: 5,
          pointBorderColor: 'transparent',
          pointHoverBorderColor: '#fff',
          pointHoverBackgroundColor: this.lineChartDanger,
          pointShadowOffsetX: 1,
          pointShadowOffsetY: 1,
          pointShadowBlur: 5,
          pointShadowColor: this.tooltipShadow
        },
        {
          data: this.dataFournisseur,
          label: 'Fournisseurs',
          borderColor: '#ffc107',
          lineTension: 0.5,
          pointStyle: 'circle',
          backgroundColor: 'transparent',
          fill: false,
          pointRadius: 3,
          pointHoverRadius: 5,
          pointHoverBorderWidth: 5,
          pointBorderColor: 'transparent',
          pointHoverBorderColor: '#fff',
          pointHoverBackgroundColor: '#ffc107',
          pointBackgroundColor: '#ffc107',
          pointShadowOffsetX: 1,
          pointShadowOffsetY: 1,
          pointShadowBlur: 5,
          pointShadowColor: this.tooltipShadow
        }
      ]
    };
  }

  /**
   * Chargement des données des clients des Fournisseurs par mois
   */
  private loadDataLineChart() {

    for (let month = 1; month <= 12; month++) {
      // Récupération des données des clients
      this.tiersService.getTiersByTypeAndMoisCreation('client', month, this.currentYear).subscribe(
        (data: any) => {
          if (data && data.length > 0) {
            this.dataClient[month - 1] = data.length; // Remplir les données pour le mois correspondant
            this.nbClients += data.length;
          } else {
            this.dataClient[month - 1] = 0; // Pas de clients pour ce mois
          }
          this.updateChart(); // Mettre à jour le graphique après chaque réponse
        },
        (error) => {
          if (error.status === 404) {
            console.warn(`Aucun client trouvé pour le mois ${month} de l'année ${this.currentYear}`);
            this.dataClient[month - 1] = 0;
            this.updateChart();
          } else {
            console.error('Erreur lors de la récupération des données :', error);
          }
        }
      );

      // Récupération des données des fournisseurs
      this.tiersService.getTiersByTypeAndMoisCreation('fournisseur', month, this.currentYear).subscribe(
        (data: any) => {
          if (data && data.length > 0) {
            this.dataFournisseur[month - 1] = data.length; // Remplir les données pour le mois correspondant
            this.nbFournisseurs += data.length;
          } else {
            this.dataFournisseur[month - 1] = 0; // Pas de fournisseurs pour ce mois
          }
          this.updateChart(); // Mettre à jour le graphique après chaque réponse
        },
        (error) => {
          if (error.status === 404) {
            console.warn(`Aucun fournisseur trouvé pour le mois ${month} de l'année ${this.currentYear}`);
            this.dataFournisseur[month - 1] = 0;
            this.updateChart();
          } else {
            console.error('Erreur lors de la récupération des données :', error);
          }
        }
      );

      // Récupère les soldes finaux pour le mois donné
      let monthSolde: string;
      if (month > 0 && month <= 9) {
        monthSolde = '0' + String(month);
      } else {
        monthSolde = String(month);
      }
      this.tabDeBordersService.getTabDeBordByMoisAnnee(monthSolde, this.currentYear).subscribe(
        (data: any) => {
          const dataArray = Array.isArray(data) ? data : [data];
          
          const totalSoldeFinal = dataArray.reduce((acc, curr) => acc + Number(curr.soldeFinal || 0), 0);
          this.dataSoldeFinal[month - 1] += totalSoldeFinal;
          this.createChart()
          console.log(this.dataSoldeFinal);
        },
        (error) => {
          console.error('Erreur lors de la récupération des données :', error);
        }
      );
      

    }
  }


  /**
   * Mise à jour du graphique avec les nouvelles données
   */
  private updateChart() {
    if (this.lineChart && this.lineChart.datasets) {
      this.lineChart.datasets[0].data = [...this.dataClient]; // Actualiser les données du graphique
    }

    // Mettre à jour les séries de données dans la structure de données
    this.data.sessionsByDevice.series = [
      this.nbClients,
      this.nbFournisseurs,
      this.nbBanques,
      this.nbSociete
    ];
  }

  /**
   * Options de configuration du graphique
   */
  private getChartOptions() {
    return {
      responsive: true,
      maintainAspectRatio: false,
      backgroundColor: false,
      hover: { mode: 'label' },
      tooltips: {
        shadowOffsetX: 1,
        shadowOffsetY: 1,
        shadowBlur: 8,
        shadowColor: this.tooltipShadow,
        backgroundColor: '#fff',
        titleFontColor: '#000',
        bodyFontColor: '#000'
      },
      scales: {
        xAxes: [
          {
            display: true,
            scaleLabel: { display: true },
            gridLines: {
              display: true,
              color: this.gridLineColor,
              zeroLineColor: this.gridLineColor
            },
            ticks: { fontColor: this.labelColor }
          }
        ],
        yAxes: [
          {
            display: true,
            scaleLabel: { display: true },
            ticks: {
              stepSize: 5,
              min: 0,
              max: 50,
              fontColor: this.labelColor
            },
            gridLines: {
              display: true,
              color: this.gridLineColor,
              zeroLineColor: this.gridLineColor
            }
          }
        ]
      },
      layout: {
        padding: {
          top: -15,
          bottom: -25,
          left: -15
        }
      },
      legend: {
        position: 'top',
        align: 'start',
        labels: {
          usePointStyle: true,
          padding: 25,
          boxWidth: 9
        }
      }
    };
  }

  // Déclaration de la propriété 'plugins'
  plugins = [
    {
      beforeInit(chart) {
        chart.legend.afterFit = function () {
          this.height += 20;
        };
      }
    }
  ];


  // Data for the chart

  data = {
    sessionsByDevice: {
      series: [this.nbClients, this.nbFournisseurs, this.nbBanques, this.nbSociete],
    }
  };

  // Chart options
  sessionChartoptions = {
    dataLabels: {
      enabled: true
    },
    legend: {
      position: 'bottom',
    },
    labels: ['Clients', 'Fournisseurs', 'Banques', 'Sociétés'],
    stroke: {
      width: 1,
      lineCap: 'round',
      colors: ['transparent', 'transparent', 'transparent', 'transparent']
    },
    colors: ['#9c8cfc', '#FF9F43', '#EA5455', '#00db89'],
    chart: {
      width: 320
    }
  };


  chart: Chart | undefined;
  createChart(): void {
    const ctx = document.getElementById('lineChart') as HTMLCanvasElement;
    this.chart = new Chart(ctx, {
      type: 'line', // Type de graphique en courbes
      data: {
        labels: [
          'Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin',
          'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'
        ],
        datasets: [{
          label: 'Solde final',
          data: this.dataSoldeFinal,
          backgroundColor: 'transparent', // couleur de fond 
          borderColor: 'rgba(75,192,192,1)', // couleur de la courbe
          borderWidth: 2,
          fill: true, // remplit l'aire sous la courbe
        }]
      },
      options: {
        responsive: true,
        scales: {
          yAxes: [{
            display: true,


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
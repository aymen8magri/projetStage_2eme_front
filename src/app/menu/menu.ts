import { CoreMenu } from '@core/types';

// Déclaration d'un menu vide, car il sera géré dynamiquement dans `MenuService`
export const menu: CoreMenu[] = [
  //home
  {
    id: 'home',
    title: 'Home',
    translate: 'MENU.HOME',
    type: 'item',
    icon: 'home',
    url: 'home'
  },
  //statistics
  {
    id: 'Statistics',
    title: 'Statistics',
    translate: 'Statistics',
    type: 'item',
    icon: 'activity',
    url: 'statistics'
  },
  // tresorerie
  {
    id: 'tresorerie',
    title: 'Trésorerie',
    translate: 'Trésorerie',
    type: 'section',
    children: [
      {
        id: 'tableau-de-bord',
        title: 'Tableau de Bord',
        translate: 'Tableau de Bord',
        type: 'item',
        url: 'tresorerie/tableau-de-bord',
        icon: 'bar-chart-2'
      },
      {
        id: 'situation-du-mois',
        title: 'Situation du Mois',
        translate: 'Situation du Mois',
        type: 'item',
        url: 'tresorerie/situation-du-mois',
        icon: 'calendar'
      }
    ]
  },
  // reglement
  {
    id: 'apps',
    type: 'section',
    title: 'Apps & Pages',
    translate: 'Réglements',
    icon: 'package',
    children: [
      {
        id: 'Payement_client',
        title: 'Payement Client',
        translate: 'Payement Client',
        type: 'collapsible',
        icon: 'user-check',
        children: [
          {
            id: 'client-list-Payement',
            title: 'Liste des Payement',
            translate: 'Liste des Payement',
            type: 'item',
            url: 'reglement/list-payement-client',
            icon: 'circle'
          },
          {
            id: 'client-Ajouter-Payement',
            title: 'Ajouter un Payement',
            translate: 'Ajouter un Payement',
            type: 'item',
            url: 'reglement/add-payement-client',
            icon: 'circle'
          }
        ]
      },
      {
        id: 'Payement_fournisseur',
        title: 'Payement Fournisseur',
        translate: 'Payement Fournisseur',
        type: 'collapsible',
        icon: 'user-check',
        children: [
          {
            id: 'fournisseur-list-Payement',
            title: 'Liste des Payement',
            translate: 'Liste des Payement',
            type: 'item',
            url: 'reglement/list-payement-fournisseur',
            icon: 'circle'
          },
          {
            id: 'fournisseur-Ajouter-Payement',
            title: 'Ajouter un Payement',
            translate: 'Ajouter un Payement',
            type: 'item',
            url: 'reglement/add-payement-fournisseur',
            icon: 'circle'
          }
        ]
      },
    ]
  },
  // gestion des entites
  {
    id: 'apps',
    type: 'section',
    title: 'Apps & Pages',
    translate: 'Gestion des Entités',
    icon: 'package',
    children: [
      {
        id: 'client',
        title: 'Ajouter Clients',
        translate: 'Client',
        type: 'collapsible',
        icon: 'user-plus',
        children: [
          {
            id: 'client-list',
            title: 'Liste des Clients',
            translate: 'Liste',
            type: 'item',
            url: 'gestion-des-entities/list-client',
            icon: 'circle'
          },
          {
            id: 'client-add',
            title: 'Ajouter un Client',
            translate: 'Ajouter',
            type: 'item',
            url: 'gestion-des-entities/add-client',
            icon: 'circle'
          }
        ]
      },
      {
        id: 'fournisseur',
        title: 'Ajouter Fournisseur',
        translate: 'Fournisseur',
        type: 'collapsible',
        icon: 'user-plus',
        children: [
          {
            id: 'fournisseur-list',
            title: 'Liste des Fournisseurs',
            translate: 'Liste',
            type: 'item',
            url: 'gestion-des-entities/list-fournisseur',
            icon: 'circle'
          },
          {
            id: 'fournisseur-add',
            title: 'Ajouter un fournisseur',
            translate: 'Ajouter',
            type: 'item',
            url: 'gestion-des-entities/add-fournisseur',
            icon: 'circle'
          }
        ]
      },
      {
        id: 'mode-de-paiement',
        title: 'Mode de Paiement',
        translate: 'Mode de Paiement',
        type: 'collapsible',
        icon: 'credit-card',
        children: [
          {
            id: 'mode-de-paiement-list',
            title: 'Liste des modes de payement',
            translate: 'Liste',
            type: 'item',
            url: 'gestion-des-entities/list-mode-de-payement',
            icon: 'circle'
          },
          {
            id: 'mode-de-paiement-add',
            title: 'Ajouter un mode de paiement',
            translate: 'Ajouter',
            type: 'item',
            url: 'gestion-des-entities/add-mode-de-payement',
            icon: 'circle'
          }
        ]
      },
      {
        id: 'region',
        title: 'Ajouter Région',
        translate: 'Région',
        type: 'collapsible',
        icon: 'map-pin',
        children: [
          {
            id: 'region-list',
            title: 'Liste des region',
            translate: 'Liste',
            type: 'item',
            url: 'gestion-des-entities/list-regions',
            icon: 'circle'
          },
          {
            id: 'region-add',
            title: 'Ajouter un region',
            translate: 'Ajouter',
            type: 'item',
            url: 'gestion-des-entities/add-regions',
            icon: 'circle'
          }
        ]
      },
      {
        id: 'banque',
        title: 'Ajouter Banque',
        translate: 'Banque',
        type: 'collapsible',
        icon: 'home',
        children: [
          {
            id: 'banque-list',
            title: 'Liste des banque',
            translate: 'Liste',
            type: 'item',
            url: 'gestion-des-entities/list-banques',
            icon: 'circle'
          },
          {
            id: 'banque-add',
            title: 'Ajouter un banque',
            translate: 'Ajouter',
            type: 'item',
            url: 'gestion-des-entities/add-banques',
            icon: 'circle'
          }
        ]
      },
      {
        id: 'societe',
        title: 'Ajouter Société',
        translate: 'Société',
        type: 'collapsible',
        icon: 'briefcase',
        children: [
          {
            id: 'societe-list',
            title: 'Liste des societe',
            translate: 'Liste',
            type: 'item',
            url: 'gestion-des-entities/list-societe',
            icon: 'circle'
          },
          {
            id: 'societe-add',
            title: 'Ajouter un societe',
            translate: 'Ajouter',
            type: 'item',
            url: 'gestion-des-entities/add-societe',
            icon: 'circle'
          }
        ]
      },
    ]
  },

];
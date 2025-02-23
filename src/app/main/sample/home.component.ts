import { Component, inject, OnInit } from '@angular/core'
import { UserService } from 'app/auth/service'
interface BreadcrumbLink {
  name: string;
  isLink: boolean;
  link?: string;
}

interface ContentHeader {
  headerTitle: string;
  actionButton: boolean;
  breadcrumb: {
    type: string;
    links: BreadcrumbLink[];
  };
}
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  constructor() { }

  public contentHeader: ContentHeader;  // ✅ Typage correct

  readonly userService: UserService = inject(UserService);

  user: any
  ngOnInit() {
    this.userService.getUserById(this.userService.getUserIdFromToken()).subscribe(user => { this.user = user; });
    this.contentHeader = {
      headerTitle: 'Home',
      actionButton: true,
      breadcrumb: {
        type: '',
        links: [
          {
            name: 'Home',
            isLink: false
          }
        ]
      }
    };

    // Vérifier si l'utilisateur est connecté avant d'ajouter "Statistics"
    if (this.userService.isLoggedIn()) {
      this.contentHeader.breadcrumb.links.push({
        name: 'Statistics',
        isLink: true,
        link: '/statistics'
      });
    }
  }
}


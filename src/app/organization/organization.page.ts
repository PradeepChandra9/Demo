import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonSearchbar, IonList, IonItem, IonLabel, IonFooter, IonButton, IonButtons, IonBackButton } from '@ionic/angular/standalone';
import { Router } from '@angular/router';
import { ApiService } from '../service/api.service';

@Component({
  selector: 'app-organization',
  templateUrl: './organization.page.html',
  styleUrls: ['./organization.page.scss'],
  standalone: true,
  imports: [IonBackButton, IonButtons, IonButton, IonFooter, IonLabel, IonItem, IonList, IonSearchbar, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class OrganizationPage implements OnInit {
  organizations: any[] = [];
  OrganizationList: any[] = [];
  searchQuery: string = '';
  selectedOrganization: string = '';
  DEFAULT_INV_ORG_NAME: string='';

  constructor(private apiService: ApiService, private router: Router) { }

  ngOnInit() {
    this.fetchOrganizations();
  }

  fetchOrganizations() {
    this.apiService.getOrganizations(this.DEFAULT_INV_ORG_NAME).subscribe((data: any) => {
      this.organizations = data;
      this.OrganizationList = data;
    },
      (error: any) => {
        console.error('error fetching organizations', error);
      }
    );
  }


  onSearch(){
    this.OrganizationList = this.organizations.filter((org) =>
    org.name.toLowerCase().includes(this.searchQuery.toLowerCase())
    );
  }
  selectOrganization(org: string) {
    this.selectedOrganization = org;
  }
  confirmselection() {
    if (this.selectedOrganization) {
      console.log('selected organization:', this.selectedOrganization);
      // this.router.navigate(['/activity']);
    }
  }

}

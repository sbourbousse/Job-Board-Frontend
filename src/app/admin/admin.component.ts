import { Component, OnInit } from '@angular/core';
import { AjaxResponse } from '../models/ajaxResponse.model';
import { AdminService } from '../services/admin.service';
import { User } from '../models/user.model';
import { Information } from '../models/information.model';
import { Entreprise } from '../models/entreprise.model';
import { Job } from '../models/job.model';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  constructor( private adminService : AdminService) { }
  dataToDisplay;
  displayDataTable;
  objectsType;

  ngOnInit(): void {
    this.displayDataTable = false;
  }

  displayPersonnes() {
    
    this.adminService.getUsers().subscribe((resp: AjaxResponse<any[]>) => {
      if (resp.success) {
        this.dataToDisplay = resp.data;
        this.displayDataTable = true;

        this.objectsType = "personnes";
      }
    })
  }

  displayAnnonces() {
    this.adminService.getAnnonces().subscribe((resp: AjaxResponse<any[]>) => {
      if (resp.success) {
        //Traiter l'objet utilisateur
        this.dataToDisplay = resp.data;
        this.displayDataTable = true;

        this.objectsType = "annonces";
      }
  });
  }

  displayEntreprises() {
    this.adminService.getEntreprises().subscribe((resp: AjaxResponse<any[]>) => {
      if (resp.success) {
        //Traiter l'objet utilisateur
        this.dataToDisplay = resp.data;
        this.displayDataTable = true;

        this.objectsType = "entreprises";
      }
  });
}

  displayInformations() {
    this.adminService.getInformations().subscribe((resp: AjaxResponse<any[]>) => {
      if (resp.success) {
        //Traiter l'objet utilisateur
        this.dataToDisplay = resp.data;
        this.displayDataTable = true;

        this.objectsType = "informations";
      }
    })
  }


  goToMenu() {
    this.displayDataTable = false;
  }

}


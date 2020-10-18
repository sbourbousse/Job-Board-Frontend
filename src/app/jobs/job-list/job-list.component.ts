import { Component, OnInit } from '@angular/core';
import { Job } from '../../models/job.model';
import { JobsService } from '../../services/jobs.service';
import { AjaxResponse } from '../../models/ajaxResponse.model';

@Component({
  selector: 'app-job-list',
  templateUrl: './job-list.component.html',
  styleUrls: ['./job-list.component.scss']
})
export class JobListComponent implements OnInit {

  constructor(private jobsService : JobsService) { }

  jobList : Job[]; //Tableau d'annonces à afficher
  errorMessage: string;

  ngOnInit(): void {
    this.errorMessage = "Chargement des annonces";
    //Remplir le tableau d'annonce
    this.getJobs();
  }

  //Récupérer et afficher les annonces ou un message d'erreur
  getJobs () {
    this.jobsService.getJobs().subscribe((resp: AjaxResponse<any[]>) => {
      if(resp.success) { //Next
        if(resp.data.length > 0){
          this.errorMessage = null;
          this.jobList = this.jobsService.responseToJobs(resp.data);
        }
        else {
          this.errorMessage = "Aucun résultat";
        }
      } else { //Error
        this.errorMessage = resp.errorMessage;
      }
    },
    () => {
      this.errorMessage ="Une erreur s'est produite, veuillez réessayer plus tard";
    });
  }
}

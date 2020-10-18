import { Component, OnInit } from '@angular/core';
import { Job } from 'src/app/models/job.model';
import { AjaxResponse } from 'src/app/models/ajaxResponse.model';
import { JobsService } from '../../services/jobs.service';
import { ActivatedRoute } from '@angular/router'

@Component({
  selector: 'app-job-detail',
  templateUrl: './job-detail.component.html',
  styleUrls: ['./job-detail.component.scss']
})
export class JobDetailComponent implements OnInit {

  constructor(private jobsService : JobsService, private route : ActivatedRoute ) { }
  
  //Eviter erreur - cannot read proprety 'titre" of undefined
  jobInfo: Job = {
    idAnnonce : 1,
    titre : "",
    contenu : "",
    date : new Date(),
    salaire : 0,
    tauxHoraire : 0,
    place : "",
    entreprise : {
        nom : "",
        ville : "",
        codePostal : "",
        rue : "",
        site : "",
        siret : ""
    }
  };

  errorMessage;

  ngOnInit(): void {
    //Remplir l'objet jobInfo
    this.getJobInfo();
  }


  getJobInfo() {
    this.jobsService.getSingleJob(this.route.snapshot.params.id).subscribe((resp: AjaxResponse<any>) => {
      if(resp.success) {
        if(resp.data){
          this.jobInfo = this.jobsService.responseToJob(resp.data);
        }
        else {
          this.errorMessage = "Annonce introuvable";
        }
      } else {
        this.errorMessage = resp.errorMessage;
      }
    },
    () => {
      this.errorMessage ='Une erreur est survenue';
    });
  }
}

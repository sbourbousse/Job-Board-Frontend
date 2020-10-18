import { Component, OnInit, Input } from '@angular/core';
import { Job } from '../../../models/job.model';

@Component({
  selector: 'app-job-card',
  template: `
    <mat-card>
      <mat-card-title>{{ jobDetail.titre }}</mat-card-title>
      <mat-card-subtitle>{{ jobDetail.entreprise.nom }}</mat-card-subtitle>
      <mat-card-content> {{ jobDetail.contenu }}</mat-card-content>  
      <mat-card-subtitle>{{ jobDetail.date | date}}</mat-card-subtitle>
      <mat-list role="list" class="list-horizontal">
        <mat-list-item role="listitem"><button mat-fab color="primary" routerLink="/jobs/{{jobDetail.idAnnonce}}"><mat-icon aria-label="Info">info</mat-icon></button></mat-list-item>
        <mat-list-item role="listitem"><mat-icon aria-label="Info">euro</mat-icon>{{jobDetail.salaire}}</mat-list-item>
        <mat-list-item role="listitem"><mat-icon aria-label="Info">watch_later</mat-icon>{{jobDetail.tauxHoraire}}h</mat-list-item>
        <mat-list-item role="listitem"><mat-icon aria-label="Info">apartment</mat-icon>{{jobDetail.place}}</mat-list-item>
      </mat-list>
    </mat-card>
  `,
  styles: [
    `
    mat-list {
      display: flex;
    }

    mat-card {
      margin-bottom: 15px;
    }

    .list-horizontal {
      height:70px;
      overflow-y : scroll;
    }
    `
  ]
})
export class JobCardComponent implements OnInit {

  constructor() { }
  ngOnInit(): void {
  }

  @Input() jobDetail: Job;


}

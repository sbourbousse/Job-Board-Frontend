import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { Job } from '../models/job.model';
import { AjaxResponse } from '../models/ajaxResponse.model'
import { environment } from '../../environments/environment';
import { Information } from '../models/information.model';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class JobsService {

  constructor(private httpClient : HttpClient) { }
  headers = new HttpHeaders({'Content-Type':'application/json; charset=utf-8'});

  /*
  * Récuère une liste d'annonce
  */
  getJobs () : Observable<AjaxResponse<any[]>> {
    let response = this.httpClient.get<AjaxResponse<any[]>>(environment.apiUrl+'jobs/', {headers : this.headers} );

    return response;
  } 

  /*
  * Récupère une seul annonce
  * @param id : identifiant unique de l'annonce
  */
  getSingleJob(id) {
    let response = this.httpClient.get<AjaxResponse<any>>(environment.apiUrl+'jobs/'+id, {headers : this.headers} );

    return response;
  }

  /*
  * Créer un utilisateur (non complet) avec les queqlues informations demandés dans le formulaire de candidature des utilisateurs non connectés
  * @param user : un utilisateur (objet) au format {{nom : lenom, prenom : leprenom, mail : lemail, telephone : leTelephone}}
  */
  createUser(user) {
    let response = this.httpClient.post<AjaxResponse<any>>(environment.apiUrl+'user/', user, {headers : this.headers});

    return response;
  }

  /*
  * Envoie une candidature pour une offre d'emploi
  * @param application : (id de la personne, id de l'annonce, message, date : null <- car généré côté serveur) 
  */
  applyToJob( application : any ) {
    let response = this.httpClient.post<AjaxResponse<any>>(environment.apiUrl+"apply/", application, {headers: this.headers});

    return response;
  }


  /*
  * Convertie les données envoyé par l'api au format de l'interface. Pour récupérer une collection d'annonce
  * @param jobs : une collection d'annonce (tableau d'objet) envoyé par l'API
  */
  responseToJobs( jobs : any) : Job[] {
    let response : Job[] = [];
    jobs.forEach(element => {
      response.push({
        idAnnonce : element.idAnnonce,
        titre : element.titre,
        contenu : element.contenue,
        date : element.date,
        salaire : element.salaire,
        tauxHoraire : element.tauxHoraire,
        place : element.place,
        entreprise : {
          nom : element.nom,
          ville : element.ville,
          codePostal : element.codePostal,
          rue : element.rue,
          site : element.site,
          siret : element.siret
        }
      });
    })
    return response;
  }

   /*
  * Convertie les données envoyé par l'api au format de l'interface. Pour récupérer une seul annonce
  * @param job : une annonce (objet) envoyé par l'API
  */
  responseToJob( job : any) : Job {
    return {
      idAnnonce : job.idAnnonce,
      titre : job.titre,
      contenu : job.contenue,
      date : job.date,
      salaire : job.salaire,
      tauxHoraire : job.tauxHoraire,
      place : job.place,
      entreprise : {
        nom : job.nom,
        ville : job.ville,
        codePostal : job.codePostal,
        rue : job.rue,
        site : job.site,
        siret : job.siret
      }
    }
  }

  /*
  * Convertie objet de l'interface User en objet qui respecte les champs requis par l'API
  * @param job : un objet utilisateur de type User
  */
  userToCreateUserRequest (user : User) : any {
    return {
      "nom" : user.nom,
      "prenom" : user.prenom,
      "mail" : user.mail
    };
  }

  /*
  * Convertie objet de l'interface Information en objet qui respecte les champs requis par l'API
  * @param information : un objet information de type Information
  */
  informationToApplyRequest (information : Information) : any {
    return {
      "idPersonne" : information.utilisateur.idPersonne,
      "idAnnonce" : information.idAnnonce,
      "mail" : information.utilisateur.mail,
      "message" : information.message
    };
  }
}

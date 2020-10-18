import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { AjaxResponse } from '../models/ajaxResponse.model';
import { User } from '../models/user.model';
import { Information } from '../models/information.model';
import { Job } from '../models/job.model';
import { Entreprise } from '../models/entreprise.model';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private httpClient : HttpClient) { }

  headers = new HttpHeaders({'Content-Type':'application/json; charset=utf-8'});

  getUsers() {
    let response = this.httpClient.get<AjaxResponse<any[]>>(environment.apiUrl+'panel/Personnes', {headers : this.headers});

    return response;
  }

  getInformations() {
    let response = this.httpClient.get<AjaxResponse<any[]>>(environment.apiUrl+'panel/Informations', {headers : this.headers});

    return response;
  }

  getEntreprises() {
    let response = this.httpClient.get<AjaxResponse<any[]>>(environment.apiUrl+'panel/Entreprises', {headers : this.headers});

    return response;
  }

  getAnnonces() {
    let response = this.httpClient.get<AjaxResponse<any[]>>(environment.apiUrl+'panel/Annonces', {headers : this.headers});

    return response;
  }

  updateUsers(users) {
    let response = this.httpClient.put<AjaxResponse<User[]>>(environment.apiUrl+'panel/users', users, {headers : this.headers});
    
    return response
  }

  updateInformations(informations) {
    let response = this.httpClient.put<AjaxResponse<Information[]>>(environment.apiUrl+'panel/informations', informations, {headers : this.headers});
    
    return response
  }
  
  updateEntreprises(entreprises) {
    let response = this.httpClient.put<AjaxResponse<Entreprise[]>>(environment.apiUrl+'panel/entreprises', entreprises, {headers : this.headers});
    
    return response
  }

  updateAnnonces(annonces) {
    let response = this.httpClient.put<AjaxResponse<User[]>>(environment.apiUrl+'panel/annonces', annonces, {headers : this.headers});
    
    return response
  }
}

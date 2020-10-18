import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError, BehaviorSubject } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { BaseUser } from '../models/baseUser.model';
import { AjaxResponse } from '../models/ajaxResponse.model';
import { User } from '../models/user.model';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private httpClient: HttpClient) { }

  headers = new HttpHeaders({'Content-Type':'application/json; charset=utf-8'});
  private isAuthSource = new BehaviorSubject<boolean>(localStorage.getItem("idPersonne") != null || localStorage.getItem("idPersonne") != undefined);
  isAuth = this.isAuthSource.asObservable();
  private isAdminSource = new BehaviorSubject<boolean>(localStorage.getItem("administrateur") == "1");
  isAdmin = this.isAdminSource.asObservable();

  /*
  * Envoie un utilisateur pour connexion
  * @param objets avec données nécéssaire à la connexion (identifiant, motDePasse)
  */
  logUser(user: any) {
    let response = this.httpClient.post<AjaxResponse<any>>(environment.apiUrl+'login/', user, {headers: this.headers});

    return response;
  }

  registerUser(user: any) {
    let response = this.httpClient.post<AjaxResponse<any>>(environment.apiUrl+'signup/', user, {headers: this.headers});

    return response;
  }

  editUser(user: User) {
    let response = this.httpClient.put<AjaxResponse<User>>(environment.apiUrl+'user/', user, {headers: this.headers});

    return response;
  }

  setAuthFalse(): void {
    this.isAuthSource.next(false);
    this.isAdminSource.next(false);
  }

  setAuthTrue(): void {
    this.isAuthSource.next(true);
    //Vérifier si l'utilisateur est admin
    if(localStorage.getItem("administrateur") == "1") {
      this.isAdminSource.next(true);
    } else {
      this.isAdminSource.next(false);
    }
  }

  getUser() : User {
    const user: User = {
      identifiant : localStorage.getItem("identifiant"),
      motDePasse : null,
      idPersonne : parseInt(localStorage.getItem("idPersonne")),
      entreprise : null, //TODO en cas d'utilisateur lié avec une entreprise
      nom : localStorage.getItem("nom"),
      prenom : localStorage.getItem("prenom"),
      telephone : localStorage.getItem("telephone"),
      mail : localStorage.getItem("mail"),
      sexe : localStorage.getItem("sexe")
    }
    return user;
  }

  saveUserInLocalStorage( user: User) {
    for (var key in user ){
      if (user.hasOwnProperty(key) && key!="token") {
          localStorage.setItem(key,user[key]);
          console.log(key+" "+user[key]);
      } else if (key == "token"){
        document.cookie = `token=${user[key]}`
      }
    } 
  }

  logOutUser() {
    localStorage.clear();
    this.setAuthFalse();
  }

  /*
  * Convertie objet de l'interface baseUser en objet qui respecte les champs requis par l'API
  * @param user : un utilisateur user de type BaseUser
  */
 userToLoginObject(user : BaseUser) : any{
  return {
    "identifiant" : user.identifiant,
    "motDePasse" : user.motDePasse
  }
 }

  /*
  * Convertie objet de l'interface baseUser en objet qui respecte les champs requis par l'API
  * @param user : un utilisateur user de type BaseUser
  */
 userToRegisterObject(user : User) : any{
  return {
    "identifiant" : user.identifiant,
    "motDePasse" : user.motDePasse,
    "nom" : user.nom,
    "prenom" : user.prenom,
    "mail" : user.mail,
    "telephone" : user.telephone,
    "sexe" : user.sexe
  }
 }

}

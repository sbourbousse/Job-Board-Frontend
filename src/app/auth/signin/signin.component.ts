import { Component, OnInit } from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import { BaseUser } from '../../models/baseUser.model';
import { User } from '../../models/user.model';
import { AuthService } from '../../services/auth.service';
import { AjaxResponse } from '../../models/ajaxResponse.model';
import {Md5} from 'ts-md5/dist/md5';
import { Router, ActivatedRoute } from '@angular/router'



@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {

  constructor(private authService: AuthService, private router: Router, private activatedRoute : ActivatedRoute) { }
  ngOnInit(): void {
  }

  //TODO Pattern de validation
  pseudo = new FormControl('', [Validators.required]);
  password = new FormControl ('', [Validators.required, Validators.maxLength(32), Validators.minLength(8)]);
  hide = true;
  errorMessage = "";

  getIdentifiantErrorMessage() {
    if (this.pseudo.hasError('required')) {
      return 'Vous devez rentrez un Identifiant';
    }
    return this.pseudo.hasError('identifiant') ? 'Identifiant invalide' : '';
  }

  getMotDePasseErrorMessage() {
    if (this.password.hasError('required')) {
      return 'Vous devez rentrez un mot de passe';
    }
    return this.password.hasError('password') ? 'Mot de passe invalide' : '';
  }

  connect() {
    if(this.password.invalid || this.pseudo.invalid) {
      //Les champs sont mal remplies
      this.errorMessage = "Veuillir remplir correctement les champs";
      console.log("field error");
    } else {
      //Créer l'objet utilisateur
      const userToConnect: BaseUser = {
        identifiant: this.pseudo.value,
        motDePasse: Md5.hashAsciiStr(this.password.value).toString()
      };

      console.log(this.authService.userToLoginObject(userToConnect));

      //Envoie de l'utilisateur à l'API
      this.authService.logUser(this.authService.userToLoginObject(userToConnect)).subscribe(
        (resp: AjaxResponse<any>) => { // Dans tout les cas
        console.log(resp);
        //La réponse est valide selon mon protocol
        if(resp.success) {
          this.authService.saveUserInLocalStorage(resp.data);
          //Reinitialiser le message d'erreur
          this.errorMessage = "";
          //Passer l'etat connexion à VRAI dans le service Auth
          this.authService.setAuthTrue();
          //Renvoyer à l'accueil
          this.router.navigate(['/']);
        } else { //La réponse renvoie une erreur
          this.errorMessage = resp.errorMessage;
        }
      },
      () => { // En cas d'autre erreur (ex : L'API ne renvoie pas les données)
        this.errorMessage = "Une erreur est survenue";
      })
    }
  }

}

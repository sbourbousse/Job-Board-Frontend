import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AuthService } from '../../services/auth.service';
import { JobsService } from '../../services/jobs.service';
import { Information } from '../../models/information.model';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../../models/user.model';
import { AjaxResponse } from '../../models/ajaxResponse.model';
import { MatSnackBar } from '@angular/material/snack-bar';



@Component({
  selector: 'app-apply',
  templateUrl: './apply.component.html',
  styleUrls: ['./apply.component.scss']
})
export class ApplyComponent implements OnInit {

  constructor(
    private formBuilder : FormBuilder,
    private authService : AuthService,
    private jobsService : JobsService,
    private route : ActivatedRoute,
    private _snackBar: MatSnackBar,
    private router : Router
    ) { }
  
  applyForm: FormGroup;
  isAuth;

  ngOnInit(): void {
    //L'utilisateur est il connecté
    this.authService.isAuth.subscribe(isAuth => (this.isAuth = isAuth));
    this.initForm();
    this.errorMessage = "";
  } 

  firstName;
  lastName;
  email;
  message;
  errorMessage;

  //Initialiser le formulaire
  initForm(): void {
    this.applyForm = this.formBuilder.group({
      firstName: [
        "",
        [Validators.required, Validators.minLength(3), Validators.maxLength(30)]
      ],
      lastName: [
        "",
        [Validators.required, Validators.minLength(3), Validators.maxLength(30)]
      ],
      email: [
        "",
        [Validators.required, Validators.email]
      ],
      message: [
        "",
        [Validators.required, Validators.minLength(20)]
      ]
    });

    this.lastName = this.applyForm.get("lastName");
    this.firstName = this.applyForm.get("firstName");
    this.email = this.applyForm.get("email");
    this.message = this.applyForm.get("message");

    //Si l'utilisateur est connecté, prérentrer ses informations depuis localstorage et les rendre non modifiable
    if(this.isAuth) {
      this.lastName.value = localStorage.getItem("nom");
      this.firstName.value = localStorage.getItem("prenom");
      this.email.value = localStorage.getItem("mail");
      this.lastName.disable();
      this.firstName.disable();
      this.email.disable();
    }
  }

  //Appui sur le bouton Envoyer
  apply() {
    //Si les champs respectent les validateurs
    if(this.applyForm.valid) {
      let user: User;
      let success = true;
      //Si l'utilisateur est connecté
      if(this.isAuth) {
         user  = this.authService.getUser();
      } else { //Si l'utilisateur n'est pas connecté
        //Créer un utilisateur avec les 3 champs
         user  = {
          identifiant: null,
          motDePasse: null,
          idPersonne: null,
          entreprise: null,
          nom : this.lastName.value,
          prenom : this.firstName.value,
          telephone : null,
          mail : this.email.value,
          sexe : null
        };
      }

      const information: Information = {
        utilisateur : user,
        idAnnonce : parseInt(this.route.snapshot.params.id),
        message : this.message.value,
        date : null
      };

      if(!this.isAuth) {
        this.jobsService.createUser(this.jobsService.userToCreateUserRequest(user)).subscribe((resp : AjaxResponse<any>) => {

          if (!resp.success) { //erreur lors de la création
            this.openSnackBar(resp.errorMessage);

          } else { //Création réussi
            //Envoyer informations
            this.sendInformation(information);
          }
        }, () => { //erreur de connexion au serveur
          this.openSnackBar("Une erreur s'est produite lors de l'inscription de vos données personnels");
        })
      } else {
        this.sendInformation(information);
      }
    }
    else {
    alert("Les champs ne sont pas correctement remplis")
    }
  }

  sendInformation(information) {
    this.jobsService.applyToJob(this.jobsService.informationToApplyRequest(information)).subscribe((resp : AjaxResponse<any>) => {
      if(resp.success) {
        this.openSnackBar('Votre candidature a bien été envoyé 🎉');
        this.errorMessage = "";
        setTimeout(() => {
          this.router.navigate(['/'])
        }, 3000)
      } else {
        this.errorMessage = resp.errorMessage;
      }
    }, () => {
      this.errorMessage = "Une erreur serveur est survenu";
    })
  }

  openSnackBar(message) {
    this._snackBar.open(message, '',  {
      duration: 3000,
      horizontalPosition: 'center',
      verticalPosition: 'top',
    });
  }

}

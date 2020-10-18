import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AjaxResponse } from 'src/app/models/ajaxResponse.model';
import { User } from '../../models/user.model';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {


  constructor(
    private formBuilder : FormBuilder, 
    private authService: AuthService,
    private router: Router,
    private _snackBar: MatSnackBar
  ) { }

  editForm: FormGroup;
  user: User;
  // Champs du formlaire
  firstName;
  lastName;
  phone;
  pseudo;
  password;
  email;
  sex;

  errorMessage;

  ngOnInit(): void {
    this.user = this.authService.getUser();
    //Initialiser le formulaire
    this.initForm();
  }


  initForm(): void {
    //Récupérer mes infos d'utilisateur connecté
    
    this.editForm = this.formBuilder.group({
      firstName: [
        this.user.prenom,
        [Validators.required, Validators.minLength(3), Validators.maxLength(30)]
      ],
      lastName: [
        this.user.nom,
        [Validators.required, Validators.minLength(3), Validators.maxLength(30)]
      ],
      phone: [
        this.user.telephone,
        [
          Validators.required,
          Validators.minLength(10),
          Validators.maxLength(10)
        ]
      ],
      pseudo: [
        this.user.identifiant,
        [Validators.required, Validators.minLength(3), Validators.maxLength(50)]
      ],
      password: [
        this.user.motDePasse,
        [Validators.required, Validators.minLength(3), Validators.maxLength(32)]
      ],
      email: [
        this.user.mail,
        [Validators.required, Validators.email]
      ],
      sex: [
        this.user.sexe
      ]
    });

    this.lastName = this.editForm.get("lastName");
    this.firstName = this.editForm.get("firstName");
    this.phone = this.editForm.get("phone");
    this.pseudo = this.editForm.get("pseudo");
    this.password = this.editForm.get("password");
    this.email = this.editForm.get("email");
    this.sex = this.editForm.get("sex");
  }

  signup() {
    if(this.editForm.invalid) {
      alert("Un ou plusieurs champs sont mal remplis");
    } else {
      console.log(this.editForm);
      const editedUser: User = {
        identifiant: this.pseudo.value,
        motDePasse: this.password.value,
        idPersonne: this.authService.getUser().idPersonne,
        entreprise: null,
        nom: this.lastName.value,
        prenom: this.firstName.value,
        telephone: this.phone.value,
        mail: this.email.value,
        sexe: this.sex.value
      }
      console.log(editedUser);
      this.authService.editUser(editedUser).subscribe((resp: AjaxResponse<any>) => {
        console.log(resp);
        if(resp.success) {
          this.errorMessage = "";
          this.openSnackBar();
          this.authService.saveUserInLocalStorage(editedUser);
          setTimeout(() => {
            this.router.navigate(['/']);
          }, 3000);
        } else {
          this.errorMessage = resp.errorMessage;
        }
      }, () => {
        this.errorMessage = "Une erreur serveur est survenu"
      })
    }
  }

  openSnackBar() {
    this._snackBar.open('Les modifications ont bien été pris en compte 🔧', '',  {
      duration: 3000,
      horizontalPosition: 'center',
      verticalPosition: 'top',
    });
  }


}

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AjaxResponse } from 'src/app/models/ajaxResponse.model';
import { User } from '../../models/user.model';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import {Md5} from 'ts-md5/dist/md5';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  constructor(
    private formBuilder : FormBuilder, 
    private authService: AuthService,
    private router: Router,
    private _snackBar: MatSnackBar
  ) { }
  
  errorMessage: string;
  signupForm: FormGroup;
  // Champs du formlaire
  firstName;
  lastName;
  phone;
  pseudo;
  password;
  email;
  sex;

  ngOnInit(): void {
    //Initialiser le formulaire
    this.initForm();
  }


  initForm(): void {
    this.signupForm = this.formBuilder.group({
      firstName: [
        "",
        [Validators.required, Validators.minLength(3), Validators.maxLength(30)]
      ],
      lastName: [
        "",
        [Validators.required, Validators.minLength(3), Validators.maxLength(30)]
      ],
      phone: [
        "",
        [
          Validators.required,
          Validators.minLength(10),
          Validators.maxLength(10)
        ]
      ],
      pseudo: [
        "",
        [Validators.required, Validators.minLength(3), Validators.maxLength(50)]
      ],
      password: [
        "",
        [Validators.required, Validators.minLength(3), Validators.maxLength(32)]
      ],
      email: [
        "",
        [Validators.required, Validators.email]
      ],
      sex: [
        [Validators.required]
      ]
    });

    this.lastName = this.signupForm.get("lastName");
    this.firstName = this.signupForm.get("firstName");
    this.phone = this.signupForm.get("phone");
    this.pseudo = this.signupForm.get("pseudo");
    this.password = this.signupForm.get("password");
    this.email = this.signupForm.get("email");
    this.sex = this.signupForm.get("sex");
  }

  signup() {
    if(this.signupForm.invalid) {
      alert("Un ou plusieurs champs sont mal remplis");
    } else {
      console.log(this.signupForm);
      const userToRegister: User = {
        identifiant: this.pseudo.value,
        motDePasse: Md5.hashAsciiStr(this.password.value).toString(),
        idPersonne: null, //L'identifiant est généré server-side
        entreprise: null, //L'inscription concerne un utilisateur associé à aucune entreprise
        nom: this.firstName.value,
        prenom: this.lastName.value,
        telephone: this.phone.value,
        mail: this.email.value,
        sexe: this.sex.value
      }
      this.authService.registerUser(this.authService.userToRegisterObject(userToRegister)).subscribe((resp: AjaxResponse<any>) => {
        if(resp.success) {
          this.openSnackBar();
          setTimeout(() => {
            this.router.navigate(['/signin']);
          }, 3000);
          this.errorMessage = "";
        } else {
          this.errorMessage = resp.errorMessage;
        }
      }, () => {
        this.errorMessage = "Une erreur s'est produite, veuillez réessayer plus tard";
      });
    }
  }

  openSnackBar() {
    this._snackBar.open('Felicitation, vous êtes inscrit 🎉', '',  {
      duration: 3000,
      horizontalPosition: 'center',
      verticalPosition: 'top',
    });
  }

}

import { Router } from '@angular/router';
import ValidateForm from 'src/app/helpers/validateform';
import { AuthService } from './../../services/auth.service';

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css']
})
export class UserLoginComponent implements OnInit {
  public loginForm!: FormGroup;
  type: string = 'Password';
  isText: boolean = false;
  eyeIcon: string = 'fa-eye-slash';

   constructor(private fb: FormBuilder,private router: Router, private auth: AuthService,) {
    this.loginForm = this.fb.group({
      Email: ['', Validators.required],
      Password: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.loginForm = this.fb.group({
      Email: ['', Validators.required],
      Password: ['', Validators.required],
    });
  }

  hideShowPass() {
    this.isText = !this.isText;
    this.isText ? (this.eyeIcon = 'fa-eye') : (this.eyeIcon = 'fa-eye-slash');
    this.isText ? (this.type = 'text') : (this.type = 'Password');
  }

  // Fonction pour vérifier si tous les champs requis sont remplis
  areAllFieldsFilled(): boolean {
    const EmailControl = this.loginForm.get('Email');
    const PasswordControl = this.loginForm.get('Password');

    return (
      this.loginForm.valid &&
      EmailControl !== null && PasswordControl !== null &&
      EmailControl.value !== '' &&
      PasswordControl.value !== ''
    );
  }



onLogin() {
  if (this.loginForm.valid) {
    console.log(this.loginForm.value)
    this.auth.login(this.loginForm.value)
    .subscribe({
      next: (res) => {
        //alert(res.message)
     
           this.loginForm.reset();
   
           this.router.navigate(['userPage'])
      },
      error: (err) => {
       alert(err?.error.message)
        this.loginForm.reset();

        // console.log(err);
      }
    })
  } else {
    ValidateForm.validateAllFormFields(this.loginForm);
  }
}




  


}

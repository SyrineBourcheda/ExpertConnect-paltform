
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import ValidateForm from 'src/app/helpers/validateform';
import { AuthService } from './../../services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})

export class SignupComponent implements OnInit {

  

  public signUpForm!: FormGroup;
  type: string = 'Password';
  isText: boolean = false;
  eyeIcon:string = "fa-eye-slash"


  
  constructor(private fb : FormBuilder,  private router: Router, private auth: AuthService) { 
  
    this.signUpForm = this.fb.group({
      Name: ['', Validators.required],
      Email: ['', Validators.required],
      Password: ['', Validators.required],
      CompanyName: ['', Validators.required],
      Bio: [''],
      PhoneNumber: [''],
      LinkedinProfile: [''],
      FacebookProfile: ['']
    });
  }
  ngOnInit() {
    this.signUpForm = this.fb.group({
      Name:['', Validators.required],
      Email:['', Validators.required],
      Password:['', Validators.required],
      CompanyName: ['', Validators.required],
      Bio: [''],
      PhoneNumber: [''],
      LinkedinProfile: [''],
      FacebookProfile: ['']
    })
  }

  hideShowPass(){
    this.isText = !this.isText;
    this.isText ? this.eyeIcon = 'fa-eye' : this.eyeIcon = 'fa-eye-slash'
    this.isText ? this.type = 'text' : this.type = 'Password'
  }

  // Fonction pour vérifier si tous les champs requis sont remplis
  areAllFieldsFilled(): boolean {
    const NameControl = this.signUpForm.get('Name');
    const EmailControl = this.signUpForm.get('Email');
    const PasswordControl = this.signUpForm.get('Password');
    const CompanyNameControl = this.signUpForm.get('Bio');
  
  
    return (
      this.signUpForm.valid &&
      NameControl !== null && EmailControl !== null && PasswordControl !== null && CompanyNameControl!== null &&
      NameControl.value !== '' &&
      EmailControl.value !== '' &&
      CompanyNameControl.value !== '' &&
      PasswordControl.value !== ''
    ) ;
  }
  
  

    onSignUp() {
      if (this.signUpForm.valid) {

        this.auth.signUpexpert(this.signUpForm.value)
        .subscribe({
          next:(res=>{
           // alert(res.message);
            this.signUpForm.reset();
            this.router.navigate(['login']);
            //alert(res.message)
          }),
          error:(err=>{
           // alert(err?.error.message)
           this.signUpForm.reset();

          })
        })
        console.log(this.signUpForm.value)
      } else {
        ValidateForm.validateAllFormFields(this.signUpForm); //{7}
      }
    }
   
    

  
  

}
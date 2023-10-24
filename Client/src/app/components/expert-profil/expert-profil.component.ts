import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import { Expert } from 'src/app/models/expert';
import { AuthService } from 'src/app/services/auth.service';
import { ExpertService } from 'src/app/services/expert.service';


@Component({
  selector: 'app-expert-profil',
  templateUrl: './expert-profil.component.html',
  styleUrls: ['./expert-profil.component.css']
})
export class ExpertProfilComponent implements OnInit {
  expertusers:Expert[] = [];
  expertuserr:Expert={
email: '',
name: '',
password: '',
bio: '',
companyName: '',
phoneNumber: '',
linkedinProfile: '',
facebookProfile: '',
}
public expertuserEmail: string ='';

  constructor(private router: Router, private AuthService: AuthService , private expertService:ExpertService)
   {  }

  ngOnInit(): void {
    // this.uuserEmail = this.AuthService.userEmail;
    this.expertuserEmail = this.AuthService.getExpertEmail()!;
    this.getAllexpertUser();                                      
    console.log(this.expertuserEmail);

    this.getexpertUserDetails();
  }
  getexpertUserDetails() {
    this.expertService.getExpertByEmail(this.AuthService.getExpertEmail()!).
    subscribe(
      (userDetails) => {
        this.expertuserr = userDetails;
        console.log(this.expertuserr)
      },
      (error) => {
        console.log(error);
      }
    );
  }
 

  editing = false;
  
    toggleEditing() {
      this.editing = !this.editing;
    }
    saveChanges() {
      this.editing = false;
      // Vous pouvez ajouter ici la logique pour enregistrer les modifications, par exemple en utilisant un service ou une API.
      //console.log(this.data); // Les valeurs modifiées sont disponibles ici
        console.log(this.expertusers);
        this.updateexpertUser(this.expertuserr);
    }

    updateexpertUser(user: Expert){
      this.expertService.updateexpertUser(user,this.AuthService.getExpertEmail()!)
       .subscribe(
        response =>{
         this.getAllexpertUser();
       }
     );
     }
     getAllexpertUser(){
      this.expertService.getAllexpertUser()
      .subscribe(
        response =>{
          this.expertusers = response;
          //console.log(response);
        }
      );
    }
}

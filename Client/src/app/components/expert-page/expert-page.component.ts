import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Expert } from 'src/app/models/expert';
import { AuthService } from 'src/app/services/auth.service';
import { ExpertService } from 'src/app/services/expert.service';

@Component({
  selector: 'app-expert-page',
  templateUrl: './expert-page.component.html',
  styleUrls: ['./expert-page.component.css']
})
export class ExpertPageComponent implements OnInit {
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
constructor(private router: Router, private AuthService: AuthService , private expertService:ExpertService){}
onExpertLogout() {
    this.AuthService.logoutExpert();
  
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
  extractInitials(fullName: string): string {
    const words = fullName.split(' ');
      return words.map((word) => word.charAt(0)).join('');
   }

  editing = false;
  formValid: boolean = true; 
  
    toggleEditing() {
      this.editing = !this.editing;
      this.formValid = true;
    }
    saveChanges() {
      
      if (this.expertuserr.name=='' || this.expertuserr.email=='' || this.expertuserr.bio==''  || this.expertuserr.companyName==''  ) {
        this.formValid = false; // Champ(s) obligatoire(s) manquant(s)
        return;
    }
    this.editing = false;
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
  ngOnInit(): void {
       // this.uuserEmail = this.AuthService.userEmail;
       this.expertuserEmail = this.AuthService.getExpertEmail()!;
       this.getAllexpertUser();                                      
       console.log(this.expertuserEmail);
   
       this.getexpertUserDetails();
  }

}

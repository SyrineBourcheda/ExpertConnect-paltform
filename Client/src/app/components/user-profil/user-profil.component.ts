import { Component, OnInit } from '@angular/core';

import {Router} from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';
@Component({
  selector: 'app-user-profil',
  templateUrl: './user-profil.component.html',
  styleUrls: ['./user-profil.component.css']
})
export class UserProfilComponent  implements OnInit {
  users:User[] = [];
  user:User={
email: '',
name: '',
password: '',
bio: '',
skills: '',
phoneNumber: '',
linkedinProfile: '',
facebookProfile: '',
}
public userEmail: string ='';



  constructor( private router: Router, private AuthService: AuthService,private userService:UserService )
   {  }
  
  ngOnInit(): void {
    // this.uuserEmail = this.AuthService.userEmail;
     this.userEmail = this.AuthService.getUserEmail()!;
    this.getAllUser();
    console.log(this.userEmail);

    this.getUserDetails();
    
  }
  getUserDetails() {
    this.userService.getUserByEmail(this.AuthService.getUserEmail()!).
    subscribe(
      (userDetails) => {
        this.user = userDetails;
        console.log(this.user)
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
   UserLogout() {
    this.AuthService.logoutUser();
  }

  
  editMode = false;
  formValid: boolean = true; 

  

  toggleEditMode() {
    this.editMode = !this.editMode;
    this.formValid = true;
  }

  saveChanges() {
    this.editMode = false;
    if (this.user.name=='' || this.user.email=='' || this.user.bio=='' ) {
      this.formValid = false; // Champ(s) obligatoire(s) manquant(s)
      return;
  }
  this.updateUser(this.user);
  }
  updateUser(user: User){
   this.userService.updateUser(user,this.AuthService.getUserEmail()!)
    .subscribe(
     response =>{
      this.getAllUser();
    }
  );
  }
  getAllUser(){
    this.userService.getAllUser()
    .subscribe(
      response =>{
        this.users = response;
        //console.log(response);
      }
    );
  }
}

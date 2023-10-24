import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Session } from 'src/app/models/session';
import { AuthService } from 'src/app/services/auth.service';
import { SessionService } from 'src/app/services/session.service';

@Component({
  selector: 'app-session-form-update',
  templateUrl: './session-form-update.component.html',
  styleUrls: ['../session-form/session-form.component.scss'
]
})
export class SessionFormUpdateComponent implements OnInit {
  sessions: Session[] = [];
  idSession =0
  session: Session = {
    title: '',
    objectives: '',
    requirements: '',
    ownerExpert:'',
    date: undefined,
    duration: 0,
    imagePath: null,
  };
  constructor(private sessionService: SessionService,private authService: AuthService,    private route: ActivatedRoute,private router: Router ) {}

  private currentStep: number = 1;
  getSession(sessionId: number): void {
    this.sessionService.getSessionById(sessionId).subscribe((session) => {
      this.session = session;

     
    });
  }
  updateSession(session: Session): void {
    const idToUpdate = session.id; // L'ID de la session à mettre à jour
    const updatedSession: Session = { 
      id:this.session.id,
      title:this.session.title,
      objectives:this.session.objectives,
      requirements:this.session.requirements,
      date:this.session.date,
      duration:this.session.duration,
      imagePath:this.session.imagePath

     };

    this.sessionService.updateSession(idToUpdate!, updatedSession)
      .subscribe(
        () => {
          console.log('Session mise à jour avec succès.');
          // Mettez à jour votre interface utilisateur ici si nécessaire.
        },
        error => {
          console.error('Erreur lors de la mise à jour de la session : ', error);
          // Gérez l'erreur dans votre interface utilisateur si nécessaire.
        }
      );
      this.router.navigate(['expertSessions'])
  }
  ngOnInit(): void {

    this.route.paramMap.subscribe((params) => {
      this.idSession = Number(params.get('id'));
      this.getSession( this.idSession);
      
    });
   
   
    this.showStep(this.currentStep);
  }
  next() {
    if (this.currentStep < 4) {
      this.currentStep++;
      this.showStep(this.currentStep);
    }
  }

  previous() {
    if (this.currentStep > 1) {
      this.currentStep--;
      this.showStep(this.currentStep);
    }
    console.log(this.session);
  }
//creer session 
  

  private showStep(stepNumber: number) {
    const fieldsets = document.getElementsByTagName('fieldset');
    for (let i = 0; i < fieldsets.length; i++) {
      if (i + 1 === stepNumber) {
        fieldsets[i].style.display = 'block';
      } else {
        fieldsets[i].style.display = 'none';
      }
    }
    this.updateProgress(stepNumber);
  }

  private updateProgress(stepNumber: number) {
    const progressBarItems = document.querySelectorAll('#progressbar li');
    for (let i = 0; i < progressBarItems.length; i++) {
      if (i + 1 < stepNumber + 1) {
        progressBarItems[i].classList.add('active');
      } else {
        progressBarItems[i].classList.remove('active');
      }
    }
  }

  onFileSelected(event: Event) {
    const fileInput = event.target as HTMLInputElement;
    const fileLabel = document.getElementById('fileLabel') as HTMLLabelElement;
    const selectedImage = document.getElementById(
      'selectedImage'
    ) as HTMLImageElement;

    // Check if a file is selected
    if (fileInput.files && fileInput.files.length > 0) {
      const file = fileInput.files[0];
      const reader = new FileReader();

      // Set the label to the selected file's name
      fileLabel.textContent = file.name;

      // Show the selected image
      reader.onload = () => {
        this.session.imagePath = reader.result;
        selectedImage.style.display = 'block';
      };

      reader.readAsDataURL(file);
    } else {
      // No file selected, revert back to the default label and hide the image
      fileLabel.innerHTML =
        '<i class="ion-android-cloud-outline"></i>Choose file';
      selectedImage.style.display = 'none';
    }
  }

  isValidForm(): boolean {
    return (
      this.session.title.trim() !== '' &&
      this.session.objectives.trim() !== '' &&
      this.session.requirements.trim() !== ''
    );
  }

  isValidFormDate(): boolean {
    return this.session.duration !== 0 && this.session.date !== undefined;
  }

}

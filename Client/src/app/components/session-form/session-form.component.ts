import { Component, Input, OnInit } from '@angular/core';
import { Session } from 'src/app/models/session';
import { AuthService } from 'src/app/services/auth.service';
import { SessionService } from 'src/app/services/session.service';

declare const $: any;
@Component({
  selector: 'app-session-form',
  templateUrl: './session-form.component.html',
  styleUrls: ['./session-form.component.css', './session-form.component.scss'],
})
export class SessionFormComponent implements OnInit {
  sessions: Session[] = [];
  session: Session = {
    title: '',
    objectives: '',
    requirements: '',
    ownerExpert:'',
    date: undefined,
    duration: 0,
    imagePath: null,
  };
  constructor(private sessionService: SessionService,private authService: AuthService, ) {}

  private currentStep: number = 1;
  ngOnInit(): void {
    console.log(this.authService.getExpertEmail());
    this.sessionService
      .getSessions()
      .subscribe((result: Session[]) => console.log(result));
   
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

  createSession() {
    this.session.ownerExpert=this.authService.getExpertEmail();
    this.sessionService.createSession(this.session).subscribe(
      (result: Session[]) => {
        console.log(result);
        console.log(this.session.objectives);
      },
      (error) => {
        console.error('Error creating session:', error);
      }
    );
  }
  finish(): void {
    if (this.isValidForm() && this.isValidFormDate()) {
      this.createSession();
    } else {
      console.log('Form is not valid. Cannot create session.');
    }
  }

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

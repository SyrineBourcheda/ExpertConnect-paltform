import { Component, NgModule, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { Expert } from 'src/app/models/expert';
import { Reservation } from 'src/app/models/reservation';
import { Session } from 'src/app/models/session';
import { Feedback } from 'src/app/models/comment';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';
import { ExpertService } from 'src/app/services/expert.service';
import { ReservationService } from 'src/app/services/reservation.service';
import { SessionService } from 'src/app/services/session.service';
import { UserService } from 'src/app/services/user.service';
import { CommentService } from 'src/app/services/comment.service';

@Component({
  selector: 'app-session-details',
  templateUrl: './session-details.component.html',
  styleUrls: ['./session-details.component.scss'],
})
export class SessionDetailsComponent implements OnInit {
  reservations: Reservation[] = [];
  comments: Feedback[] = [];
  commentsData: any = [];
  reserve = true;
  reservation: Reservation = {
    userEmail: '',
    sessionId: 0,
    status: 'In Progress',
    reserved: false,
  };
  commentaire: Feedback = {
    senderEmail: '',
    sessionId: 0,
    commentData: '',
  };
  user: User = {
    name: '',
    email: '',
    password: '',
    bio: '',
    skills: '',
    facebookProfile: '',
    linkedinProfile: '',
    phoneNumber: '',
  };

  session: Session = {
    title: '',
    objectives: '',
    requirements: '',
    ownerExpert: '',
    date: undefined,
    duration: 0,
    imagePath: null,
  };

  similarSessions = [
    {
      image:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTecIPdnumqudeWU0p9z14WJG-y-hIo61IJnQ&usqp=CAU',
      title: 'Comment text 1',
    },
    {
      image:
        'https://cdn1.designhill.com/uploads/personal_designs/thumbs/a6d4072bf8723f18ec58bcd3c4a64a97-0c8ed5efd029f7ebd92af130517aac1816750927963243.jpg?ver=2.12.59',
      title: 'Session Title',
    },
    {
      image:
        'https://cdn.logojoy.com/wp-content/uploads/2018/05/01104823/1454.png',
      title: 'session Title',
    },
    {
      image:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ9nGr5nk11ZTMOCQtYbCuBq0S79ZxhGtGNXQ&usqp=CAU',
      title: 'Session Title',
    },

    // Add more comment data objects here
  ];
  expert: Expert = {
    name: '',
    email: '',
    password: '',
    companyName: '',
    bio: '',
    linkedinProfile: '',
    facebookProfile: '',
    phoneNumber: '',
  };

  extractInitials(fullName: string): string {
    const words = fullName.split(' ');
    return words.map((word) => word.charAt(0)).join('');
  }
  displayedComments: any[] = [];
  remainingComments: any[] = [];
  loadCount: number = 2;

  constructor(
    private reservationService: ReservationService,
    private authService: AuthService,
    private route: ActivatedRoute,
    private sessionService: SessionService,
    private expertService: ExpertService,
    private userService: UserService,
    private commentService: CommentService
  ) {
    this.displayedComments = this.commentsData.slice(0, this.loadCount);
    this.remainingComments = this.commentsData.slice(this.loadCount);
  }
  getReservation(email: string, id: number): void {
    this.reservationService
      .getReservationsByUserAndSession(email, id)
      .subscribe((reservation) => {
        this.reservation = reservation;
        console.log(this.reservation);
      });
  }

  loadExpertByEmail(email: string): void {
    this.expertService.getExpertByEmail(email).subscribe(
      (expert: Expert) => {
        this.expert = expert;
      },
      (error) => {
        console.error('Error loading expert:', error);
      }
    );
  }

  loadMoreComments() {
    const nextLoad = this.remainingComments.splice(0, this.loadCount);
    this.displayedComments = this.displayedComments.concat(nextLoad);
  }
  createReservation() {
    this.reservation.reserved = true;
    this.reservationService.createReservation(this.reservation).subscribe(
      (result: Reservation[]) => {
        console.log(result);
        console.log(this.reservation);
      },
      (error) => {
        console.error('Error creating session:', error);
      }
    );
  }
  UserLogout() {
    this.authService.logoutUser();
  }
  dateShow(inputDate: string | number | Date) {
    const dateObject = new Date(inputDate);
    const day = dateObject.getUTCDate();
    const month = dateObject.getUTCMonth() + 1;
    const year = dateObject.getUTCFullYear();
    const formattedDate = `${day < 10 ? '0' : ''}${day}-${
      month < 10 ? '0' : ''
    }${month}-${year}`;
    return formattedDate;
  }
  getUser(email: string) {
    this.userService
      .getUserByEmail(email)
      .subscribe((user) => (this.user = user));
  }
  createComment() {
    this.commentaire.senderEmail = this.authService.getUserEmail()!;
    this.commentService.createComment(this.commentaire).subscribe(
      (result: Feedback[]) => {
        console.log(result);
      },
      (error) => {
        console.error('Error creating session:', error);
      }
    );
    if (this.commentaire.commentData != ""){
      this.commentaire.commentData = ""
      window.location.reload();
    }
  }

  getFeedback(id: number): void {
    this.commentService.getFeedbacks(id).subscribe((comments) => {
      this.comments = comments;

      for (const item of this.comments) {
        this.userService.getUserByEmail(item.senderEmail).subscribe((user) => {
          const Name = user.name;

          this.commentsData.push({ item, name: Name });
        });
      }
    });
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const sessionId = Number(params.get('id'));
      this.getSession(sessionId);
      this.getReservation(this.authService.getUserEmail()!, sessionId);
      this.commentaire.sessionId = sessionId;
      this.getFeedback(sessionId);
    });

    this.getUser(this.authService.getUserEmail()!);

    const userEmail = this.authService.getUserEmail();

    if (userEmail !== null) {
      // Si userEmail n'est pas null, assignez-le à la propriété userEmail de reservation
      this.reservation.userEmail = userEmail;
    } else {
      // Si userEmail est null, vous pouvez prendre une action alternative,
      // par exemple, fournir une valeur par défaut ou afficher un message d'erreur.
      console.error("L'adresse e-mail de l'utilisateur est nulle.");
    }

    this.reservationService
      .getReservations()
      .subscribe((result: Reservation[]) => console.log(result));
    window.scrollTo(0, 0);
  }

  getSession(sessionId: number): void {
    this.sessionService.getSessionById(sessionId).subscribe((session) => {
      this.session = session;
      console.log(this.session);
      this.loadExpertByEmail(this.session.ownerExpert!);
      this.reservation.sessionId = this.session.id;
    });
  }
  noEmptyPhone(phone: string): boolean {
    return phone != '';
  }
  noEmptyFb(fb: string): boolean {
    return fb != '';
  }
  noEmptyLink(linkedin: string): boolean {
    return linkedin != '';
  }
}

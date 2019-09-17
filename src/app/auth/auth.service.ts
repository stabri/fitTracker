import {User} from "./user.model";
import {AuthDataModel} from "./auth-data.model";
import {Subject, Subscription} from "rxjs";
import {AngularFireAuth} from "@angular/fire/auth";
import {Injectable} from "@angular/core";
import {Router} from "@angular/router";
import {TrainingService} from "../training/training.service";

@Injectable()
export class AuthService {
  authChange = new Subject<boolean>();
  private isAuthenticated: Boolean;

  constructor(private router: Router,
              private authService: AngularFireAuth,
              private trainingService: TrainingService) {
  }

  initAuthListener(){
    this.authService.authState.subscribe(user => {
      if(user) {
        this.isAuthenticated = true;
        this.authChange.next(true);
        this.router.navigate(['/training'])
      }else {
        this.authChange.next(false);
        this.isAuthenticated = false;
        this.router.navigate(['/login']);
        this.trainingService.cancelSubs();
      }
    });
  }

  registerUser(authData: AuthDataModel) {
    this.authService.auth
      .createUserWithEmailAndPassword(authData.email, authData.password).then(result => {
      console.log(result);
    }).catch(reason => {
      console.log(reason)
    });
  }

  login(authData: AuthDataModel) {
    this.authService.auth.signInWithEmailAndPassword(authData.email, authData.password)
      .then(result =>{
        console.log(result);
      })
      .catch(reason => {
        console.log(reason);
      });
  }

  logout() {
    this.authService.auth.signOut();
  }

  isAuth() {
    return this.isAuthenticated;
  }
}

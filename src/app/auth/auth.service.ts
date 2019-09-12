import {User} from "./user.model";
import {AuthDataModel} from "./auth-data.model";
import {Subject} from "rxjs";

export class AuthService {
  authChange = new Subject<boolean>();
  private user: User;

  registerUser(authData: AuthDataModel) {
    this.user = {
      email: authData.email,
      userId: Math.round(Math.random() * 10000).toString(),
  }
  this.authChange.next(true);
  }

  login(authData: AuthDataModel) {
    this.user = {
      email: authData.email,
      userId: Math.round(Math.random() * 10000).toString(),
    }
    this.authChange.next(true);
  }

  logout() {
    this.user = null;
    this.authChange.next(false);
  }

  getUser() {
    // spread operator use to crate copy of original user
    return {...this.user};
  }

  isAuth() {
    return this.user != null;
  }
}

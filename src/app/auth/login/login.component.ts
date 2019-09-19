import {Component, OnDestroy, OnInit} from '@angular/core';
import {NgForm} from "@angular/forms";
import {AuthService} from "../auth.service";
import {UiService} from "../../shared/ui.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {
  isLoading = false;
  private loadingSubs: Subscription;

  constructor(private authService: AuthService,
              private UIService: UiService) { }

  ngOnInit() {
    this.loadingSubs = this.UIService.loadingStateChanged.subscribe(isLoadingState => this.isLoading = isLoadingState);
  }

  onSubmit(f: NgForm) {
    this.authService.login({
      email: f.value.email,
      password: f.value.password,
    })
  }

  ngOnDestroy() {
    if(this.loadingSubs) {
      this.loadingSubs.unsubscribe();
    }
  }
}

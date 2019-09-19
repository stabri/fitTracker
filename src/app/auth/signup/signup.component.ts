import {Component, OnDestroy, OnInit} from '@angular/core';
import {NgForm} from "@angular/forms";
import {AuthService} from "../auth.service";
import {UiService} from "../../shared/ui.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit, OnDestroy {
  maxDate;
  isLoading = false;
  private loadingSubs: Subscription;

  constructor(private authService: AuthService,
              private UISerice: UiService) { }

  ngOnInit() {
    this.loadingSubs = this.UISerice.loadingStateChanged.subscribe(isLoad => this.isLoading = isLoad);
    this.maxDate = new Date();
    this.maxDate.setFullYear(this.maxDate.getFullYear() - 18);
  }

  onSubmit(f: NgForm) {
    this.authService.registerUser({
      email: f.value.email,
      password: f.value.password,
    })
  }

  ngOnDestroy(){
    if(this.loadingSubs){
    this.loadingSubs.unsubscribe();}
  }
}

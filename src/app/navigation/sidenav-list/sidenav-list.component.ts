import {Component, EventEmitter, OnDestroy, OnInit, Output} from '@angular/core';
import {AuthService} from "../../auth/auth.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-sidenav-list',
  templateUrl: './sidenav-list.component.html',
  styleUrls: ['./sidenav-list.component.css']
})
export class SidenavListComponent implements OnInit, OnDestroy {
  @Output() sidenavClose = new EventEmitter<void>();
  isAuth = false;
  private subscription: Subscription;

  constructor(private authService: AuthService) {
  }

  ngOnInit() {
    this.subscription = this.authService.authChange.subscribe(auth =>
      this.isAuth = auth);
  }

  onClose() {
    this.sidenavClose.emit();
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }


}

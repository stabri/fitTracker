import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from "rxjs";
import {TrainingService} from "./training.service";

@Component({
  selector: 'app-training',
  templateUrl: './training.component.html',
  styleUrls: ['./training.component.css']
})
export class TrainingComponent implements OnInit, OnDestroy {
  onGoingTraining: boolean;
  subscription: Subscription;

  constructor(private trainingService: TrainingService) { }

  ngOnInit() {
    this.subscription = this.trainingService.exerciseChanged.subscribe(exercise => {
      if (exercise) {
        this.onGoingTraining = true;
      } else {
        this.onGoingTraining = false;
      }
    })
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }

}

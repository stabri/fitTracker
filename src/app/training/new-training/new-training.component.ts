import {Component, OnDestroy, OnInit} from '@angular/core';
import {TrainingService} from "../training.service";
import {NgForm} from "@angular/forms";
import {Subscription} from "rxjs";
import {ExercisesModel} from "../exercises.model";

@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.css']
})
export class NewTrainingComponent implements OnInit, OnDestroy {
  private availableExercises: ExercisesModel[];
  private exerciseSubscription: Subscription;

  constructor(private trainingService: TrainingService) {
  }

  ngOnInit() {
    this.exerciseSubscription =
      this.trainingService.exercisesChanged.subscribe( exercises => this.availableExercises = exercises);
    this.trainingService.fetchAvailableExercises();
  }

  onStartTraining(f: NgForm) {
    this.trainingService.startExercise(f.value.exercise);
  }

  ngOnDestroy() {
    this.exerciseSubscription.unsubscribe();
  }
}

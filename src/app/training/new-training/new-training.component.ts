import {Component, OnDestroy, OnInit} from '@angular/core';
import {TrainingService} from "../training.service";
import {NgForm} from "@angular/forms";
import {Subscription} from "rxjs";
import {ExercisesModel} from "../exercises.model";
import {UiService} from "../../shared/ui.service";

@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.css']
})
export class NewTrainingComponent implements OnInit, OnDestroy {
  private availableExercises: ExercisesModel[];
  private exerciseSubscription: Subscription;
  private isLoading: boolean;

  constructor(private trainingService: TrainingService,
              private UiService: UiService) {
  }

  ngOnInit() {
    this.UiService.loadingStateChanged.subscribe(isLoading => {
      this.isLoading = isLoading;
    });
    this.exerciseSubscription =
      this.trainingService.exercisesChanged.subscribe(
        exercises => this.availableExercises = exercises);
    this.onFetchExercises();
  }

  onStartTraining(f: NgForm) {
    this.trainingService.startExercise(f.value.exercise);
  }

  ngOnDestroy() {
    if (this.exerciseSubscription) {
      this.exerciseSubscription.unsubscribe();
    }
  }

  onFetchExercises() {
    this.trainingService.fetchAvailableExercises();
  }
}

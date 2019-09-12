import {ExercisesModel} from "./exercises.model";
import {Subject} from "rxjs";

export class TrainingService {
  exerciseChanged = new Subject<ExercisesModel>();

  private availableExercises: ExercisesModel[] = [
    {id: 'pompki', name: 'Pompki', duration: 30, calories: 8},
    {id: 'brzuszki', name: 'Brzuszki', duration: 180, calories: 22},
    {id: 'bieg', name: 'Bieg', duration: 120, calories: 70},
    {id: 'wyciskanie', name: 'Wyciskanie', duration: 60, calories: 15},
  ];
  private runningExercise: ExercisesModel;

  getAvailableExercises() {
    return this.availableExercises.slice();
  }

  startExercise(selectedId: string) {
    this.runningExercise = this.availableExercises.find(ex => ex.id === selectedId);
    this.exerciseChanged.next({...this.runningExercise});
  }


}

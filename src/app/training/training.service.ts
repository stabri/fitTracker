import {ExercisesModel} from "./exercises.model";
import {Subject, Subscription} from "rxjs";
import {map} from "rxjs/operators";
import {AngularFirestore} from "@angular/fire/firestore";
import {Injectable} from "@angular/core";

@Injectable()
export class TrainingService {
  exerciseChanged = new Subject<ExercisesModel>();
  exercisesChanged = new Subject<ExercisesModel[]>();
  finishedExercisesChanged = new Subject<ExercisesModel[]>();
  private availableExercises: ExercisesModel[];
  private runningExercise: ExercisesModel;
  private fbSubs: Subscription[] = [];

  constructor(private dbService: AngularFirestore) {
  }

  fetchAvailableExercises() {
    this.fbSubs.push(this.dbService
      .collection('avaiableExercises')
      .snapshotChanges().pipe(map(docRef => {
        return docRef.map(doc => {
          return {
            id: doc.payload.doc.id,
            name: doc.payload.doc.get('name'),
            duration: doc.payload.doc.get('duration'),
            calories: doc.payload.doc.get('calories'),
          }
        })
      })).subscribe(exercises => {
        this.availableExercises = exercises;
        this.exercisesChanged.next([...this.availableExercises]);
      }));
  }

  startExercise(selectedId: string) {
    this.runningExercise = this.availableExercises.find(ex => ex.id === selectedId);
    this.exerciseChanged.next({...this.runningExercise});
  }

  getRunningExercise() {
    return {...this.runningExercise};
  }

  completeExercises() {
    this.addDataToDB(
      {
        ...this.runningExercise,
        date: new Date(),
        state: 'completed'
      });
    this.runningExercise = null;
    this.exerciseChanged.next(null);
  }

  cancelExercise(progress: number) {
    this.addDataToDB(
      {
        ...this.runningExercise,
        duration: this.runningExercise.duration * (progress / 100),
        calories: this.runningExercise.calories * (progress / 100),
        date: new Date(),
        state: 'cancelled'
      });
    this.runningExercise = null;
    this.exerciseChanged.next(null);
  }

  fetchFinishedExercises() {
    this.fbSubs.push(this.dbService.collection('finishedExercises').valueChanges()
      .subscribe(
        (exercises: ExercisesModel[]) => {
          this.finishedExercisesChanged.next(exercises);
        }));
  }

  addDataToDB(exercise: ExercisesModel) {
    this.dbService.collection('finishedExercises').add(exercise);
  }

  cancelSubs() {
    this.fbSubs.forEach(sub => sub.unsubscribe());
  }
}

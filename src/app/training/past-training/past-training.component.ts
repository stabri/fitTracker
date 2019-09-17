import {AfterViewInit, Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {MatPaginator, MatSort, MatTableDataSource} from "@angular/material";
import {ExercisesModel} from "../exercises.model";
import {TrainingService} from "../training.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-past-training',
  templateUrl: './past-training.component.html',
  styleUrls: ['./past-training.component.css']
})
export class PastTrainingComponent implements OnInit, AfterViewInit, OnDestroy {
  displayedColumns = ['date', 'name', 'duration', 'calories', 'state'];
  dataSource = new MatTableDataSource<ExercisesModel>();
  private exChangedSubscription: Subscription;

  constructor(private trainingService: TrainingService) { }

  @ViewChild(MatSort, {static: true}) matSort: MatSort;
  @ViewChild(MatPaginator, {static: true}) matPaginator: MatPaginator;

  ngOnInit() {
    this.exChangedSubscription = this.trainingService.finishedExercisesChanged
      .subscribe((exercises: ExercisesModel[]) => {
        this.dataSource.data = exercises
      });
    this.trainingService.fetchFinishedExercises();
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.matSort;
    this.dataSource.paginator = this.matPaginator;
  }

  doFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  ngOnDestroy() {
    this.exChangedSubscription.unsubscribe();
  }
}

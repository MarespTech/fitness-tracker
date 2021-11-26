import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { StopTrainingComponet } from './stop-training.component';
import { TrainingService } from '../training.service';

import { Store } from '@ngrx/store';
import * as fromTraining from '../training.reducer';

@Component({
  selector: 'app-current-training',
  templateUrl: './current-training.component.html',
  styleUrls: ['./current-training.component.css']
})
export class CurrentTrainingComponent implements OnInit {
  progress: number = 0;
  timer: any;

  constructor(
    private dialog: MatDialog, 
    private trainingService: TrainingService,
    private store: Store<fromTraining.State>
  ) { }

  ngOnInit(): void {
    this.startTraining();
  }

  startTraining() {
    this.store.select(fromTraining.getActiveExercise).subscribe( ex => {
      if(ex) {
        const duration = ex.duration;
        const step = duration ? duration / 100 * 1000 : 1000;
        this.timer = setInterval(() => {
          this.progress += 1;
          if(this.progress >= 100) {
            this.trainingService.completeExercise();
            clearInterval(this.timer);
          }
        }, step);
      }
    });
  }

  onStop() {
    clearInterval(this.timer);
    const dialogRef = this.dialog.open( StopTrainingComponet, { data: { progress: this.progress } } );

    dialogRef.afterClosed().subscribe( result => {
      if(result) this.trainingService.cancelExercise(this.progress);
      else this.startTraining();
    })
  }
}

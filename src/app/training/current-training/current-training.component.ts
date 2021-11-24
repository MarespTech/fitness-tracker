import { Component, OnInit, EventEmitter, Output} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { StopTrainingComponet } from './stop-training.component';

@Component({
  selector: 'app-current-training',
  templateUrl: './current-training.component.html',
  styleUrls: ['./current-training.component.css']
})
export class CurrentTrainingComponent implements OnInit {
  @Output() trainingExit = new EventEmitter<void>();
  progress: number = 0;
  timer: any;

  constructor(private dialog: MatDialog) { }

  ngOnInit(): void {
    this.startTraining();
  }

  startTraining() {
    this.timer = setInterval(() => {
      this.progress += 5;
      if(this.progress >= 100) {
        clearInterval();
      }
    }, 1000);
  }

  onStop() {
    clearInterval(this.timer);
    const dialogRef = this.dialog.open( StopTrainingComponet, { data: { progress: this.progress } } );

    dialogRef.afterClosed().subscribe( result => {
      if(result) this.trainingExit.emit();
      else this.startTraining();
    })
  }
}

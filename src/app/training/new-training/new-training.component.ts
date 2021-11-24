import { Component, OnInit, Output, EventEmitter } from '@angular/core';

interface Workout {
  name: string,
  value: string
}


@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.css']
})
export class NewTrainingComponent implements OnInit {
  workouts: Workout[] = [
    {name: "Crunches", value:"crunches"},
    {name: "Touch Toes", value:"touch-toes"},
    {name: "Side Lunges", value:"side-lunges"},
    {name: "Burpees", value:"burpees"},
  ]
  @Output() startTraining = new EventEmitter<void>();

  constructor() { }

  ngOnInit(): void {
  }

  onStartTraining() {
    this.startTraining.emit();
  }

}

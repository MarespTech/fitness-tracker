import { Exercise } from './exercise.model';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Subscription } from 'rxjs';
import { map, take } from 'rxjs/operators'
import { Injectable } from '@angular/core';
import { UIService } from '../shared/ui.service';
import { Store } from '@ngrx/store';
import * as fromTraining from './training.reducer';
import * as UI from '../shared/ui.actions';
import * as Training from './training.actions';

interface Data {
    calories: number,
    duration: number,
    name: string
}

@Injectable()
export class TrainingService {
    private fbSubs: Subscription[] = [];

    constructor( 
        private firestore: AngularFirestore, 
        private uiService: UIService,
        private store: Store<fromTraining.State>
    ) {}

    fetchAvailableExercises() {
        this.store.dispatch(new UI.StartLoading);
        this.fbSubs.push(this.firestore
            .collection('availableExercises')
            .snapshotChanges()
            .pipe(
                map(docArray => {
                    return docArray.map( res => {
                        let data: Data | any = res.payload.doc.data();
                        return {
                        id: res.payload.doc.id,
                        ...data
                        }
                    })
                })
            )
            .subscribe( (ex: Exercise[]) => {
                this.store.dispatch(new UI.StopLoading);
                this.store.dispatch(new Training.SetAvailableTrainings(ex));
            }, error => {
                this.store.dispatch(new UI.StopLoading);
                this.uiService.showSnackbar('Fetching Exercises failed, please try later', '', { duration: 3000 });
            }));

            
    }

    startExercise(selectedId: string) {
        this.store.dispatch(new Training.StartTraining(selectedId));
    }

    completeExercise() {
        this.store.select(fromTraining.getActiveExercise)
            .pipe( take(1) )
            .subscribe( ex => {
                if(ex) {
                    if(ex) { 
                        this.addDataToDatabase({ 
                            ...ex,
                            date: new Date(),
                            state: 'completed'
                        });
                    }
                    this.store.dispatch(new Training.StopTraining);
                }
            });
    }

    cancelExercise(progress: number) {
        this.store.select(fromTraining.getActiveExercise)
            .pipe( take(1) )
            .subscribe( ex => {
                if(ex) {
                    const duration = ex.duration 
                                        ? ex.duration * (progress / 100) 
                                        : 1000 * (progress / 100);
                    const calories = ex.calories 
                                        ? ex.calories * (progress/100)
                                        : 10 * (progress / 100);
                    this.addDataToDatabase({ 
                        ...ex,
                        duration,
                        calories,
                        date: new Date(),
                        state: 'cancelled'
                    });
                    this.store.dispatch(new Training.StopTraining);
                }
            });
    }

    fetchExercisesHistorial() {

        this.fbSubs.push(this.firestore
            .collection('exerciseHistorial')
            .snapshotChanges()
            .pipe(
                map(docArray => {
                return docArray.map( res => {
                    let data: Exercise | any = res.payload.doc.data();
                    return {
                    id: res.payload.doc.id,
                    ...data
                    }
                })
                })
            )
            .subscribe( (ex: Exercise[]) => {
                this.store.dispatch(new Training.SetFinishedTrainings(ex));
            }));
    }

    cancelSubscriptions() {
        this.fbSubs.forEach(sub => sub.unsubscribe);
    }

    private addDataToDatabase(exercise: Exercise) {
        this.firestore.collection('exerciseHistorial').add(exercise);
    }
}
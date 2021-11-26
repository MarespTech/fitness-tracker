import { NgModule } from "@angular/core";
import { NewTrainingComponent } from "./new-training/new-training.component";
import { CurrentTrainingComponent } from './current-training/current-training.component';
import { PastTrainingsComponent } from './past-trainings/past-trainings.component';
import { TrainingComponent } from "./training.component";
import { StopTrainingComponet } from "./current-training/stop-training.component";
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { environment } from '../../environments/environment';
import { AngularFireModule } from '@angular/fire/compat';
import { SharedModule } from '../shared/shared.module';
import { TrainingRoutingModule } from './training-routing.module';
import { StoreModule } from "@ngrx/store";
import { trainingReducer } from "./training.reducer";


@NgModule({
    declarations: [
        NewTrainingComponent,
        CurrentTrainingComponent,
        PastTrainingsComponent,
        TrainingComponent,
        StopTrainingComponet
    ],
    imports: [
        AngularFireAuthModule,
        AngularFireModule.initializeApp(environment.firebase),
        SharedModule,
        TrainingRoutingModule,
        StoreModule.forFeature('training', trainingReducer)
    ],
    entryComponents: [ StopTrainingComponet ]
})
export class TrainingModule {}
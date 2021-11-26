import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Store } from '@ngrx/store';

import { User } from './user.model';
import { AuthData } from './auth-data.model';
import { TrainingService } from '../training/training.service';
import { UIService } from '../shared/ui.service';
import * as fromRoot from '../app.reducer'
import * as UI from '../shared/ui.actions';
import * as Auth from './auth.actions';

@Injectable()
export class AuthService {
    authChange = new Subject<Boolean>();
    private user: User | null = null;

    constructor(
        private router: Router, 
        private afAuth: AngularFireAuth,
        private trainingService: TrainingService,
        private uiService: UIService,
        private store: Store<fromRoot.State>
    ) {}

    initAuthListener() {
        this.afAuth.authState.subscribe(user => {
            if(user) {
                this.store.dispatch(new Auth.SetAuthenticated());
                this.router.navigate(['/training']);
            } else {
                this.trainingService.cancelSubscriptions();
                this.store.dispatch(new Auth.SetUnauthenticated());
                this.router.navigate(['/login']);
            }
        });
    }

    registerUser(authData: AuthData) {
        this.store.dispatch(new UI.StartLoading);
        this.afAuth.createUserWithEmailAndPassword(authData.email, authData.password)
            .then( result => {
                this.store.dispatch(new UI.StopLoading);
                this.initAuthListener();
                
            })
            .catch( error => {
                this.store.dispatch(new UI.StopLoading);
                let errorMessage = error.message.replace("Firebase: ", "").split(".");
                console.log(errorMessage);
                this.uiService.showSnackbar(errorMessage[0], '', { duration: 5000 });
            });
    }

    login(authData: AuthData) {
        this.store.dispatch(new UI.StartLoading);
        this.afAuth.signInWithEmailAndPassword(
            authData.email,
            authData.password
        )
        .then( result => {
            this.store.dispatch(new UI.StopLoading);
            this.initAuthListener();
        })
        .catch( error => {
            this.store.dispatch(new UI.StopLoading);
            let errorMessage = error.message.replace("Firebase: ", "").split(".");
            console.log(errorMessage)
            this.uiService.showSnackbar(errorMessage[0], '', { duration: 5000 })
        });
    }

    logout() {
        this.trainingService.cancelSubscriptions();
        this.afAuth.signOut();
        this.user = null;
        this.authChange.next(false);
        this.router.navigate(['/login']);
    }

    getUser() {
        return { ...this.user };
    }
}
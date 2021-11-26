import { NgModule } from "@angular/core";
import { LoginComponent } from "./login/login.component";
import { SignupComponent } from './signup/signup.component';
import { ReactiveFormsModule } from "@angular/forms";
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { environment } from '../../environments/environment';
import { AngularFireModule } from '@angular/fire/compat';
import { SharedModule } from '../shared/shared.module';
import { AuthRoutingModule } from './auth-routing.module';

@NgModule({
    declarations: [
        SignupComponent,
        LoginComponent
    ],
    imports: [
        ReactiveFormsModule,
        AngularFireAuthModule,
        AngularFireModule.initializeApp(environment.firebase),
        SharedModule,
        AuthRoutingModule
    ],
    exports: [

    ]
})
export class AuthModule {}
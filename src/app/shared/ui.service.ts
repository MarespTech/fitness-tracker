import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { MatSnackBar } from "@angular/material/snack-bar";

interface Config {
    duration: number
}

@Injectable()
export class UIService {
    loadingStateChanged = new Subject<boolean>();

    constructor(private snackbard: MatSnackBar) {}

    showSnackbar(message: string, action: string, config: Config) {
        this.snackbard.open(message, action, {
            duration: config.duration
        });
    }
}
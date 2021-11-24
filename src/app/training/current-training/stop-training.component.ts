import { Component, Inject } from "@angular/core";
import { MAT_DIALOG_DATA } from "@angular/material/dialog";

interface PassedData {
    progress: number
}

@Component({
    selector: "app-stop-training",
    template: `
        <h1 mat-dialog-title>Are you sure?</h1>
        <mat-dialog-content>
            <p>You already got {{ passedData.progress }}%</p>
        </mat-dialog-content>
        <mat-dialog-actions>
            <button mat-button [mat-dialog-close]="true">Yes, Stop</button>
            <button mat-button [mat-dialog-close]="false">No, Continue</button>
        </mat-dialog-actions>
    `
})
export class StopTrainingComponet {
    constructor(@Inject(MAT_DIALOG_DATA) public passedData: PassedData) {}
}
import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-storage-add-dialog',
  templateUrl: './object-listing-add-dialog.component.html',
  styleUrls: ['./object-listing-add-dialog.component.css']
})
export class ObjectAddDialogComponent implements OnInit {
  creatingForm!: FormGroup;

  constructor(
    private dialogRef: MatDialogRef<ObjectAddDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Storage,
  ) { }

  ngOnInit() {
    this.creatingForm = this.data.form;
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}

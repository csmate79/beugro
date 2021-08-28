import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-object-listing-edit-dialog',
  templateUrl: './object-listing-edit-dialog.component.html',
  styleUrls: ['./object-listing-edit-dialog.component.css']
})
export class ObjectListingEditDialogComponent implements OnInit {
  updatedForm!: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<ObjectListingEditDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Storage
  ) { }

  ngOnInit(): void {
    this.updatedForm = this.data.form;
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}

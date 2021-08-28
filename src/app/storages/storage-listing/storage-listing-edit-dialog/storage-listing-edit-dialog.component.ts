import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-storage-listing-edit-dialog',
  templateUrl: './storage-listing-edit-dialog.component.html',
  styleUrls: ['./storage-listing-edit-dialog.component.css']
})
export class StorageListingEditDialogComponent implements OnInit {
  updatedForm!: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<StorageListingEditDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Storage
  ) { }

  ngOnInit(): void {
    this.updatedForm = this.data.form;
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}

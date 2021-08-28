import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-storage-add-dialog',
  templateUrl: './storage-listing-add-dialog.component.html',
  styleUrls: ['./storage-listing-add-dialog.component.css']
})
export class StorageAddDialogComponent implements OnInit {
  creatingForm!: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<StorageAddDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Storage
  ) { }

  ngOnInit() {
    this.creatingForm = this.data.form;
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}

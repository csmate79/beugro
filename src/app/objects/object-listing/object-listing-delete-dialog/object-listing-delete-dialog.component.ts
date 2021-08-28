import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ObjectsService } from '../../objects.service';

@Component({
  selector: 'app-object-listing-delete-dialog',
  templateUrl: './object-listing-delete-dialog.component.html',
  styleUrls: ['./object-listing-delete-dialog.component.css']
})
export class ObjectListingDeleteDialogComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<ObjectListingDeleteDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Storage,
    public objectService: ObjectsService
  ) { }

  ngOnInit(): void {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}

import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { StorageService } from '../../storage.service';

@Component({
  selector: 'app-storage-listing-delete-dialog',
  templateUrl: './storage-listing-delete-dialog.component.html',
  styleUrls: ['./storage-listing-delete-dialog.component.css']
})
export class StorageListingDeleteDialogComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<StorageListingDeleteDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Storage,
    public storageService: StorageService
  ) { }

  ngOnInit(): void { 
    
   }

  onNoClick(): void {
    this.dialogRef.close();
  }
}

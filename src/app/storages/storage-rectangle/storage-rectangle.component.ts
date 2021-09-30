import { tap } from 'rxjs/operators';
import { Component, OnInit } from '@angular/core';
import { ObjectsService } from 'src/app/objects/objects.service';
import { StorageService } from '../storage.service';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-storage-rectangle',
  templateUrl: './storage-rectangle.component.html',
  styleUrls: ['./storage-rectangle.component.css']
})
export class StorageRectangleComponent implements OnInit {
  objectsLength: any;
  storagesLength: any;

  constructor (
    private storageService: StorageService,
    private objectsService: ObjectsService
  ) { }

  ngOnInit(): void {
    this.objectsService.getObjectsLength().pipe(
      tap(length => {
        this.objectsLength = length;
      }),
    ).subscribe();

    this.storageService.getStoragesLength().pipe(
      tap(length => {
        this.storagesLength = length;
      })
    ).subscribe();
  }

  fitInColor() {
    return this.storagesLength > this.objectsLength;
  }
}

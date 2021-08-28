import { Component, OnInit } from '@angular/core';
import { ObjectsService } from 'src/app/objects/objects.service';
import { StorageService } from '../storage.service';

@Component({
  selector: 'app-storage-rectangle',
  templateUrl: './storage-rectangle.component.html',
  styleUrls: ['./storage-rectangle.component.css']
})
export class StorageRectangleComponent implements OnInit {
  objectsLength!: number;
  storagesLength!: number;

  constructor (
    private storageService: StorageService,
    private objectsService: ObjectsService
  ) { }

  ngOnInit(): void {
    this.storageService.currentStoragesLength.subscribe(length => this.storagesLength = length);
    this.objectsService.currentObjectLength.subscribe(length => this.objectsLength = length);
  }

  fitInColor() {
    return this.storagesLength > this.objectsLength;
  }
}

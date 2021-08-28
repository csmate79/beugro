import { Injectable, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Storage } from '../storages/storage.interface';
import { StorageListingEditDialogComponent } from 'src/app/storages/storage-listing/storage-listing-edit-dialog/storage-listing-edit-dialog.component';
import { StorageListingDeleteDialogComponent } from 'src/app/storages/storage-listing/storage-listing-delete-dialog/storage-listing-delete-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { StorageAddDialogComponent } from 'src/app/storages/storage-listing/storage-listing-add-dialog/storage-listing-add-dialog.component';
import { ObjectsService } from '../objects/objects.service';
import { BehaviorSubject, Subject } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SharedService } from '../shared/shared.service';
import { MatPaginator } from '@angular/material/paginator';
import { FormGroup, Validators } from '@angular/forms';
import { FormBuilder } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class StorageService implements OnInit {
  data = ELEMENT_DATA;
  dataSource: MatTableDataSource<Storage> = new MatTableDataSource<Storage>(this.data);
 
  objectsLength!: number;
  private storagesLength = new BehaviorSubject<number>(this.getStoragesLength());
  currentStoragesLength = this.storagesLength.asObservable();

  storagesChanged = new Subject<Storage[]>();

  selectedStorageAddress!: string;
  creatingForm!: FormGroup;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  createdStorage!: {
    id: string, 
    address: string, 
    length: string, 
    width: string
  };

  constructor(
    private dialog: MatDialog,
    public snackBar: MatSnackBar,
    private sharedService: SharedService,
    private objectsService: ObjectsService,
    private formBuilder: FormBuilder,
  ) { }

  ngOnInit() {
    this.objectsService.currentObjectLength.subscribe(length => this.objectsLength = length);
  }

  getStorages() {
    return this.dataSource.data.slice();
  }

  openDialogCreateNewStorage() {
    this.initCreatingForm();
    const dialogRef = this.dialog.open(StorageAddDialogComponent, {
      width: '40vw',
      data: { 
        form: this.creatingForm
       }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      if (result) {
        this.createdStorage = result;
        this.data.push(this.createdStorage);
        this.storagesChanged.next(this.data.slice());

        this.storagesLength.next(this.getStoragesLength());
        this.creatingForm.reset();
        this.sharedService.openSnackBar('create');
      }
    });
  }

  openDialogEdit(element: Element, updatedForm: FormGroup) {
    const dialogRef = this.dialog.open(StorageListingEditDialogComponent, {
      width: '40vw',
      data: { 
        form: updatedForm
       }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      
      if (result) {
        for (let i = 0; i < this.data.length; i++) {
          if (this.data[i].id === element.id) {
            this.data[i] = result;
            this.storagesLength.next(this.getStoragesLength());
          }
        }

        this.storagesChanged.next(this.data.slice());
        this.sharedService.openSnackBar('edit');
      }
      updatedForm.reset();
    });
  }

  openDialogDelete(element: Element) {
    const dialogRef = this.dialog.open(StorageListingDeleteDialogComponent, {
      width: '40vw',
      data: { }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      if (result) {
        this.data = this.data.filter(storage => storage.id !== element.id);
        this.storagesChanged.next(this.data.slice());
        this.storagesLength.next(this.getStoragesLength());
        this.sharedService.openSnackBar('delete');
      }
    });
  }

  getStoragesLength() {
    let length = 0
    for (let i = 0; i < this.data.length; i++) {
      length += parseInt(this.data[i].length);
    };
    return length;
  }

  initCreatingForm() {
    this.creatingForm = this.formBuilder.group({
      id: {value: makeid(), disabled: true},
      address: [null, [Validators.required, Validators.maxLength(50)]],
      length: [null, [Validators.required, Validators.min(1), Validators.max(5)]],
      width: [null, [Validators.required, Validators.min(1), Validators.max(5)]],
    });
  }
}

function makeid() {
  let text = "";
  let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  for (let i = 0; i < 5; i++)
    text += possible.charAt(Math.floor(Math.random() * possible.length));

  return text;
}

const ELEMENT_DATA: Storage[] = [
  {id: makeid(), address: 'Sas', length: '2', width: '4'},
  {id: makeid(), address: 'Galamb', length: '3', width: '3'},
  {id: makeid(), address: 'Makaróni', length: '5', width: '2'},
  {id: makeid(), address: 'Utca', length: '2', width: '1'},
  {id: makeid(), address: 'Qwerty', length: '1', width: '3'},
  {id: makeid(), address: 'Humbák', length: '5', width: '4'},
  {id: makeid(), address: 'Huszár', length: '3', width: '2'},
  {id: makeid(), address: 'Huszár', length: '2', width: '5'},
  {id: makeid(), address: 'Huszár', length: '2', width: '1'},
  {id: makeid(), address: 'Huszár', length: '1', width: '2'},
  {id: makeid(), address: 'Huszár', length: '4', width: '5'},

];
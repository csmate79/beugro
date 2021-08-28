import { Injectable, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { ObjectListingEditDialogComponent } from 'src/app/objects/object-listing/object-listing-edit-dialog/object-listing-edit-dialog.component';
import { Object } from './object.interface';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SharedService } from '../shared/shared.service';
import { BehaviorSubject, Subject } from 'rxjs';
import { FormGroup, Validators } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { formatDate } from '@angular/common';
import { ObjectAddDialogComponent } from './object-listing/object-listing-add-dialog/object-listing-add-dialog.component';
import { ObjectListingDeleteDialogComponent } from './object-listing/object-listing-delete-dialog/object-listing-delete-dialog.component';

@Injectable({
  providedIn: 'root'
})
export class ObjectsService implements OnInit {
  data = ELEMENT_DATA;
  creatingForm!: FormGroup;

  private objectsLength = new BehaviorSubject<number>(this.getObjectsLength());
  currentObjectLength = this.objectsLength.asObservable();

  selectedObjectName!: string;

  objectChanged = new Subject<Object[]>();

  dataSource: MatTableDataSource<Object> = new MatTableDataSource<Object>(this.data);
  
  createdObject!: {
    id: string,
    name: string, 
    length: string, 
    date: string
  };

  constructor(
    private dialog: MatDialog,
    public snackBar: MatSnackBar,
    private sharedService: SharedService,
    private formBuilder: FormBuilder, 
  ) {}

  ngOnInit() {
    this.objectsLength.next(this.getObjectsLength());
  }

  getObject() {
    return this.dataSource.data.slice();
  }

  openDialogCreateNewObject() {
    this.initCreatingForm();
    const dialogRef = this.dialog.open(ObjectAddDialogComponent, {
      width: '40vw',
      data: { 
        form: this.creatingForm
       }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');

      if (result) {
        this.createdObject = result;
        this.data.push(this.createdObject);
        this.objectChanged.next(this.data.slice());
        
        this.objectsLength.next(this.getObjectsLength());
        this.sharedService.openSnackBar('create');
        this.creatingForm.reset();
      }
      
    });
  }

  openDialogEdit(element: Element, updatedForm: FormGroup) {
    const dialogRef = this.dialog.open(ObjectListingEditDialogComponent, {
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
            this.objectsLength.next(this.getObjectsLength());
          }
        }
        this.objectChanged.next(this.data.slice());
        this.sharedService.openSnackBar('edit');
      }
      updatedForm.reset();
    });
  }

  openDialogDelete(element: Element) {
    const dialogRef = this.dialog.open(ObjectListingDeleteDialogComponent, {
      width: '40vw',
      data: { }
  });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      if (result) {
        this.data = this.data.filter(storage => storage.id !== element.id);
        this.objectChanged.next(this.data.slice());
        this.objectsLength.next(this.getObjectsLength());
        this.sharedService.openSnackBar('delete');
      }
    });
  }

  getObjectsLength() {
    let length = 0
    for (let i = 0; i < this.data.length; i++) {
      length += parseInt(this.data[i].length);
    }
    return length;
  }

  initCreatingForm() {
    this.creatingForm = this.formBuilder.group({
      id: {value: makeid(), disabled: true},
      name: [null, [Validators.required, Validators.maxLength(50)]],
      length: [null, [Validators.required, Validators.min(1), Validators.max(5)]],
      date: {value: formatDate(new Date(), 'yyyy.MM.dd', 'en'), disabled: true},
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

const ELEMENT_DATA: Object[] = [
  {id: makeid(), name: 'asd', length: '5', date: '1998.04.21'},
  {id: makeid(), name: 'dfg', length: '1', date: '1998.04.21'},
  {id: makeid(), name: 'terz', length: '3', date: '1998.04.21'},
  {id: makeid(), name: 'gx', length: '5', date: '1998.04.21'},
  {id: makeid(), name: 'sadet', length: '1', date: '1998.04.21'},
  {id: makeid(), name: 'xyc', length: '5', date: '1998.04.21'},
  {id: makeid(), name: 'twed', length: '1', date: '1998.04.21'},
  {id: makeid(), name: 'sad', length: '5', date: '1998.04.21'},
  {id: makeid(), name: 'yxc', length: '1', date: '1998.04.21'},
  {id: makeid(), name: 'hfc', length: '5', date: '1998.04.21'},
  {id: makeid(), name: 'wq', length: '1', date: '1998.04.21'},
];
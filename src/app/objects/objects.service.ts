import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ObjectListingEditDialogComponent } from 'src/app/objects/object-listing/object-listing-edit-dialog/object-listing-edit-dialog.component';
import { Object } from './object.interface';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SharedService } from '../shared/shared.service';
import { Observable, Subject } from 'rxjs';
import { FormGroup, Validators } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { formatDate } from '@angular/common';
import { ObjectAddDialogComponent } from './object-listing/object-listing-add-dialog/object-listing-add-dialog.component';
import { ObjectListingDeleteDialogComponent } from './object-listing/object-listing-delete-dialog/object-listing-delete-dialog.component';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { first, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ObjectsService{
  public apiBaseUrl = environment.apiBaseUrl;

  public creatingForm!: FormGroup;

  public selectedObjectName!: string;

  public objectChanged = new Subject<Object[]>();

  private objectsLength = new Subject<Number>();
  
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
    private http: HttpClient,
  ) {}

  public getObjectsApi(): Observable<Object[]> {
    return this.http.get<Object[]>(`${this.apiBaseUrl}/objects`).pipe(
      tap((response: any[]) => {
        this.objectChanged.next([...response])
      }),
    );
  }

  public openDialogCreateNewObject() {
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

        this.http.post(`${this.apiBaseUrl}/objects`, this.createdObject).pipe(
          first(),
          tap(() => {
            this.getObjectsApi().subscribe();
            this.setObjectsLength();
          }),
        ).subscribe();

        this.sharedService.openSnackBar('create');
        this.creatingForm.reset();
      }
    });
  }

  public openDialogEdit(element: Element, updatedForm: FormGroup) {
    const dialogRef = this.dialog.open(ObjectListingEditDialogComponent, {
      width: '40vw',
      data: { 
        form: updatedForm
       }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      
      if (result) {
        this.http.put(`${this.apiBaseUrl}/objects/${element.id}`, updatedForm.getRawValue()).pipe(
          first(),
          tap(() => {
            this.getObjectsApi().subscribe();
            this.setObjectsLength();
          }),
        ).subscribe();
        this.sharedService.openSnackBar('edit');
      }
      updatedForm.reset();
    });
  }

  public openDialogDelete(element: Element) {
    const dialogRef = this.dialog.open(ObjectListingDeleteDialogComponent, {
      width: '40vw',
      data: { }
  });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      if (result) {
        this.http.delete(`${this.apiBaseUrl}/objects/${element.id}`).pipe(
          first(),
          tap(() => {
            this.getObjectsApi().subscribe();
            this.setObjectsLength();
          }),
        ).subscribe();
      }
    });
  }

  private setObjectsLength(): void {
    this.getObjectsApi().pipe(
      first(),
      map((objects: Object[]) => {
        let length = 0;
        for (let object of objects) {
          length += parseInt(object.length);
        }
        return length;
      }),
      tap(length => {
        this.objectsLength.next(length);
      }),
    ).subscribe();
  }

  public getObjectsLength() {
    this.setObjectsLength();
    return this.objectsLength.asObservable();
  }

  public initCreatingForm() {
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

// const ELEMENT_DATA: Object[] = [
//   {id: makeid(), name: 'asd', length: '5', date: '1998.04.21'},
//   {id: makeid(), name: 'dfg', length: '1', date: '1998.04.21'},
//   {id: makeid(), name: 'terz', length: '3', date: '1998.04.21'},
//   {id: makeid(), name: 'gx', length: '5', date: '1998.04.21'},
//   {id: makeid(), name: 'sadet', length: '1', date: '1998.04.21'},
//   {id: makeid(), name: 'xyc', length: '5', date: '1998.04.21'},
//   {id: makeid(), name: 'twed', length: '1', date: '1998.04.21'},
//   {id: makeid(), name: 'sad', length: '5', date: '1998.04.21'},
//   {id: makeid(), name: 'yxc', length: '1', date: '1998.04.21'},
//   {id: makeid(), name: 'hfc', length: '5', date: '1998.04.21'},
//   {id: makeid(), name: 'wq', length: '1', date: '1998.04.21'},
// ];
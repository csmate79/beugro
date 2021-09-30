import { Injectable } from '@angular/core';
import { Storage } from '../storages/storage.interface';
import { StorageListingEditDialogComponent } from 'src/app/storages/storage-listing/storage-listing-edit-dialog/storage-listing-edit-dialog.component';
import { StorageListingDeleteDialogComponent } from 'src/app/storages/storage-listing/storage-listing-delete-dialog/storage-listing-delete-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { StorageAddDialogComponent } from 'src/app/storages/storage-listing/storage-listing-add-dialog/storage-listing-add-dialog.component';
import { Observable, Subject } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SharedService } from '../shared/shared.service';
import { FormGroup, Validators } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { first, map, switchMap, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  private apiBaseUrl = environment.apiBaseUrl;
  
  public data!: Storage[];
 
  public objectsLength!: number;

  public storagesChanged = new Subject<Storage[]>();

  public selectedStorageAddress!: string;
  public creatingForm!: FormGroup;

  private storagesLength = new Subject<Number>();

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
    private formBuilder: FormBuilder,
    private http: HttpClient
  ) { }

  public getStorages(): Observable<Storage[]> {
    return this.http.get<Storage[]>(`${this.apiBaseUrl}/storages`).pipe(
      tap((response: any[]) => {
        this.storagesChanged.next([...response])
      }),
    );
  }

  public openDialogCreateNewStorage() {
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

        this.http.post(`${this.apiBaseUrl}/storages`, this.createdStorage).pipe(
          first(),
          switchMap(() => this.getStorages()),
          tap(() => {
            this.setStoragesLength();
          }),
        ).subscribe();

        this.creatingForm.reset();
        this.sharedService.openSnackBar('create');
      }
    });
  }

  public openDialogEdit(element: Element, updatedForm: FormGroup) {
    const dialogRef = this.dialog.open(StorageListingEditDialogComponent, {
      width: '40vw',
      data: { 
        form: updatedForm
       }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      
      if (result) {
        this.http.put(`${this.apiBaseUrl}/storages/${element.id}`, updatedForm.getRawValue()).pipe(
          first(),
          switchMap(() => this.getStorages()),
          tap(() => {
            this.setStoragesLength();
          }),
        ).subscribe();
        this.sharedService.openSnackBar('edit');
      }
      updatedForm.reset();
    });
  }

  public openDialogDelete(element: Element) {
    const dialogRef = this.dialog.open(StorageListingDeleteDialogComponent, {
      width: '40vw',
      data: { }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      
      if (result) {
        this.http.delete(`${this.apiBaseUrl}/storages/${element.id}`).pipe(
          first(),
          switchMap(() => this.getStorages()),
          tap(() => {
            this.setStoragesLength();
          }),
        ).subscribe();
      }
    });
  }

  public setStoragesLength(): void {
    this.getStorages().pipe(
      first(),
      map((storages: Storage[]) => {
        let length = 0;
        for (let storage of storages) {
          length += parseInt(storage.length);
        }
        return length;
      }),
      tap(length => {
        this.storagesLength.next(length);
      }),
    ).subscribe();
  }

  public getStoragesLength(): Observable<Number> {
    this.setStoragesLength();
    return this.storagesLength.asObservable();
  }

  public initCreatingForm() {
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

// const ELEMENT_DATA: Storage[] = [
//   {id: makeid(), address: 'Sas', length: '2', width: '4'},
//   {id: makeid(), address: 'Galamb', length: '3', width: '3'},
//   {id: makeid(), address: 'Makaróni', length: '5', width: '2'},
//   {id: makeid(), address: 'Utca', length: '2', width: '1'},
//   {id: makeid(), address: 'Qwerty', length: '1', width: '3'},
//   {id: makeid(), address: 'Humbák', length: '5', width: '4'},
//   {id: makeid(), address: 'Huszár', length: '3', width: '2'},
//   {id: makeid(), address: 'Huszár', length: '2', width: '5'},
//   {id: makeid(), address: 'Huszár', length: '2', width: '1'},
//   {id: makeid(), address: 'Huszár', length: '1', width: '2'},
//   {id: makeid(), address: 'Huszár', length: '4', width: '5'},

// ];
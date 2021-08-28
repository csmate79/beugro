import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormControl, FormGroupDirective, NgForm } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  constructor(
    public snackBar: MatSnackBar
  ) { }

  openSnackBar(action: string) {
    let message = '';
    switch (action) {
      case 'create':
        message = 'Sikeres létrehozás!';
        break;
      case 'edit':
        message = 'Sikeres mentés!';
        break;
      case 'delete':
        message = 'Sikeres törlés!';        
        break;
      case 'login':
        message = 'Sikeres bejelentkezés!';
        break;
      case 'error':
        message = 'Sikertelen bejelentkezés!';
        break;
      default:
        break;
    }
    this.snackBar.open(message, 'Ok');
  }

  findWithAttr(array: [], attr: string, value: string) {
    for(let i = 0; i < array.length; i += 1) {
        if(array[i][attr] === value) {
            return i;
        }
    }
    return -1;
  }
}
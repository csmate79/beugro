import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatMenuTrigger } from '@angular/material/menu';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { StorageService } from '../storage.service';
import { TableColumn } from 'src/app/table/tableColumn';
import { Storage } from '../storage.interface';
import { Subject, Subscription } from 'rxjs';

@Component({
  selector: 'app-storage-listing',
  templateUrl: './storage-listing.component.html',
  styleUrls: ['./storage-listing.component.css']
})

export class StorageListingComponent implements OnInit {
  displayedColumns: string[] = [ 'address', 'length', 'width', 'gomb'];
  
  storages!: Storage[];
  private storageChangeSub!: Subscription;

  storagesChanged = new Subject<Storage[]>();

  updatedForm!: FormGroup;
  userName!: string | never[];
  loginStatus!: string | null;

  storagesTableColumn!: TableColumn[];

  @ViewChild(MatMenuTrigger) trigger!: MatMenuTrigger;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private storageService: StorageService, 
    public dialog: MatDialog,
    private formBuilder: FormBuilder,
  ) {}

  ngOnInit() {
    this.initializeColumns();
    this.initForm();
  
    this.storages = this.storageService.getStorages();
    this.storageChangeSub = this.storageService.storagesChanged
      .subscribe(
        (storages: Storage[]) => {
          this.storages = storages;
        }
      );
  }

  onClickMenu(element: object | any) {
    this.storageService.selectedStorageAddress = element.address;
    this.updatedForm.setValue({
      'id': element.id,
      'address': element.address,
      'length': element.length,
      'width': element.width
    })
  }

  addRowDialog() {
    this.storageService.openDialogCreateNewStorage();
    this.initForm();
  }

  openEditDialog(element: Element) {
    this.storageService.openDialogEdit(element, this.updatedForm);
    this.initForm();
  }

  openDeleteDialog(element: Element) {
    this.storageService.openDialogDelete(element);
  }

  private initForm() {
    this.updatedForm = this.formBuilder.group({
      id: {value: null, disabled: true},
      address: ['', [Validators.maxLength(50)]],
      length: ['', [Validators.min(1), Validators.max(5), Validators.pattern("^[0-9]*$")]],
      width: ['', [Validators.min(1), Validators.max(5), Validators.pattern("^[0-9]*$")]],
    });
  }

  getStorages(): MatTableDataSource<Storage> {
    return this.storageService.dataSource;
  }

  initializeColumns(): void {
    this.storagesTableColumn = [
      {
        name: 'Cím',
        dataKey: 'address'
      },
      {
        name: 'Hossz',
        dataKey: 'length'
      },
      {
        name: 'Szélesség',
        dataKey: 'width'
      }
    ];
  }
}

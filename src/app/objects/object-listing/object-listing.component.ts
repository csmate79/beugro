import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Object } from '../object.interface';
import { ObjectsService } from '../objects.service';
import { MatDialog } from '@angular/material/dialog';
import { TableColumn } from 'src/app/table/tableColumn';
import { Subject, Subscription } from 'rxjs';
import { tap } from 'rxjs/operators';


@Component({
  selector: 'app-object-listing',
  templateUrl: './object-listing.component.html',
  styleUrls: ['./object-listing.component.css']
})
export class ObjectListingComponent implements OnInit {
  displayedColumns: string[] = ['name', 'length', 'date', 'gomb'];

  objectsTableColumn!: TableColumn[];

  objects!: Object[];
  dataSource!: MatTableDataSource<Object>;
  private objectChangeSub!: Subscription;

  updatedForm!: FormGroup;
  userName!: string | never[];
  loginStatus!: string | null;

  storagesChanged = new Subject<Storage[]>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private objectService: ObjectsService, 
    public dialog: MatDialog,
    private formBuilder: FormBuilder,
  ) {}

  ngOnInit() {
    this.initializeColumns();
    this.initForm();
    
    this.objectService.getObjectsApi().pipe(
      tap((objects: Object[]) => {
        this.objects = objects;
        this.dataSource = new MatTableDataSource(this.objects);
      })
    ).subscribe();

    this.objectChangeSub = this.objectService.objectChanged
      .subscribe(
        (objects: Object[]) => {
          this.objects = objects;
        }
      );
  }

  initializeColumns(): void {
    this.objectsTableColumn = [
      {
        name: 'Név',
        dataKey: 'name'
      },
      {
        name: 'Tárgy hossza',
        dataKey: 'length'
      },
      {
        name: 'Létrehozás dátuma',
        dataKey: 'date'
      }
    ];
  }

  private initForm() {
    this.updatedForm = this.formBuilder.group({
      name: ['', [Validators.maxLength(50)]],
      length: [null, [Validators.min(1), Validators.max(5), Validators.pattern("^[0-9]*$")]],
      date: {value: null, disabled: true},
    });
  }

  onClickMenu(element: object | any) {
    this.objectService.selectedObjectName = element.name;
    this.updatedForm.setValue({
      'name': element.name,
      'length': element.length,
      'date': element.date
    })
  }

  addRowDialog() {
    this.objectService.openDialogCreateNewObject();
    this.initForm();
  }

  openEditDialog(element: Element) {
    this.objectService.openDialogEdit(element, this.updatedForm);
    this.initForm();
  }

  openDeleteDialog(element: Element) {
    this.objectService.openDialogDelete(element);
  }
}
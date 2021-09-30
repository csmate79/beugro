import { AfterViewInit, Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { TableColumn } from "./tableColumn";
import { MatTableDataSource } from "@angular/material/table";
import { MatPaginator } from "@angular/material/paginator";
import { AuthStateService } from '../auth/services/auth-state.service';
import { User } from '../auth/interfaces/user.interface';
import { Permission } from '../auth/enums/permission.enum';

@Component({
  selector: 'custom-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit, AfterViewInit {
  loginStatus!: string;

  public tableDataSource = new MatTableDataSource<TableColumn>([]);
  public displayedColumns!: string[];
  public currentUser!: User | null;

  public permissions = [Permission.ADMIN, Permission.GROUP_LEADER, Permission.SUPERADMIN];

  @ViewChild(MatPaginator, {static: false}) matPaginator!: MatPaginator;

  @Input() isPageable = false;
  @Input() isFilterable = false;
  @Input() tableColumns!: TableColumn[];
  @Input() menuBtn!: string;
  @Input() paginationSizes: number[] = [5, 10, 15];
  @Input() defaultPageSize = this.paginationSizes[0];

  @Output() clickMenuAction: EventEmitter<any> = new EventEmitter<any>();
  @Output() addRowAction: EventEmitter<any> = new EventEmitter<any>();
  @Output() editRowAction: EventEmitter<any> = new EventEmitter<any>();
  @Output() deleteRowAction: EventEmitter<any> = new EventEmitter<any>();

  @Input() set tableData(data: Storage[] | Object[]) {
    this.setTableDataSource(data);
  }

  constructor(
    private authStateService: AuthStateService
  ) {
  }

  ngOnInit(): void {
    const columnNames = this.tableColumns.map((tableColumn: TableColumn) => tableColumn.name);
    if (this.menuBtn) {
      this.displayedColumns = [...columnNames, this.menuBtn]
    } else {
      this.displayedColumns = columnNames;
    }
    this.authStateService.getUser().subscribe(value => this.currentUser = value);
  }

  ngAfterViewInit(): void {
    this.tableDataSource.paginator = this.matPaginator;
  }

  setTableDataSource(data: any) {
    this.tableDataSource = new MatTableDataSource<any>(data);
    this.tableDataSource.paginator = this.matPaginator;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.tableDataSource.filter = filterValue.trim().toLowerCase();
  }

  public emitClickMenu(row: Element) {
    this.clickMenuAction.emit(row);
  }

  public emitAddRow() {
    this.addRowAction.emit();
  }

  public emitEditRow(row: Element) {
    this.editRowAction.emit(row);
  }

  public emitDeleteRow(row: Element) {
    this.deleteRowAction.emit(row);
  }
  
  public isButtonUsable() {
    return this.currentUser?.permission.some(permission => permission === 'ADMIN' || permission === 'SUPERADMIN');
  }
}

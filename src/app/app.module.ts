import { NgModule, APP_INITIALIZER } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from "@angular/common";
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatTableModule} from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ContextMenuModule  } from '@syncfusion/ej2-angular-navigations';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { StorageServiceModule } from 'ngx-webstorage-service';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { ObjectsComponent } from './objects/objects.component';
import { ObjectListingComponent } from './objects/object-listing/object-listing.component';
import { StorageListingComponent } from './storages/storage-listing/storage-listing.component';
import { StorageRectangleComponent } from './storages/storage-rectangle/storage-rectangle.component';
import { LoginComponent } from './login/login.component';
import { StorageComponent } from './storages/storage.component';
import { StorageListingEditDialogComponent } from './storages/storage-listing/storage-listing-edit-dialog/storage-listing-edit-dialog.component';
import { StorageAddDialogComponent } from './storages/storage-listing/storage-listing-add-dialog/storage-listing-add-dialog.component';
import { StorageListingDeleteDialogComponent } from './storages/storage-listing/storage-listing-delete-dialog/storage-listing-delete-dialog.component';
import { ObjectListingEditDialogComponent } from './objects/object-listing/object-listing-edit-dialog/object-listing-edit-dialog.component';
import { ObjectListingDeleteDialogComponent } from './objects/object-listing/object-listing-delete-dialog/object-listing-delete-dialog.component';
import { TableComponent } from './table/table.component';
import { DataPropertyGetterPipe } from './table/data-property-getter-pipe/data-property-getter.pipe';
import { ObjectAddDialogComponent } from './objects/object-listing/object-listing-add-dialog/object-listing-add-dialog.component';

import { AppInitService } from './app-init.service';
import { HasPermissionDirective } from './shared/has-permission.directive';

export function initApp(appInitService: AppInitService) {
  return (): Promise<any> => { 
    return appInitService.init();
  }
}

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ObjectsComponent,
    StorageComponent,
    ObjectListingComponent,
    StorageListingComponent,
    StorageRectangleComponent,
    LoginComponent,
    StorageAddDialogComponent,
    StorageListingEditDialogComponent,
    StorageListingDeleteDialogComponent,
    ObjectListingEditDialogComponent,
    ObjectListingDeleteDialogComponent,
    TableComponent,
    DataPropertyGetterPipe,
    ObjectAddDialogComponent,
    HasPermissionDirective,
  ],
  imports: [
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    FlexLayoutModule,
    MatTableModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatIconModule,
    MatToolbarModule,
    MatInputModule,
    MatButtonModule,
    MatSnackBarModule,
    MatDialogModule,
    ContextMenuModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatMenuModule,
    FormsModule,
    HttpClientModule,
    StorageServiceModule
  ],
  providers: [
    { 
      provide: APP_INITIALIZER, 
      useFactory: initApp, 
      deps: [AppInitService], 
      multi: true,
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

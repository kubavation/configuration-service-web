import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";
import {MatSidenavModule} from "@angular/material/sidenav";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {HttpClientModule} from "@angular/common/http";
import {MatTableModule} from "@angular/material/table";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatSelectModule} from "@angular/material/select";
import {ReactiveFormsModule} from "@angular/forms";
import {MatInputModule} from "@angular/material/input";
import {MatDialogModule} from "@angular/material/dialog";
import {MatSlideToggleModule} from "@angular/material/slide-toggle";
import {MatSnackBarModule} from "@angular/material/snack-bar";
import { ConfirmationModalComponent } from './components/confirmation-modal/confirmation-modal.component';
import {MatCheckboxModule} from "@angular/material/checkbox";
import {MatExpansionModule} from "@angular/material/expansion";
import {ContextListService} from "./context/service/context-list.service";
import {ContextStorageService} from "./context/storage/context-storage.service";
import { ContextListComponent } from './context/components/context-list/context-list.component';
import { ContextModalComponent } from './context/components/context-modal/context-modal.component';
import {MatCardModule} from "@angular/material/card";



@NgModule({
  declarations: [
    ConfirmationModalComponent,
    ContextListComponent,
    ContextModalComponent
  ],
  imports: [
    CommonModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatSidenavModule,
    HttpClientModule,
    MatTableModule,
    MatFormFieldModule,
    MatPaginatorModule,
    MatSelectModule,
    ReactiveFormsModule,
    MatInputModule,
    MatDialogModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatCheckboxModule,
    MatExpansionModule,
    MatCardModule,
  ],
  exports: [
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatSidenavModule,
    HttpClientModule,
    MatTableModule,
    MatFormFieldModule,
    MatPaginatorModule,
    MatSelectModule,
    ReactiveFormsModule,
    MatInputModule,
    MatDialogModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatCheckboxModule,
    MatExpansionModule,
    ContextListComponent
  ],
  providers: [ContextListService, ContextStorageService]
})
export class SharedModule { }

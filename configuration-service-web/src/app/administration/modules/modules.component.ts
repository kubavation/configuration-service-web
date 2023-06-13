import {Component, ViewChild} from '@angular/core';
import {ModuleService} from "./service/module.service";
import {MatTableDataSource} from "@angular/material/table";
import {Module} from "./model/module";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {filter, map, Observable, switchMap} from "rxjs";
import {MatDialog} from "@angular/material/dialog";
import {ModuleModalComponent} from "./module-modal/module-modal.component";
import {SnackbarService} from "../../shared/snackbar/snackbar.service";
import {ConfirmationService} from "../../shared/components/confirmation-modal/confirmation.service";

@Component({
  selector: 'app-modules',
  templateUrl: './modules.component.html',
  styleUrls: ['./modules.component.scss']
})
export class ModulesComponent {

  dataSource$: Observable<MatTableDataSource<Module>> = this.moduleService.modules$
    .pipe(
      map((modules) => this.toDataSource(modules))
    );

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  dataSource: MatTableDataSource<Module>;

  readonly displayedColumns = ['position', 'name', 'description'];

  selected: Module | undefined;

  constructor(private moduleService: ModuleService,
              private snackbarService: SnackbarService,
              private confirmationService: ConfirmationService,
              private dialog: MatDialog) {
  }


  private toDataSource(modules: Module[]): MatTableDataSource<Module> {
    this.dataSource = new MatTableDataSource<Module>(modules);
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    return this.dataSource;
  }

  onSelect(module: Module): void {
    this.selected = module;
  }


  openModal(data: Module | undefined = null): void {
    this.dialog.open(ModuleModalComponent, {
      data: data,
      width: '40vw'
    }).afterClosed()
      .pipe(
        filter(module => !!module),
        switchMap(module => this.saveModule(module, data?.name))
      ).subscribe(_ => {
          this.snackbarService.success("Module successfully created.");
        }, error => this.snackbarService.error("Error while creating module."));
  }

  private saveModule(module: Module, moduleName: string = null): Observable<void> {
    if (moduleName) {
      return this.moduleService.editModule(moduleName, module);
    }
    return this.moduleService.addModule(module);
  }

  openConfirmationModal(): void {
    this.confirmationService.open({
      content: `Delete module ${this.selected?.name}?`
    }).afterClosed()
      .pipe(
        filter(result => !!result),
        switchMap(_ => this.moduleService.deleteModule(this.selected.name))
      ).subscribe(_ => {
          this.snackbarService.success("Module successfully deleted.");
      }, error => this.snackbarService.error("Error while deleting module."));
  }
}

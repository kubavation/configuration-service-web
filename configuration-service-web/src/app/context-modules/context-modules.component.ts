import {Component, ViewChild} from '@angular/core';
import {ContextBsService} from "../shared/context/service/context-bs.service";
import {BehaviorSubject, combineLatest, filter, map, switchMap} from "rxjs";
import {ContextModulesService} from "./service/context-modules.service";
import {MatTableDataSource} from "@angular/material/table";
import {ContextModule} from "./model/context-module";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {MatDialog} from "@angular/material/dialog";
import {ContextModulesModalComponent} from "./context-modules-modal/context-modules-modal.component";
import {Router} from "@angular/router";

@Component({
  selector: 'app-context-modules',
  templateUrl: './context-modules.component.html',
  styleUrls: ['./context-modules.component.scss']
})
export class ContextModulesComponent {

  private refreshSubject = new BehaviorSubject<void>(null);

  context$ = this.contextBsService.context$

  dataSource$ = combineLatest([this.context$, this.refreshSubject])
    .pipe(
      map(([context, _]) => context),
      switchMap(context => this.contextModulesService.contextModules(context.name)),
      map(modules => this.toDataSource(modules))
    )


  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  dataSource: MatTableDataSource<ContextModule>;

  readonly displayedColumns = ['position', 'name'];

  selected: ContextModule | undefined;


  constructor(private contextBsService: ContextBsService,
              private dialog: MatDialog,
              private router: Router,
              private contextModulesService: ContextModulesService) {
  }

  private toDataSource(modules: ContextModule[]): MatTableDataSource<ContextModule> {
    this.dataSource = new MatTableDataSource<ContextModule>(modules);
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    return this.dataSource;
  }

  onSelect(module: ContextModule): void {
    this.selected = module;
  }


  openModal(): void {
    this.dialog.open(ContextModulesModalComponent, {
      data: this.dataSource.data
    })
      .afterClosed()
      .pipe(
        filter((moduleNames: string[]) => !!moduleNames),
        switchMap((moduleNames: string[]) => this.contextModulesService.setContextModules(this.contextBsService.value().name,
          moduleNames.map(moduleName => {
              return {name: moduleName}
            }))
        )
      )
      .subscribe(_ => {
        this.refreshSubject.next();
      })
  }

  redirectToConfiguration(): void {
    this.router.navigateByUrl(`modules/${this.selected.name}/configuration`);
  }
}

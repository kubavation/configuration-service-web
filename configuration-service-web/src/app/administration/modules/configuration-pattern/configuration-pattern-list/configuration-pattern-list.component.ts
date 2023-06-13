import {Component, EventEmitter, Input, Output, ViewChild} from '@angular/core';
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {MatTableDataSource} from "@angular/material/table";
import {ConfigPattern} from "../../model/config-pattern";

@Component({
  selector: 'app-configuration-pattern-list',
  templateUrl: './configuration-pattern-list.component.html',
  styleUrls: ['./configuration-pattern-list.component.scss']
})
export class ConfigurationPatternListComponent {

  @Input() set dataSource(configPatterns: ConfigPattern[]) {
    this.source = this.toDataSource(configPatterns);
  }

  @Output() afterSelection = new EventEmitter<ConfigPattern>;

  source: MatTableDataSource<ConfigPattern>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  readonly displayedColumns = ['position', 'name', 'description', 'defaultValue'];

  constructor() {
  }

  private toDataSource(configurationPatterns: ConfigPattern[]): MatTableDataSource<ConfigPattern> {
    this.source = new MatTableDataSource<ConfigPattern>(configurationPatterns);
    this.source.sort = this.sort;
    this.source.paginator = this.paginator;
    return this.source;
  }

  onSelect(row: ConfigPattern): void {
    this.afterSelection.emit(row);
  }

}

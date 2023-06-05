import {Component} from '@angular/core';
import {MatDialogRef} from "@angular/material/dialog";
import {Context} from "../../model/context";
import {ContextListService} from "../../service/context-list.service";

@Component({
  selector: 'app-context-modal',
  templateUrl: './context-modal.component.html',
  styleUrls: ['./context-modal.component.scss']
})
export class ContextModalComponent {

  contexts$ = this.contextService.contexts$;

  selected: Context;

  constructor(private dialogRef: MatDialogRef<ContextModalComponent>,
              private contextService: ContextListService) {
  }


  cancel() {
    this.dialogRef.close();
  }

  save() {
    this.dialogRef.close(this.selected);
  }

  onSelect(context: Context): void {
    this.selected = context;
  }
}

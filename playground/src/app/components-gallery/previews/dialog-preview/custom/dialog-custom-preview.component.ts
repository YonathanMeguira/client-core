import { Component } from "@angular/core";
import { CustomDialogComponent } from "./custom-dialog/custom-dialog.component";
import { FormControl } from "@angular/forms";
import { DatoDialog } from "../../../../../../../lib/src/dialog/dialog.service";
import { DatoDialogResult } from "../../../../../../../lib/src/dialog/config/dialog.options";

@Component({
  selector: "dato-dialog-custom-preview",
  templateUrl: "./dialog-custom-preview.component.html"
})
export class DatoDialogCustomPreviewComponent {
  nameControl = new FormControl("");
  animal: string;

  constructor(private dialog: DatoDialog) {}

  openDialog() {
    this.dialog
      .open(CustomDialogComponent, {
        data: {
          name: this.nameControl.value
        }
      })
      .afterClosed()
      .subscribe((result: DatoDialogResult<string>) => {
        this.animal = result.data;
      });
  }
}

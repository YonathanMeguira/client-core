import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DatoDialogComponent } from './dialog/dialog.component';
import { DatoDialogRef } from './dialog-ref';
import { DatoDialogHeaderComponent } from './header/header.component';
import { DialogContentComponent } from './content/dialog-content.component';
import { DatoDialogFooterComponent } from './footer/dialog-footer.component';
import { DialogCloseDirective } from './dialog-close.directive';
import { DatoIconButtonModule } from '../icon-button/icon-button.module';
import { DatoConfirmationDialogComponent } from './confirmation/confirmation-dialog.component';
import { DatoButtonModule } from '../button/button.module';
import { DatoDynamicContentModule } from '../dynamic-content/dynamic-content.module';
import { DialogDismissDirective } from './dialog-dismiss.directive';
import { DatoDirectivesModule } from '../directives/directives.module';
import { DatoIconModule } from '../icon/icon.module';
import { DatoThemesModule } from '../themes/themes.module';
import { DatoDialog } from './dialog.service';

const declarations = [DatoDialogComponent, DatoDialogHeaderComponent, DialogContentComponent, DatoDialogFooterComponent, DialogCloseDirective, DialogDismissDirective, DatoConfirmationDialogComponent];

@NgModule({
  imports: [CommonModule, DatoButtonModule, DatoIconModule, DatoIconButtonModule, DatoDynamicContentModule, DatoDirectivesModule, DatoThemesModule],
  providers: [DatoDialog, DatoDialogRef],
  declarations: [declarations],
  exports: [declarations],
  entryComponents: [DatoDialogComponent, DatoConfirmationDialogComponent]
})
export class DatoDialogModule {}

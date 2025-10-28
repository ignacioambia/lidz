import { Component, inject, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DIALOG_PARAMS } from '../../services';
import { DialogParams } from './dialog.model';
import { Button } from '../button/button';

//TODO: Add animations
@Component({
  selector: 'rm-dialog',
  imports: [CommonModule, Button],
  templateUrl: './dialog.component.html',
  styleUrl: './dialog.component.scss',
})
export class RmDialog {
  public dialogParams = inject<DialogParams>(DIALOG_PARAMS);
  public dialogClose = output<'confirm' | 'cancel'>();

  public closeDialog(response: 'confirm' | 'cancel') {
    this.dialogClose.emit(response);
  }
}

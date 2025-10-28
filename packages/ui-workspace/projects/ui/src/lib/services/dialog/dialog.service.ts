import { Injectable, InjectionToken, Injector, ViewContainerRef } from '@angular/core';
import { RmDialog } from '../../components/dialog/dialog.component';
import { DialogParams } from '../../components/dialog/dialog.model';

export const DIALOG_PARAMS = new InjectionToken<any>('DIALOG_PARAMS');

//TODO: Create decorator to open dialog
@Injectable({
  providedIn: 'root'
})
export class DialogService {

  constructor(private viewContainerRef: ViewContainerRef) {}
  
  public open(dialogParams: DialogParams) {
    const componentRef= this.viewContainerRef.createComponent(RmDialog, {
      injector: this.createInjector(dialogParams),
    });
    componentRef.instance.dialogClose.subscribe((action) => {
      console.log(`Dialog closed with action: ${action}`, dialogParams);
      if (dialogParams.handleAction) {
        dialogParams.handleAction(action);
      }
      componentRef.destroy();
    });
  }

  private createInjector(dialogParams: DialogParams): Injector {
    return Injector.create({
      providers: [{ provide: DIALOG_PARAMS, useValue: dialogParams}]
    })
  }
}

import { ElementRef } from '@angular/core';

declare var M;
export class MaterialService {
  static toast(message: string) {
    M.toast({ html: message });
  }
  static initializeFloatingButton(element: ElementRef) {
    M.FloatingActionButton.init(element.nativeElement);
  }
  static updateTextInput() {
    M.updateTextFields();
  }
}

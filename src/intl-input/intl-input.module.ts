import { NgModule, ModuleWithProviders } from '@angular/core';
import { IntlInputDirective } from './intl-input.directive';
import { IntlInputComponent } from './intl-input.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'

@NgModule({
    imports:[
        CommonModule,
        FormsModule
    ],
    declarations: [
        IntlInputDirective,
        IntlInputComponent
    ],
    exports: [
        IntlInputComponent
    ]
})
export class IntlInputModule { 
    static forRoot(): ModuleWithProviders {
        return {
          ngModule: IntlInputModule
        }
      }
}
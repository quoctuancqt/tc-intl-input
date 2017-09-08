import { OnChanges, Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import 'intl-tel-input';
import * as jQuery from 'jquery';

@Component({
    selector: 'intel-input',
    styles: [
        '.intl-input-invalid { color: red; margin-left:5px;}'
    ],
    template: `
      <input #intlInput
        [intlTelInput]="intlOptions"
        id="intelInput"
        name="intelInput"
        [ngModel]="value"
        (ngModelChange)="onInputChange($event)"
      /><span class="intl-input-invalid" [hidden]="isValid">Invalid Phone Number</span>
    `
})
export class IntlInputComponent implements OnChanges {
    ngOnChanges(): void {
        if (this.fullValue) {
            jQuery(this.intlInput.nativeElement).intlTelInput('setNumber', this.fullValue);
        }
        if (this.value) {
            jQuery(this.intlInput.nativeElement).intlTelInput('setNumber', this.value);
        }
        this.isValid = this.checkValueValid();
    }

    @Input() fullValue: string;
    @Output() fullValueChange = new EventEmitter<string>();
    @Input() intlOptions = { formatOnDisplay: false, separateDialCode: true };
    @Input() value: string;
    @Output() valueChange = new EventEmitter<string>();
    @Output() validationChange = new EventEmitter<boolean>();
    @ViewChild('intlInput') intlInput: ElementRef;
    private isValid = true;

    constructor() {
        this.detectLocation((countryCode) => {
            jQuery(this.intlInput.nativeElement).intlTelInput('setCountry', countryCode);
        });
    }

    onInputChange(value: string) {
        this.isValid = this.checkValueValid();
        this.value = value;
        this.valueChange.emit(value);
        this.fullValue = jQuery(this.intlInput.nativeElement).intlTelInput('getNumber');
        this.fullValueChange.emit(this.fullValue);
    }

    private checkValueValid(): boolean {
        if (jQuery(this.intlInput.nativeElement).intlTelInput('isValidNumber')) {
            this.validationChange.emit(true);
            return true;
        }

        this.validationChange.emit(false);
        return false;
    }

    private detectLocation(callback: (countryCode) => void): any {
        jQuery.get("https://ipinfo.io", null, function (data) {
            let countryCode = (data && data.country) ? data.country : "";
            callback(countryCode);
        }, "jsonp");
    }
}
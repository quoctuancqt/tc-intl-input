import { Directive, ElementRef, Input, OnInit } from '@angular/core';
import 'intl-tel-input';
import * as jQuery from 'jquery';

@Directive({
    selector: '[intlTelInput]'
})
export class IntlInputDirective implements OnInit {

    @Input('intlTelInput') intlTelInput: any;
    constructor(private el: ElementRef) { }

    ngOnInit() {
        jQuery.fn.intlTelInput.loadUtils('https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/11.0.12/js/utils.js');
        jQuery(this.el.nativeElement).intlTelInput(this.intlTelInput);
    }
}
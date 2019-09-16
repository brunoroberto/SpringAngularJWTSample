import { Input } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

export abstract class CustomFormComponent {

    @Input('form')
    form?: FormGroup;

    protected attachComponentToForm(name: string, component: FormControl) {
        if (!this.form) { return; }
        this.form.addControl(name, component);
    }

}
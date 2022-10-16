import { Validators as NGValidators, AbstractControl } from '@angular/forms';

export class Validators extends NGValidators {
  static required(control) {
    return super.required(control)
      ? { required: 'ველის შეყვანა აუცილებელია ' }
      : undefined;
  }

  static minLength(length) {
    return (control) =>
      super.minLength(length)(control)
        ? { minLength: 'გთხოვთ, შეიყვანოთ ველი, რომლის სიგრძეა მინიმუმ ' + length }
        : undefined;
  }

  static maxLength(length) {
    return (control) =>
      super.maxLength(length)(control)
        ? { maxLength: 'გთხოვთ, შეიყვანოთ ველი, რომლის სიგრძეა მაქსიმუმ ' + length }
        : undefined;
  }

  static pattern(pattern: string | RegExp, patternDescription?: string) {
    return (control: AbstractControl) => {
      if (super.pattern(pattern)(control)) {
        return {
          minLength: `ინფუთი უნდა იყოს: '${patternDescription || pattern.toString()}'`
        };
      }
    };
  }

}

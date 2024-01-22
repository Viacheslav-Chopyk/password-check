import {
  AbstractControl,
  ValidationErrors,
  ValidatorFn
} from '@angular/forms';

export enum PasswordLevel {
  Weak = 'Weak',
  Medium = 'Medium',
  Strong = 'Strong',
}

export function passwordValidators(minLength: number): ValidatorFn {
  const defaultColor : string = 'Grey'
  return (control: AbstractControl): ValidationErrors | null => {
    const password: string | null = control.value as string;

    if (!password) {
      return  { passwordStrength: defaultColor }
    }

    const letterPattern: RegExp = /[a-zA-Z]/;
    const digitPattern: RegExp = /\d/;
    const symbolPattern: RegExp = /[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]/;

    const letters: boolean = letterPattern.test(password);
    const digits: boolean = digitPattern.test(password);
    const symbols: boolean = symbolPattern.test(password);

    switch (true) {
      case password.length < minLength:
        console.log('minsymbol')
        return { passwordStrength: PasswordLevel.Weak };
      case letters && digits && symbols:
        console.log('Strong')
        return { password: PasswordLevel.Strong };
      case (letters && digits) || (letters && symbols) || (digits && symbols):
        console.log('medium')
        return { password: PasswordLevel.Medium };
      default:
        return { password: PasswordLevel.Weak };
    }
  };
}

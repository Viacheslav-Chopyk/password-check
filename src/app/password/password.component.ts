import { Component } from '@angular/core';
import { MatFormField } from "@angular/material/form-field";
import {
  FormControl,
  ReactiveFormsModule,
  Validators
} from "@angular/forms";
import { MatInput} from "@angular/material/input";

enum PasswordLevel {
  Weak = 'Weak',
  Medium = 'Medium',
  Strong = 'Strong',
}

enum InputType {
  Text = 'text',
  Password = 'password',
}

@Component({
  selector: 'app-password',
  standalone: true,
  imports: [
    MatFormField,
    ReactiveFormsModule,
    MatInput
  ],
  templateUrl: './password.component.html',
  styleUrl: './password.component.css'
})
export class PasswordComponent {
  public passwordControl : FormControl<string | null> = new FormControl('', Validators.required);
  public passwordStrength : string = '';
  public passwordIsVisible : boolean = false;
  public passwordLevels: string[] = ['Weak', 'Medium', 'Strong'];

  public checkPasswordStrength(): void {
    const password : string | null = this.passwordControl.value;

    if (!password) {
      this.passwordStrength = 'grey';

      return;
    }

    const letterPattern : RegExp = /[a-zA-Z]/;
    const digitPattern : RegExp = /\d/;
    const symbolPattern : RegExp = /[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]/;

    const letters : boolean = letterPattern.test(password);
    const digits : boolean = digitPattern.test(password);
    const symbols : boolean = symbolPattern.test(password);

    this.validatePassword(password, letters, digits, symbols)
  }

  private validatePassword(password: string, letters: boolean, digits: boolean, symbols: boolean) {
    switch (true) {
      case password.length < 8:
        this.passwordStrength = PasswordLevel.Weak;
        break;
      case letters && digits && symbols:
        this.passwordStrength = PasswordLevel.Strong;
        break;
      case (letters && digits) || (letters && symbols) || (digits && symbols):
        this.passwordStrength = PasswordLevel.Medium;
        break;
      default:
        this.passwordStrength = PasswordLevel.Weak;
        break;
    }
  }

  protected readonly PasswordLevel = PasswordLevel;
  protected readonly InputType = InputType

}

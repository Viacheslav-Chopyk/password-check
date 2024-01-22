import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import { MatFormField } from "@angular/material/form-field";
import { MatInput } from "@angular/material/input";
import { MatIconButton } from "@angular/material/button";
import { MatIcon } from "@angular/material/icon";
import {
  PasswordLevel,
  passwordValidators
} from "./validators/password-validators";


enum InputType {
  Text = 'text',
  Password = 'password',
}

@Component({
  selector: 'app-password',
  standalone: true,
  templateUrl: './password.component.html',
  imports: [
    ReactiveFormsModule,
    MatFormField,
    MatInput,
    MatIconButton,
    MatIcon
  ],
  styleUrls: ['./password.component.css']
})
export class PasswordComponent {
  public passwordForm: FormGroup;
  public passwordStrength: string = '';
  public passwordIsVisible: boolean = false;
  public passwordLevels: string[] = ['Weak', 'Medium', 'Strong'];
  public minPasswordLength: number = 8;

  constructor(
    private formBuilder: FormBuilder
  ) {
    this.passwordForm = this.formBuilder.group({
      passwordControl: ['', [Validators.required, passwordValidators(this.minPasswordLength)]],
    });

    this.passwordChanges();
  }

  private passwordChanges() {
    this.passwordForm.get('passwordControl')?.valueChanges.subscribe(() => {
      this.passwordStrength = this.calculatePasswordStrength();
    });
  }

  private calculatePasswordStrength(): string {
    const passwordControl = this.passwordForm.get('passwordControl');
    if (passwordControl && passwordControl.dirty && passwordControl.valid) {
      const validationErrors = passwordValidators(this.minPasswordLength)(passwordControl);
      return validationErrors ? validationErrors['passwordStrength'] : '';
    }
    return '';
  }

  protected readonly InputType = InputType
  protected readonly PasswordLevel = PasswordLevel;
}

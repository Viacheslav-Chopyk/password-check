import {
  Component,
  OnDestroy
} from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  ReactiveFormsModule
} from '@angular/forms';
import {
  MatFormField,
  MatSuffix
} from "@angular/material/form-field";
import { MatInput } from "@angular/material/input";
import { Subscription } from "rxjs";
import {
  InputType,
  PasswordLevel
} from "./enums/enums";
import { PasswordValidators } from "./validators/password-validators";
import { MatIconButton } from "@angular/material/button";
import { MatIcon } from "@angular/material/icon";

@Component({
  selector: 'app-password',
  standalone: true,
  templateUrl: './password.component.html',
  styleUrls: ['./password.component.css'],
  imports: [
    MatFormField,
    ReactiveFormsModule,
    MatInput,
    MatIconButton,
    MatIcon,
    MatSuffix
  ]
})
export class PasswordComponent implements OnDestroy {
  public passwordForm: FormGroup;
  public passwordStrength: string = '';
  public passwordIsVisible: boolean = false;
  public readonly minPasswordLength : number = 8;
  public readonly passwordLevels:string[] = this.enumToArray(PasswordLevel);
  private readonly subscribeToFormData: Subscription | undefined = new Subscription();


  constructor(
    private fb: FormBuilder
  ) {
    this.passwordForm = this.fb.group({
      passwordControl: ['', Validators.required],
    });

    this.subscribeToFormData = this.passwordForm.get('passwordControl')?.valueChanges.subscribe(() => {
      this.checkPassword();
    });
  }

  public checkPassword(): void {
    const password: string = this.passwordForm.get('passwordControl')?.value;
    this.passwordStrength = PasswordValidators.checkPasswordStrength(password)
  }
  public ngOnDestroy(): void {
    if (this.subscribeToFormData) {
      this.subscribeToFormData.unsubscribe();
    }
  }

  public enumToArray(enumObject: any): string[] {
    const enumKeys : string[] = Object.keys(enumObject)
      .filter(key => isNaN(Number(enumObject[key])));
    const filteredKeys : string[] = enumKeys.slice(0, enumKeys.length - 1);

    return filteredKeys.map(key => enumObject[key]);
  }

  protected readonly InputType = InputType;
  protected readonly PasswordLevel = PasswordLevel;
}

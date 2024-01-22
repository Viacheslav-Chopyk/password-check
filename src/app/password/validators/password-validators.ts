import { PasswordLevel } from "../enums/enums";

export class PasswordValidators {
  static readonly minPasswordLength: number = 8;

  static checkPasswordStrength(password: string): string {
    if (!password) {
      return PasswordLevel.defaultColor;
    }

    const letterPattern: RegExp = /[a-zA-Z]/;
    const digitPattern: RegExp = /\d/;
    const symbolPattern: RegExp = /[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]/;

    const letters: boolean = letterPattern.test(password);
    const digits: boolean = digitPattern.test(password);
    const symbols: boolean = symbolPattern.test(password);

    return this.validatePassword(password, letters, digits, symbols);
  }

  private static validatePassword(password: string, letters: boolean, digits: boolean, symbols: boolean): string {
    switch (true) {
      case password.length < this.minPasswordLength:
        return PasswordLevel.Weak;
      case letters && digits && symbols:
        return PasswordLevel.Strong;
      case (letters && digits) || (letters && symbols) || (digits && symbols):
        return PasswordLevel.Medium;
      default:
        return PasswordLevel.Weak;
    }
  }
}

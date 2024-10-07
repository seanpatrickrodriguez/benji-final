import {
  AbstractControl,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
} from '@angular/forms';
import { Observable, map } from 'rxjs';
// import { UserManagementService } from 'src/app/administration/services/user-management.service';

export class CustomValidators {
  static hasMinLength(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value: string = control.value || '';
      return value.length >= 8 ? null : { passwordHasMinLength: true };
    };
  }

  static hasUpperCase(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value: string = control.value || '';
      return /[A-Z]/.test(value) ? null : { passwordHasUpperCase: true };
    };
  }

  static hasLowerCase(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value: string = control.value || '';
      return /[a-z]/.test(value) ? null : { passwordHasLowerCase: true };
    };
  }

  static hasNumeric(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value: string = control.value || '';
      return /[0-9]/.test(value) ? null : { passwordHasNumeric: true };
    };
  }

  static hasSpecialChar(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value: string = control.value || '';
      if (!value) {
        return { passwordHasSpecialChar: true };
      }
      return /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/.test(value)
        ? null
        : { passwordHasSpecialChar: true };
    };
  }

  // static emailIsUniqueValidator(userService: UserManagementService) {
  //   return (
  //     control: AbstractControl
  //   ): Observable<{ [key: string]: any } | null> => {
  //     return userService.isEmailTaken(control.value).pipe(
  //       map((isEmailTaken) => {
  //         if (isEmailTaken) {
  //           return { 'auth/email-already-in-use': true };
  //         } else {
  //           return null;
  //         }
  //       })
  //     );
  //   };
  // }

  static emailMatchValidator(formGroup: FormGroup) {
    if (!formGroup.get('email')?.valid) return;
    const email: string = formGroup.get('email')?.value;
    const confirmEmail: string = formGroup.get('confirmEmail')?.value;

    if (email !== confirmEmail) {
      formGroup.get('confirmEmail')?.setErrors({
        ...formGroup.get('confirmEmail')?.errors,
        noEmailMatch: true,
      });
    }
  }

  static passwordMatchValidator(formGroup: FormGroup) {
    if (!formGroup.get('password')?.valid) return;
    const password: string = formGroup.get('password')?.value;
    const confirmPassword: string = formGroup.get('confirmPassword')?.value;

    if (password !== confirmPassword) {
      formGroup.get('confirmPassword')?.setErrors({
        ...formGroup.get('confirmPassword')?.errors,
        noPasswordMatch: true,
      });
    }
  }
}

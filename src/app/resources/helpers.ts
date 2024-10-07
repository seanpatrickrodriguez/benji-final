import { AbstractControl, AsyncValidatorFn } from "@angular/forms";
import { Observable, debounceTime, distinctUntilChanged, of, switchMap, timer } from "rxjs";
import { NAVIGATION } from "./constants";

export function debounceValidator(
    validator: AsyncValidatorFn,
    time: number = 500
  ): AsyncValidatorFn {
    return (
      control: AbstractControl
    ): Observable<{ [key: string]: any } | null> => {
      if (control.pristine) {
        return of(null);
      } else {
        return timer(time).pipe(
          switchMap(() => validator(control)),
          debounceTime(time),
          distinctUntilChanged()
        );
      }
    };
  }
  export function getRoute(route: string) {
    if (route === NAVIGATION.ADMIN.PATH) {
      return '/' + route;
    } else {
      return '/' + NAVIGATION.HOME.PATH + '/' + route;
    }
  };
export const objectKeys    = Object.keys
export const objectValues  = Object.values
export const originalOrder = (): number => 0;

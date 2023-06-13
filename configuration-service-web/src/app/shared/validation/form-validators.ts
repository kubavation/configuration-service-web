import {AbstractControl, AsyncValidatorFn, ValidationErrors} from "@angular/forms";
import {map, Observable} from "rxjs";
import {AlreadyExistsValidation} from "./already-exists-validation";

export class FormValidators {

  static alreadyExistsValidator(service: AlreadyExistsValidation): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors> => {
      return service.alreadyExists(control.value)
        .pipe(
          map(result => result ? {alreadyExists: true} : null)
        )
    }
  }


}

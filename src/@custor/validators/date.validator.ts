import { AbstractControl, ValidatorFn } from '@angular/forms';
import { DATE_REGEX } from './date.helper';

export function dateValidator(): ValidatorFn {
  return (control: AbstractControl): {[key: string]: any} => {
    const dateStr = control.value;
    // First check for dd/mm/yyyy format
    // If pattern is wrong, don't validate yet
    if (!DATE_REGEX.test(dateStr)) {
      return null;
    }
    // Length of months (will update for leap years)
    const monthLengthArr = [ 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31 ];
    // Object to return if date is invalid
    const invalidObj = { date: true };
    // Parse the date input to integers
    const dateArr = dateStr.split('/');
    const month = parseInt(dateArr[0], 10);
    const day = parseInt(dateArr[1], 10);
    const year = parseInt(dateArr[2], 10);
    // Today's date
    const now = new Date();

    // Validate year and month
    if (year < now.getFullYear() || year > 3000 || month === 0 || month > 12) {
      return invalidObj;
    }
    // Adjust for leap years
    if (year % 400 === 0 || (year % 100 !== 0 && year % 4 === 0)) {
      monthLengthArr[1] = 29;
    }
    // Validate day
    if (!(day > 0 && day <= monthLengthArr[month - 1])) {
      return invalidObj;
    }
    // If date is properly formatted, check the date vs today
    const date = new Date(dateStr);
    if (date > now) {
      return invalidObj;
    }
    return null;
  };
}

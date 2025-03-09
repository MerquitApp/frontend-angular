import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'firstLetter'
})
export class FirstLetterPipe implements PipeTransform {
  transform(value: unknown): string {
    if (typeof value !== 'string') return '';

    const firstLetter = value.charAt(0).toUpperCase();
    return firstLetter;
  }
}

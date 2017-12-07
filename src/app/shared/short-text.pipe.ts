import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'shortText'
})
export class ShortText implements PipeTransform {
  transform(text: any, length: number): string {
    return text.substring(0, length) + '...';
  }
}

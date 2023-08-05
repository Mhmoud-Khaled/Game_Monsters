import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'lineLimit'
})
export class LineLimitPipe implements PipeTransform {

  transform(value: string, maxLines: number): string {
    const lines = value.split('\n');
    if (lines.length > maxLines) {
      value = lines.slice(0, maxLines).join('\n') + '...';
    }
    return value;
  }

}

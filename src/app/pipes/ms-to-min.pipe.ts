import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'MillisToReadable'
})
export class MillisToReadablePipe implements PipeTransform {

  transform(value: number, ...args: unknown[]): string {
    if (this.msToHours(value)>=1) {
      return `${this.msToHours(value)} h`
    } else if (this.msToMin(value)>=1){
      return `${this.msToMin(value)} min`
    } else {
      return `${this.msToSec(value)} sec`
    }
  }

  msToSec(num: number) {
    return num/ 1000
  }

  msToMin(num: number) {
    return num / 60000
  }

  msToHours(num: number) {
    return num / 3600000
  }

}

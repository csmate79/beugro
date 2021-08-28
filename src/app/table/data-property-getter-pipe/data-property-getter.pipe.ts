import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'dataPropertyGetter'
})
export class DataPropertyGetterPipe implements PipeTransform {

  transform(object: any, keyName: string): unknown {
    return object[keyName];
  }

}

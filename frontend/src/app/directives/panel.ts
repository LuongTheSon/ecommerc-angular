import { Directive } from '@angular/core';

@Directive({
  selector: '[appPanel]',
  host: {
    class: 'bg-white rounded-xl p-6 border border-gray-200 w-full',
  },
})
export class Panel {
  constructor() {}
}

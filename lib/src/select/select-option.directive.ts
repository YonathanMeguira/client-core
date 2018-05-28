/**
 * @license
 * Copyright Datorama. All Rights Reserved.
 *
 * Use of this source code is governed by an Apache License 2.0 license that can be
 * found in the LICENSE file at https://github.com/datorama/client-core/blob/master/LICENSE
 */

import { Directive, Input, TemplateRef } from '@angular/core';

@Directive({
  selector: '[datoOption]'
})
export class DatoOptioneDirective {
  @Input('datoOption') option;

  constructor(public tpl: TemplateRef<any>) {}
}

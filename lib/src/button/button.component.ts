/**
 * @license
 * Copyright Datorama. All Rights Reserved.
 *
 * Use of this source code is governed by an Apache License 2.0 license that can be
 * found in the LICENSE file at https://github.com/datorama/client-core/blob/master/LICENSE
 */

import { Attribute, ChangeDetectionStrategy, Component, ElementRef, Input } from '@angular/core';
import { toBoolean } from '@datorama/utils';
import { setDimensions } from '../internal/custom-dimensions';
import { query } from '../internal/helpers';

@Component({
  selector: 'dato-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DatoButtonComponent {
  _disabled = false;

  constructor(private host: ElementRef, @Attribute('width') public width, @Attribute('height') public height) {}

  /**
   *
   * @param value
   */
  @Input()
  set disabled(value) {
    this._disabled = toBoolean(value);
  }

  ngOnInit() {
    const button = query('button', this.host.nativeElement);
    setDimensions(this.width, this.height, button);
  }
}

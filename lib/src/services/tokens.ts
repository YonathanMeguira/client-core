/**
 * @license
 * Copyright Datorama. All Rights Reserved.
 *
 * Use of this source code is governed by an Apache License 2.0 license that can be
 * found in the LICENSE file at https://github.com/datorama/client-core/blob/master/LICENSE
 */

import { InjectionToken } from '@angular/core';

export interface Translate {
  transform(value, interpolateParams?): string;
}

export const APP_TRANSLATE = new InjectionToken<Translate>('APP_TRANSLATE');

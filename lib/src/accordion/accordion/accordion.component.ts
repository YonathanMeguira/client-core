/**
 * @license
 * Copyright Datorama. All Rights Reserved.
 *
 * Use of this source code is governed by an Apache License 2.0 license that can be
 * found in the LICENSE file at https://github.com/datorama/client-core/blob/master/LICENSE
 */

import { AfterContentInit, ChangeDetectorRef, Component, ContentChildren, Input, OnDestroy, Optional, QueryList, SkipSelf } from '@angular/core';
import { DatoAccordionGroupComponent } from '../accordion-group/accordion-group.component';
import { merge } from 'rxjs';
import { mapTo } from 'rxjs/operators';
import { toBoolean } from '@datorama/utils';

@Component({
  selector: 'dato-accordion',
  template: '<ng-content></ng-content>',
  exportAs: 'datoAccordion',
  styles: [
    `
            :host {
                display: block;
            }`
  ]
})
export class DatoAccordionComponent implements AfterContentInit, OnDestroy {
  @ContentChildren(DatoAccordionGroupComponent) groups: QueryList<DatoAccordionGroupComponent>;
  @ContentChildren(DatoAccordionComponent, { descendants: true })
  childAccordion: QueryList<DatoAccordionComponent>;

  @Input() closeOthers = false;
  @Input() expandAll = false;
  @Input() includeArrows = false;
  @Input() activeIds: number | number[] = [];

  groupsSubscription;

  constructor(
    @SkipSelf()
    @Optional()
    private parent: DatoAccordionComponent,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnChanges(changes) {
    if (changes.expandAll && !changes.expandAll.firstChange) {
      this.setExpandAll();
    }

    if (changes.activeIds && !changes.activeIds.firstChange) {
      this.groups.forEach(g => this.toggleGroup(g, false));
      this.setExpandAll(changes.activeIds.currentValue);
    }
  }

  toggle(index: number) {
    const group = this.groups.toArray()[index];
    if (toBoolean(group)) {
      this.onGroupClick(group);
    } else {
      console.error(`Group ${index} doesn't exists`);
    }
  }

  ngAfterContentInit() {
    this.initialOpen(this.activeIds);
    this.groups.changes.subscribe(() => {
      this.register();
    });

    if (this.includeArrows) {
      this.groups.forEach(group => {
        group.header.includeArrow = true;
      });
    }

    this.register();
  }

  private register() {
    if (this.groupsSubscription) {
      this.groupsSubscription.unsubscribe();
    }

    this.groupsSubscription = merge(...this.groups.map(group => group.header.click$.pipe(mapTo(group)))).subscribe((group: DatoAccordionGroupComponent) => {
      this.onGroupClick(group);
    });
  }

  private onGroupClick(group: DatoAccordionGroupComponent) {
    if (group._disabled) {
      return;
    }

    if (this.closeOthers && !group.content._expanded) {
      this.groups.forEach(g => {
        if (g !== group) {
          this.closeAndEmit(g);
        }
      });
    }

    this.toggleGroup(group, !group.content._expanded);

    const children = this.getChildAccordionsComponents();

    if (children.length) {
      children.forEach(child => child.groups.forEach(g => this.closeAndEmit(g)));
    }

    this.emitToggle(group);
    this.cdr.markForCheck();
  }

  private getChildAccordionsComponents() {
    return this.childAccordion.filter(child => child !== this);
  }

  private toggleGroup(group: DatoAccordionGroupComponent, expanded = true) {
    group.content.expanded = expanded;
    group.header.expanded = expanded;
  }

  private coerceArray<T>(value): T[] {
    return Array.isArray(value) ? value : [value];
  }

  private initialOpen(activeIds: number | number[]) {
    const toArray = this.expandAll ? this.groups.toArray().map((_, i) => i) : this.coerceArray<number>(activeIds);
    this.setExpandAll(toArray);
  }

  setExpandAll(ids?: any[]) {
    let toArray = ids;
    if (!toArray) {
      toArray = this.groups.toArray().map((_, i) => i);
    }
    toArray.forEach(index => {
      const group = this.groups.toArray()[index];
      if (!this.parent && !group._disabled) {
        this.toggleGroup(group);
      }
    });
  }

  private emitToggle(group: DatoAccordionGroupComponent, value?: boolean) {
    if (group.toggle.observers.length) {
      const expanded = value == null ? group.content._expanded : value;
      group.toggle.next({ expanded });
    }
  }

  private closeAndEmit(group: DatoAccordionGroupComponent) {
    if (group.content._expanded) {
      this.emitToggle(group, false);
    }
    this.toggleGroup(group, false);
  }

  ngOnDestroy() {
    this.groupsSubscription && this.groupsSubscription.unsubscribe();
  }
}

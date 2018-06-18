export function getMultiTemplate() {
  return `
      <div class="dato-checkbox"><label><p datoFont><ng-content></ng-content></p><input type="checkbox" [checked]="_active" [disabled]="_disabled"><span class="checkmark"></span></label></div>
  `;
}

export function getOptionTemplate(isMulti = false) {
  return `
    <div class="dato-select__option 
         dato-select__option--simple 
         dato-select__option--hover"
         [class.force-hide]="hide"
         ${isMulti ? '' : '[class.dato-option--active]="active"'}
         [class.dato-select__option--disabled]="_disabled"
         [class.dato-option--keyboard-active]="activeByKeyboard"
         >
      ${isMulti ? getMultiTemplate() : '<ng-content></ng-content>'} 
    </div>
  `;
}

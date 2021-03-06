import { Directive, HostListener } from '@angular/core';

@Directive({
  selector: '[appTooltip]',
})
export class TooltipDirective {
  visible = false;
  nested = {
    child: {
      grandchild: {
        prop: 1,
      },
    },
  };

  @HostListener('click')
  handleClick() {
    this.visible = !this.visible;
    if (this.visible) {
      (this as any).extraProp = true;
    } else {
      delete (this as any).extraProp;
    }
    console.log(this);
  }
}

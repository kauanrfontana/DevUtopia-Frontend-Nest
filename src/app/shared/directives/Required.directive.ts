import { AfterViewInit, Directive, ElementRef, Renderer2 } from "@angular/core";

@Directive({
  selector: "[requiredInput]",
})
export class RequiredDirective implements AfterViewInit {
  constructor(private elRef: ElementRef, private render: Renderer2) {}

  ngAfterViewInit(): void {
    let el = this.elRef.nativeElement as HTMLElement;
    this.render.setProperty(
      this.elRef.nativeElement,
      "innerHTML",
      el.innerHTML + ' <span style="color: red;">*</span>'
    );
  }
}

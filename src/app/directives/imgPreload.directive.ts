import { Directive, ElementRef, OnInit } from "@angular/core";
import {
  AnimationPlayer,
  AnimationBuilder,
  AnimationFactory,
  animate, style
} from '@angular/animations';

/*
 * Preloaded image directive
 */
@Directive({
  selector: '[preloadImg]'
})
export class PreloadImgDirective implements OnInit {
  private timing = '500ms cubic-bezier(0.2, 1, 0.2, 1)';
  private player: AnimationPlayer;
  constructor(
    private el: ElementRef,
    private builder: AnimationBuilder
  ) {
  }
  ngOnInit() {
    this.el.nativeElement.style.filter = 'blur(1000px)';
    this.el.nativeElement.style.WebkitFilter = 'blur(1000px)';
    const self = this;
    const preloadAnimation: AnimationFactory = self.buildAnimation();
    self.player = preloadAnimation.create(self.el.nativeElement);
    this.el.nativeElement.onload = function () {
      self.player.play();
    }
  }
  private buildAnimation() {
    return this.builder.build([
      animate(this.timing, style({ filter: 'none', WebkitFilter: 'none' }))
    ]);
  }
}

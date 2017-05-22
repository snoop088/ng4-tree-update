import { Directive, Input, EventEmitter, HostListener, Renderer, ElementRef, DoCheck } from '@angular/core';
import { TreeDraggedElement } from '../models/tree-dragged-element.model';

const DRAG_OVER_CLASS = 'is-dragging-over';

@Directive({
  selector: '[treeDrag]'
})
export class TreeDragDirective implements DoCheck {
  @Input('treeDrag') draggedElement;
  @Input() treeDragEnabled;

  constructor(private el: ElementRef, private renderer: Renderer, private treeDraggedElement:TreeDraggedElement) {
  }

  ngDoCheck() {
    this.renderer.setElementAttribute(this.el.nativeElement, 'draggable', this.treeDragEnabled ? "true" : "false");
  }

  @HostListener('dragstart', ['$event']) onDragStart(ev) {
    // setting the data is required by firefox
    ev.dataTransfer.setData('text', ev.target.id);

    setTimeout(() => {
      this.treeDraggedElement.set(this.draggedElement);
      if (this.draggedElement.mouseAction) {
        this.draggedElement.mouseAction('dragStart', ev);
      }
    }, 30);
  }

  @HostListener('dragend') onDragEnd() {
    this.treeDraggedElement.set(null);
  }
}

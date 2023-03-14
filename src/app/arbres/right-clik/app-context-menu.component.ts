import { Component, EventEmitter, Input, Output } from "@angular/core";
import { ContextMenuModel } from './context-menu.model';

@Component({
  selector: 'app-context-menu',
  template: ` <ng-container>
    <div
      class="menu-link"
      *ngFor="let menuItem of contextMenuItems; index as i"
      (click)="onContextMenuClick($event, menuItem.menuEvent)"
      
    >
      {{ menuItem.menuText }}
      <hr *ngIf="i < contextMenuItems.length - 1" />
    </div>
  </ng-container>`,
})
export class AppContextMenuComponent {
  @Input()
  contextMenuItems!: Array<ContextMenuModel>;

  @Output()
  onContextMenuItemClick: EventEmitter<any> = new EventEmitter<any>();

  onContextMenuClick(event: any, data: any): any {
    this.onContextMenuItemClick.emit({
      event,
      data,
    });
  }
}
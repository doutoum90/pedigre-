import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-node-element',
  templateUrl: './node-element.component.html',
  styleUrls: ['./node-element.component.scss'],
})
export class NodeElementComponent {
  @Input() data = { imageUrl: 'https://fakeimg.pl/100/', name: 'Doutoum' };
  constructor() {
    this.data = { imageUrl: 'https://fakeimg.pl/100/', name: 'Doutoum' };
  }
}

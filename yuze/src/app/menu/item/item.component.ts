import { Input, Component, OnInit } from '@angular/core';

@Component({
  selector: 'menu-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})



export class ItemComponent implements OnInit {
  @Input() name: string;
  constructor() { }

  ngOnInit() {
  }

}

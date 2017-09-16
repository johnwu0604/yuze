import { Component, OnInit } from '@angular/core';
import { MenuService } from './menu.service';

@Component({
  selector: 'menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  allMenuItems: any;

  constructor(public menuService: MenuService) { }

  ngOnInit() {
    this.getAllMenuItems();
  }

  changeStatus(event:Event):void {
    if((<HTMLInputElement>event.target).classList.contains('selected')){
      (<HTMLInputElement>event.target).classList.remove('selected');
    }else{
      (<HTMLInputElement>event.target).classList.add('selected');
    }
  }

  getAllMenuItems(){
    this.menuService.getAllMenuItems().then((res) => {
      this.allMenuItems = res;
      console.log(res);
    })
  }
}

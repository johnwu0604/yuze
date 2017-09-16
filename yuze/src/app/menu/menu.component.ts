import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  constructor() { }

  ngOnInit() {
  }

  changeStatus(event:Event):void {
    if((<HTMLInputElement>event.target).classList.contains('selected')){
      (<HTMLInputElement>event.target).classList.remove('selected');
    }else{
      (<HTMLInputElement>event.target).classList.add('selected');
    }
  }

  // onHeroChange(event:Event):void {
  //   Hero hero = heros.firstWhere(
  //
  //   // Hero hero = heros[int.parse((event.target as SelectElement).value)];
  //   selectedHero = hero;
  //   selectedHeroChange.add(hero);
  // }

}

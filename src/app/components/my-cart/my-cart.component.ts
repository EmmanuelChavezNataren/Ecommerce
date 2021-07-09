import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-my-cart',
  templateUrl: './my-cart.component.html',
  styleUrls: ['./my-cart.component.scss'],
})
export class MyCartComponent implements OnInit {
  @Input() totalProducts: number;
  constructor() { }

  public ngOnInit(){}

}

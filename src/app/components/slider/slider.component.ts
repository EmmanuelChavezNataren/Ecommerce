import { Component, Input, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { Product } from 'src/app/models/Product';

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.scss'],
})
export class SliderComponent implements OnInit {
  @Input() offer: Product;
  @Input() skeleton: boolean;
  constructor(private router: Router) { }

  ngOnInit() { }

  getRealPrice(price, discount) {
    return Number(price) - Number(discount);
  }

  detail(producto) {
    const navigationExtras: NavigationExtras = {
      queryParams: {
        item: JSON.stringify(producto),
      }
    };
    this.router.navigate(['/detail'], navigationExtras);
  }

}

import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Product } from '../../models/Product';
import { ProductsFacade } from '../../store/facades/products.facade';

@Component({
  selector: 'app-list',
  templateUrl: 'list.page.html',
  styleUrls: ['list.page.scss']
})
export class ListPage implements OnInit, OnDestroy {
  productsSubscription = new Subscription();
  error: Error;
  allProducts: Product[] = [];
  allBrands: string[] = [];
  selectedBrands: string[] = [];
  tempProducts: Product[] = [];
  isLoading$: Observable<boolean>;
  allBrandSelected = true;

  constructor(
    private productsFacade: ProductsFacade,
    ) { }

  ngOnInit() {
    this.isLoading$ = this.productsFacade.isLoading$;
    this.allProducts = [];

    this.productsSubscription.add(this.productsFacade.products$.subscribe(products => {
      this.allProducts = products;
      this.tempProducts = products;
      this.allBrands = [...new Set(products.map((d) => d.brand))];
    }));
  }

  ngOnDestroy() {
    this.productsSubscription.unsubscribe();
  }

  includeBrand(brand: string) {
    if (this.selectedBrands.includes(brand)) {
      return true;
    }
    else {
      return false;
    }
  }

  filterProducts(brand: string) {
    if (brand === 'Todos') {
      if (this.selectedBrands.length === this.allBrands.length) {
        this.selectedBrands = [];
        this.allBrandSelected = false;
      }
      else {
        this.allBrandSelected = true;
        this.allProducts = this.tempProducts;
        this.selectedBrands = [];
        this.selectedBrands.push.apply(this.selectedBrands, this.allBrands);
      }
    }
    else {
      if (!this.selectedBrands.includes(brand)) {
        this.selectedBrands.push(brand);
      }
      else {
        const index = this.selectedBrands.indexOf(brand);
        if (index !== -1) {
          this.selectedBrands.splice(index, 1);
        }
      }
    }

    if (this.selectedBrands.length === 0) {
      this.allProducts = [];
      this.allProducts = this.tempProducts;
    }

    if (brand !== 'Todos' && this.selectedBrands.length > 0) {
      this.allBrandSelected = false;
      this.allProducts = this.tempProducts;
      this.allProducts = this.allProducts.filter((prod) => this.selectedBrands.includes(prod.brand));
    }
    else {
      this.allProducts = this.tempProducts;
    }
  }

}

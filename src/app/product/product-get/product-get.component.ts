import { Component, OnInit } from '@angular/core';
import { Product } from '../../interfaces/Product';
import { ProductsService } from '../../service/products.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-product-get',
  templateUrl: './product-get.component.html',
  styleUrls: ['./product-get.component.scss']
})
export class ProductGetComponent implements OnInit {
  prodList$: Observable<any>;
  constructor(
    private prodService: ProductsService,
    private router: Router
  ) { }

  ngOnInit() {
    this.prodList$ = this.prodService.getProductList();
  }

  deleteProduct(item) {
    console.log('Component item:', item);
    this.prodService.deleteProduct(item).subscribe(res => {
      this.ngOnInit();
    });
  }

}

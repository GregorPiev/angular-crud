import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Product } from '../../interfaces/Product';
import { ProductsService } from '../../service/products.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-product-add',
  templateUrl: './product-add.component.html',
  styleUrls: ['./product-add.component.scss']
})
export class ProductAddComponent implements OnInit {
  form: FormGroup;
  errorMessage: string;

  constructor(
    private fb: FormBuilder,
    private prodSevice: ProductsService,
    private router: Router
    ) { }

  ngOnInit() {
    this.form = this.fb.group({
      ProductName: ['', Validators.required],
      ProductDescription: ['', Validators.required],
      ProductPrice: ['', Validators.required]
    });
    this.errorMessage = '';
  }

  scrollTo(el: Element): void {
    if (el) {
      el.scrollIntoView({behavior: 'smooth', block: 'center'});
    }
  }

  scrollToError(): void {
    const firstElementWithError = document.querySelector('.ng-invalid[formControlName]');
    this.scrollTo(firstElementWithError);
  }

  addProduct() {
    console.log('add product:', this.form.value);
    if (this.form.invalid) {
      this.scrollToError();
      return;
    }
    this.prodSevice.addProduct(this.form.value as Product)
    .subscribe(
      () => {
          console.log('Done');
          this.router.navigate(['/products']);
      },
      error => {
        console.log(error);
        this.errorMessage = error;

      }
    );
  }

}

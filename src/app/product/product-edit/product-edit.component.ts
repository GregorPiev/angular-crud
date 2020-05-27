import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductsService } from '../../service/products.service';

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.scss']
})
export class ProductEditComponent implements OnInit {
  form: FormGroup;
  // product: any = {};
  constructor(
    private fb: FormBuilder,
    private ps: ProductsService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.form = this.fb.group({
      id: [],
      ProductName: ['', Validators.required],
      ProductDescription: ['', Validators.required],
      ProductPrice: ['', Validators.required]
    });

    this.route.params.subscribe(params => {
      this.ps.getProduct(params['id']).subscribe(res => {
        console.log('Res:', res);
        if (res.length) {
          this.form.setValue(res[0]);
        }
      });
    });
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

  update() {
    console.log('Form:', this.form);
    if (this.form.invalid) {
      this.scrollToError();
      return;
    }

    this.ps.updateProduct(this.form.value as any).subscribe(
      (res) => {
        this.router.navigate(['/products']);
      }
    );
  }

}

import {Component, OnInit,} from '@angular/core';
import {ProductType} from "../../../../types/product.type";
import {ProductService} from "../../../shared/services/product.service";
import {Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {catchError, map, of, retry, tap} from "rxjs";

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  constructor(private productService: ProductService, private http: HttpClient, private router: Router) {
  }

  products: ProductType[] = [];
  loading: boolean = false;

  ngOnInit() {
    //  this.products = this.productService.getProducts();
  this.loading = true;
    this.productService.getProducts()
      .pipe(
        tap(() => {
          this.loading = false;
        })
      )
    //  this.http.get<{ data: ProductType[] }>('http://testologia.site/pizzas?extraField=1')
    /*
      .pipe(
        tap((result) => {
          console.log(result);
        }),
        map((result) => (result.data)),

       // catchError(error => {
       // return of([]);
          // throw new Error('omg');
       // }),
        retry(3)
      )

     */
      .subscribe(
        {
          next: (data) => {
            this.products = data;
            console.log('next');
          },
          error: (error) => {
            console.log(error);
            this.router.navigate(['/']);
          }
        }
      )
  }

}


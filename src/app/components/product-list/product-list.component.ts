import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; // necessário para *ngFor
import { ProductService } from '../../core/product.service';
import { Product } from '../../models/product.model';
import { ProductCardComponent } from '../product-card/product-card.component'; // import do componente filho

@Component({
  standalone: true,
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  imports: [CommonModule, ProductCardComponent] // <- adiciona CommonModule e ProductCard
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];

  constructor(private productService: ProductService) {}

  ngOnInit() {
    this.productService.getProducts().subscribe(res => this.products = res);
  }
}

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductListComponent } from '../components/product-list/product-list.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, ProductListComponent],
  templateUrl: './home.page.html',
})
export class HomePageComponent implements OnInit {
  total = 0;

  constructor() {}

  ngOnInit(): void {}
}
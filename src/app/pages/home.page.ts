import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { ProductListComponent } from '../components/product-list/product-list.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, ProductListComponent, RouterLink],
  styles: [`
    .home-container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 2rem;
      min-height: calc(100vh - 80px);
    }

    .page-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 2rem;
      flex-wrap: wrap;
      gap: 1rem;
    }

    .page-title {
      font-size: 2rem;
      font-weight: 700;
      color: var(--text-primary);
      margin: 0;
    }

    .add-products-button {
      background: var(--secondary-color);
      color: white;
      padding: 0.75rem 1.5rem;
      border-radius: var(--border-radius);
      font-weight: 600;
      font-size: 0.875rem;
      transition: var(--transition);
      text-decoration: none;
      display: inline-flex;
      align-items: center;
      gap: 0.5rem;
    }

    .add-products-button:hover {
      background: #059669;
      transform: translateY(-1px);
      box-shadow: var(--shadow-md);
    }

    @media (max-width: 768px) {
      .home-container {
        padding: 1rem;
      }

      .page-header {
        flex-direction: column;
        align-items: stretch;
      }

      .page-title {
        font-size: 1.5rem;
        margin-bottom: 0;
        text-align: center;
      }

      .add-products-button {
        width: 100%;
        justify-content: center;
      }
    }
  `],
  templateUrl: './home.page.html',
})
export class HomePageComponent implements OnInit {
  total = 0;

  constructor(private router: Router) {}

  ngOnInit(): void {}
}
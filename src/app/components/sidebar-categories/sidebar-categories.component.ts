import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductService } from '../../core/product.service';
import { Subject, takeUntil } from 'rxjs';

@Component({
  standalone: true,
  selector: 'app-sidebar-categories',
  imports: [CommonModule],
  styles: [`
    .sidebar { width: 260px; background: var(--bg-white); border-radius: var(--border-radius); box-shadow: var(--shadow-md); padding: 1rem; position: sticky; top: 100px; height: fit-content; }
    .title { font-weight: 700; color: var(--text-primary); margin-bottom: .75rem; }
    .item { padding: .5rem .75rem; border-radius: var(--border-radius); color: var(--text-primary); cursor: pointer; }
    .item:hover, .item.active { background: var(--bg-light); color: var(--primary-color); }
  `],
  template: `
    <div class="sidebar" role="navigation" aria-label="Categorias de produtos">
      <div class="title">Categorias</div>
      <div class="item" [class.active]="selected === null" (click)="select(null)" role="button" [attr.aria-selected]="selected === null">Todas</div>
      <div class="item" *ngFor="let c of categories" [class.active]="selected === c" (click)="select(c)" role="button" [attr.aria-selected]="selected === c">{{ c }}</div>
    </div>
  `
})
export class SidebarCategoriesComponent implements OnInit, OnDestroy {
  @Output() categoryChange = new EventEmitter<string | null>();
  categories: string[] = [];
  selected: string | null = null;
  private destroy$ = new Subject<void>();

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.productService.getProducts()
      .pipe(takeUntil(this.destroy$))
      .subscribe(list => {
        const set = new Set<string>();
        (list || []).forEach(p => set.add(p.category || 'Outros'));
        this.categories = Array.from(set).sort();
      });
  }

  select(cat: string | null) {
    this.selected = cat;
    this.categoryChange.emit(cat);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}



import {Component, computed, signal, WritableSignal} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {DropdownModule} from "primeng/dropdown";
import {TableModule} from "primeng/table";
import {CommonModule} from "@angular/common";
import {CardModule} from "primeng/card";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, DropdownModule, TableModule, CommonModule, CardModule, FormsModule, ReactiveFormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  products: Product[] = [
    {
      id: '1000',
      code: 'f230fh0g3',
      name: 'Bamboo Watch',
      description: 'Product Description',
      image: 'bamboo-watch.jpg',
      price: 65,
      category: 'Accessories',
      quantity: 24,
      inventoryStatus: 'INSTOCK',
      rating: 5
    },
    {
      id: '1001',
      code: 'nvklal433',
      name: 'Black Watch',
      description: 'Product Description',
      image: 'black-watch.jpg',
      price: 72,
      category: 'Accessories',
      quantity: 61,
      inventoryStatus: 'OUTOFSTOCK',
      rating: 4
    },
    {
      id: '1002',
      code: 'zz21cz3c1',
      name: 'Blue Band',
      description: 'Product Description',
      image: 'blue-band.jpg',
      price: 79,
      category: 'Fitness',
      quantity: 2,
      inventoryStatus: 'LOWSTOCK',
      rating: 3
    },
    {
      id: '1002',
      code: 'zz21cz3c1',
      name: 'Berline',
      description: 'GariLangu Vehicle',
      image: 'blue-band.jpg',
      price: 79,
      category: 'Fitness',
      quantity: 2,
      inventoryStatus: 'LOWSTOCK',
      rating: 5
    },
    {
      id: '1003',
      code: '244wgerg2',
      name: 'Blue T-Shirt',
      description: 'Product Description',
      image: 'blue-t-shirt.jpg',
      price: 29,
      category: 'Clothing',
      quantity: 25,
      inventoryStatus: 'INSTOCK',
      rating: 5
    },
    {
      id: '1004',
      code: 'h456wer53',
      name: 'Bracelet',
      description: 'Product Description',
      image: 'bracelet.jpg',
      price: 15,
      category: 'Accessories',
      quantity: 73,
      inventoryStatus: 'INSTOCK',
      rating: 4
    },
    {
      id: '1005',
      code: 'av2231fwg',
      name: 'Brown Purse',
      description: 'Product Description',
      image: 'brown-purse.jpg',
      price: 120,
      category: 'Accessories',
      quantity: 0,
      inventoryStatus: 'OUTOFSTOCK',
      rating: 4
    },
  ];
  categories = ['Accessories', 'Fitness', 'Clothing'];
  rating = [1, 2, 3, 4, 5];
  selectedCategorie: string | undefined;
  selectedRating: number | undefined;
  parameter: WritableSignal<SearchParameter> = signal( {'category': undefined, 'rating': undefined});
  displayProducts = computed(() => {
    return this.filterProduct();
  });
  private result = this.products;

  selectedFieldEvent(field: string, value: string | number | undefined): void {
    console.log('selected field is ', field, value);
     this.parameter.update((param: SearchParameter) => {
       param[field] = value;
       console.log('parameter is ', param);
       return {...param};
     })
  }

  filterProduct(): Product[] {
    console.log('start filter product');
    if(this.parameter().category != undefined){
     this.result = this.result.filter((product: Product) => {
        return product.category === this.selectedCategorie;
      })
    }
    if(this.parameter().rating != undefined){
      this.result = this.result.filter((product: Product) => {
        return product.rating === this.selectedRating;
      })
    }
    return this.result;
  }
}

export interface Product {
  id?: string;
  code?: string;
  name?: string;
  description?: string;
  price?: number;
  quantity?: number;
  inventoryStatus?: string;
  category?: string;
  image?: string;
  rating?: number;
}

export interface SearchParameter {
  category?: string;
  rating?: number;
  [field: string]: string | number | undefined;
}

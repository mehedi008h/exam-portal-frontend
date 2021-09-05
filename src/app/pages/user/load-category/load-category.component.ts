import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/service/category.service';

@Component({
  selector: 'app-load-category',
  templateUrl: './load-category.component.html',
  styleUrls: ['./load-category.component.css']
})
export class LoadCategoryComponent implements OnInit {
  categories: any;

  constructor(private _cat: CategoryService) { }

  ngOnInit(): void {
    this._cat.categories().subscribe((data: any) => {
      this.categories = data;
    }, (error) => {
      console.log(error);
    })
  }

}

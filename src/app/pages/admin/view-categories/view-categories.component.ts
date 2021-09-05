import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/service/category.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-categories',
  templateUrl: './view-categories.component.html',
  styleUrls: ['./view-categories.component.css']
})
export class ViewCategoriesComponent implements OnInit {

  categories = [
    {
      id: '',
      title: '',
      description: '',
    }
  ];

  constructor(private _category: CategoryService) { }

  ngOnInit(): void {
    this._category.categories().subscribe(
      (data: any) => {
        //css
        this.categories = data;
        console.log(this.categories);
      },

      (error) => {
        //
        console.log(error);
      }
    );
  }

  deleteCategory(id: any) {
    Swal.fire({
      icon: 'info',
      title: 'Are you sure ?',
      confirmButtonText: 'Delete',
      showCancelButton: true,
    }).then((result) => {
      if (result.isConfirmed) {
        this._category.deleteCategory(id).subscribe((data) => {
          this.categories = this.categories.filter((categories) => categories.id != id);
          Swal.fire('Success', 'Quiz deleted ', 'success');
        }, (error) => {
          Swal.fire('Error', 'Error in deleting quiz', 'error');
        });
      }
    });
  }

}

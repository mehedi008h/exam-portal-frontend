import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CategoryService } from 'src/app/service/category.service';

@Component({
  selector: 'app-add-categories',
  templateUrl: './add-categories.component.html',
  styleUrls: ['./add-categories.component.css']
})
export class AddCategoriesComponent implements OnInit {

  category = {
    title: '',
    description: '',
  };

  constructor(private _category: CategoryService,
    private snack: MatSnackBar) { }

  ngOnInit(): void {
  }
  formSubmit() {
    if (this.category.title.trim() == '' || this.category.title == null) {
      this.snack.open('Title Required !!', 'Ok', {
        duration: 3000, verticalPosition: 'top',
        horizontalPosition: 'right',
      });
      return;
    }

    //all done

    this._category.addCategory(this.category).subscribe(
      (data: any) => {
        this.category.title = '';
        this.category.description = '';
        this.snack.open('Successfully added', 'OK', {
          duration: 3000, verticalPosition: 'top',
          horizontalPosition: 'right',
        });

      },
      (error) => {
        console.log(error);
        this.snack.open('Something went worng!! Try again..', 'OK', {
          duration: 3000, verticalPosition: 'top',
          horizontalPosition: 'right',
        });
      }
    );
  }

}

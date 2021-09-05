import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CategoryService } from 'src/app/service/category.service';
import { QuizService } from 'src/app/service/quiz.service';

@Component({
  selector: 'app-add-quiz',
  templateUrl: './add-quiz.component.html',
  styleUrls: ['./add-quiz.component.css']
})
export class AddQuizComponent implements OnInit {

  category = [
    {
      id: '',
      title: '',
    }
  ]

  quizData = {
    title: '',
    description: '',
    maxMark: '',
    noQuestion: '',
    active: true,
    category: {
      id: '',
    },
  };

  constructor(private cat: CategoryService, private snack: MatSnackBar, private quiz: QuizService) { }

  ngOnInit(): void {
    this.cat.categories().subscribe((data: any) => {
      this.category = data;
      console.log(this.category);
    }, (error) => {
      console.log(error);
    });
  }

  addQuiz() {
    if (this.quizData.title.trim() == '' || this.quizData.title == null) {
      this.snack.open('Title is requred.', 'OK', {
        duration: 3000, verticalPosition: 'top',
        horizontalPosition: 'right',
      });
    }

    this.quiz.addQuiz(this.quizData).subscribe((data) => {
      this.snack.open('Successfully added quiz.', 'OK', {
        duration: 3000, verticalPosition: 'top',
        horizontalPosition: 'right',
      });

      this.quizData = {
        title: '',
        description: '',
        maxMark: '',
        noQuestion: '',
        active: true,
        category: {
          id: '',
        },
      };
    }, (error) => {
      this.snack.open('Something went worng.', 'OK', {
        duration: 3000, verticalPosition: 'top',
        horizontalPosition: 'right',
      });
      console.log(error);
    });
  }
}
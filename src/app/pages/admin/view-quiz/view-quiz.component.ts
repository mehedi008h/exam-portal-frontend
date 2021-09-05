import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { QuizService } from 'src/app/service/quiz.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-quiz',
  templateUrl: './view-quiz.component.html',
  styleUrls: ['./view-quiz.component.css']
})
export class ViewQuizComponent implements OnInit {

  quiz = [
    {
      qId: '',
      title: '',
      description: '',
      maxMark: '',
      noQuestion: '',
      active: '',
      category: {
        title: '',
      }
    }
  ];

  constructor(private _quiz: QuizService, private snack: MatSnackBar) { }

  ngOnInit(): void {
    this._quiz.quiz().subscribe((data: any) => {
      this.quiz = data;
      console.log(this.quiz);
    }, (error) => {
      console.log(error);
    });
  }

  deleteQuiz(qId: any) {
    Swal.fire({
      icon: 'info',
      title: 'Are you sure ?',
      confirmButtonText: 'Delete',
      showCancelButton: true,
    }).then((result) => {
      if (result.isConfirmed) {
        this._quiz.deleteQuiz(qId).subscribe((data) => {
          this.quiz = this.quiz.filter((quiz) => quiz.qId != qId);
          Swal.fire('Success', 'Quiz deleted ', 'success');
        }, (error) => {
          Swal.fire('Error', 'Error in deleting quiz', 'error');
        });
      }
    });
  }

}

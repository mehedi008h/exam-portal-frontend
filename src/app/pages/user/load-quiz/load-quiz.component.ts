import { Component, OnInit } from '@angular/core';
import { QuizService } from 'src/app/service/quiz.service';

@Component({
  selector: 'app-load-quiz',
  templateUrl: './load-quiz.component.html',
  styleUrls: ['./load-quiz.component.css']
})
export class LoadQuizComponent implements OnInit {

  quiz: any;

  constructor(private _quiz: QuizService) { }

  ngOnInit(): void {
    this._quiz.getActiveQuizzes().subscribe((data) => {
      this.quiz = data;
    }, (error) => {
      console.log(error);
    });
  }

}

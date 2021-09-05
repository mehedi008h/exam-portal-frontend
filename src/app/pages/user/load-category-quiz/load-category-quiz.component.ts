import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuizService } from 'src/app/service/quiz.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-load-category-quiz',
  templateUrl: './load-category-quiz.component.html',
  styleUrls: ['./load-category-quiz.component.css']
})
export class LoadCategoryQuizComponent implements OnInit {

  qId: any;
  qTitle: any;
  quiz: any;

  constructor(private _route: ActivatedRoute, private _quiz: QuizService) { }

  ngOnInit(): void {
    this.qId = this._route.snapshot.params.id;
    this.qTitle = this._route.snapshot.params.title;

    this._quiz.getActiveQuizzesOfCategory(this.qId).subscribe((data) => {
      console.log(data);
      this.quiz = data;
    }, (error) => {
      console.log(error);
    })
  }

}

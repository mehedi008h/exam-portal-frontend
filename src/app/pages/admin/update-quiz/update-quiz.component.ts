import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryService } from 'src/app/service/category.service';
import { QuizService } from 'src/app/service/quiz.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-update-quiz',
  templateUrl: './update-quiz.component.html',
  styleUrls: ['./update-quiz.component.css']
})
export class UpdateQuizComponent implements OnInit {

  constructor(private _route: ActivatedRoute,
    private _quiz: QuizService,
    private _cat: CategoryService,
    private _router: Router) { }

  qId = 0;
  quiz: any;
  categorys: any;

  ngOnInit(): void {
    this.qId = this._route.snapshot.params.qid;
    this._quiz.getQuiz(this.qId).subscribe((data: any) => {
      this.quiz = data;
      console.log(this.quiz);
    }, (error) => {
      console.log(error);
    });

    this._cat.categories().subscribe((data: any) => {
      this.categorys = data;
    }, (error) => {
      alert('Error in loading category');
    });
  }

  // update form submit
  public updateData() {
    this._quiz.updateQuiz(this.quiz).subscribe((data: any) => {
      Swal.fire('Success !!', 'Quiz updated', 'success').then((e) => {
        this._router.navigate(['/admin/quiz/']);
      });
    }, (error) => {
      Swal.fire('Faield !!', 'Quiz not updated', 'error');
      console.log(error);
    });
  }

}

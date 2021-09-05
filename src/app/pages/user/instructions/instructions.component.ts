import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { QuizService } from 'src/app/service/quiz.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-instructions',
  templateUrl: './instructions.component.html',
  styleUrls: ['./instructions.component.css']
})
export class InstructionsComponent implements OnInit {

  qId: any;
  quiz: any;

  constructor(private _route: ActivatedRoute, private _quiz: QuizService, private _router: Router) { }

  ngOnInit(): void {
    this.qId = this._route.snapshot.params.qid;
    console.log(this.qId);

    this._quiz.getQuiz(this.qId).subscribe((data) => {
      // console.log(data);
      this.quiz = data;
    }, (error) => {
      console.log(error);
    });
  }

  startQuiz() {
    Swal.fire({
      title: 'Do you want to start the quiz?',

      showCancelButton: true,
      confirmButtonText: `Start`,
      denyButtonText: `Don't save`,
      icon: 'info',
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        this._router.navigate(['/start-quiz/' + this.qId]);
      } else if (result.isDenied) {
        Swal.fire('Changes are not saved', '', 'info');
      }
    });
  }

}

import { LocationStrategy } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuestionService } from 'src/app/service/question.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-start-quiz',
  templateUrl: './start-quiz.component.html',
  styleUrls: ['./start-quiz.component.css']
})
export class StartQuizComponent implements OnInit {

  qid: any;
  questions: any;

  marksGot = 0;
  correctAnswers = 0;
  attempted = 0;

  isSubmit = false;
  timer: any;

  constructor(private locationSt: LocationStrategy,
    private _route: ActivatedRoute,
    private _question: QuestionService) { }

  ngOnInit(): void {
    this.preventBackButton();
    this.qid = this._route.snapshot.params.qid;
    console.log(this.qid);
    this.loadQuestions();
  }

  loadQuestions() {
    this._question.getQuestionsOfQuizForTest(this.qid).subscribe((data: any) => {
      this.questions = data;
      this.timer = this.questions.length * 2 * 60;

      console.log(this.questions);
      this.startTimer();
    }, (error) => {
      Swal.fire('Error', 'Error in loading questions of quiz', 'error');
      console.log(error);
    })
  }

  preventBackButton() {
    history.pushState(null, location.href);
    this.locationSt.onPopState(() => {
      history.pushState(null, location.href);
    });
  }

  submitQuiz() {
    Swal.fire({
      title: 'Do you want to submit the quiz?',
      showCancelButton: true,
      confirmButtonText: `Submit`,
      icon: 'info',
    }).then((e) => {
      if (e.isConfirmed) {
        this.evalQuiz();
      }
    });
  }

  startTimer() {
    let t = window.setInterval(() => {
      //code
      if (this.timer <= 0) {
        this.evalQuiz();
        clearInterval(t);
      } else {
        this.timer--;
      }
    }, 1000);
  }

  getFormattedTime() {
    let mm = Math.floor(this.timer / 60);
    let ss = this.timer - mm * 60;
    return `${mm} min : ${ss} sec`;
  }

  evalQuiz() {
    this._question.evalQuiz(this.questions).subscribe((data) => {
      this.questions = data;
      console.log(this.questions.attempted);
      this.isSubmit = true;
    }, (error) => {
      console.log(error);
    });
    // this.isSubmit = true;
    // this.questions.forEach((q: any) => {
    //   if (q.givenAnswer == q.answer) {
    //     this.correctAnswers++;
    //     let markSingle = this.questions[0].quiz.maxMark / this.questions.length;
    //     this.marksGot += markSingle;
    //   }
    //   if (q.givenAnswer.trim() != '') {
    //     this.attempted++;
    //   }
    // });
  }
}

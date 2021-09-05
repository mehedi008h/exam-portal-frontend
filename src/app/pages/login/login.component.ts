import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/service/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginData = {
    username: '',
    password: '',
  };

  constructor(private snack: MatSnackBar, private login: LoginService, private router: Router) { }

  ngOnInit(): void {
  }

  formSubmit() {
    console.log("login button clicked");

    if (this.loginData.username.trim() == '' || this.loginData.username == null) {
      this.snack.open('Username is required!!', 'OK', {
        duration: 3000, verticalPosition: 'top',
        horizontalPosition: 'right',
      });

      return;
    }

    if (this.loginData.password.trim() == '' || this.loginData.password == null) {
      this.snack.open('Password is required!!', 'OK', {
        duration: 3000, verticalPosition: 'top',
        horizontalPosition: 'right',
      });

      return;
    }

    // request to server to generate token 
    this.login.generateToken(this.loginData).subscribe(
      (data: any) => {
        console.log("Success");
        console.log(data);
        this.snack.open('Successfully logged in!!', 'OK', {
          duration: 3000, verticalPosition: 'top',
          horizontalPosition: 'right',
        });

        //login
        this.login.loginUser(data.token);

        this.login.getCurrentUser().subscribe((user: any) => {
          this.login.setUser(user);
          console.log(user);

          // redirect admin and user
          if (this.login.getUserRole() == 'ADMIN') {
            // admin dashboard
            // window.location.href = '/admin';
            this.router.navigate(['admin']);
            this.login.loginStatusSubject.next(true);
          } else if (this.login.getUserRole() == 'NORMAL') {
            // user dashboard
            // window.location.href = '/user-dashboard';
            this.router.navigate(['user-dashboard']);
            this.login.loginStatusSubject.next(true);
          } else {
            this.login.logout();
          }
        });
      },
      (error) => {
        console.log("Error");
        console.log(error);
        this.snack.open('Something went worng!! Try again..', 'OK', {
          duration: 3000, verticalPosition: 'top',
          horizontalPosition: 'right',
        });
      }
    );
  }
}

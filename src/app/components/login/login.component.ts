import { Component } from '@angular/core';
import { UsernamePasswordFormComponent } from "../username-password-form/username-password-form.component";
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, UsernamePasswordFormComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  constructor(private authService: AuthService) { }

  login(username:string, password:string) {
    this.authService.login(username, password)
  }

  // signUp(username:string, password:string) {
  //   this.authService.signUp(username, password)
  //   // this.auth.signUp('seanrodriguez900@gmail.com', '@Abcd1234').catch((error) => {console.log(error)});
  // }

}

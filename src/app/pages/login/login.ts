import { Component } from '@angular/core';
import { LoginComponentLayout } from '../../components/layouts/login-layout/login-layout';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [LoginComponentLayout],
  templateUrl: './login.html',
  styleUrl: './login.scss'
})
export class Login {

}

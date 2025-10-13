import { Component } from '@angular/core';
import { RegisterComponentLayout } from '../../components/layouts/register-layout/register-layout';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [RegisterComponentLayout],
  templateUrl: './register.html',
  styleUrl: './register.scss'
})
export class Register {

}

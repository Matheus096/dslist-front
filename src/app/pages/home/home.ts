import { Component } from '@angular/core';
import { HomeComponentLayout } from '../../components/home-layout/home-layout';
import { Navbar } from '../../components/navbar/navbar';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HomeComponentLayout, Navbar],
  templateUrl: './home.html',
  styleUrl: './home.scss'
})
export class Home {

}

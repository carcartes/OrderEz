import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-buscar',
  templateUrl: './buscar.page.html',
  styleUrls: ['./buscar.page.scss'],
  standalone: false
})
export class BuscarPage implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  navigateToCategory(category: string) {
    this.router.navigate(['/categoria', category]);
  }

}

import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html', // aponta para o arquivo HTML
})
export class HomePageComponent implements OnInit {
  total = 0; // exemplo de variável que você pode usar no template

  constructor() {}

  ngOnInit(): void {}
}

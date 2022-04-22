import { Ser } from './../ser';

import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.component.html',
  styleUrls: ['./search-page.component.css'],
})
export class SearchPageComponent implements OnInit {
  constructor(public service: Ser) {}

  find(s: string) {
    this.service.s = s;
    this.service.Emit.emit(s);
  }
  ngOnInit(): void {}
}

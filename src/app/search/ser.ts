import { AuthService } from './../autenticazione/auth.service';
import { Injectable, Output, EventEmitter } from '@angular/core';
import { Data } from '../data.model';

@Injectable({
  providedIn: 'root',
})
export class Ser {
  Admin = false;
  s!: string;
  vetD: Data[] = [];
  @Output() Emit: EventEmitter<string> = new EventEmitter<string>();
  @Output() Log: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() dati: EventEmitter<Data[]> = new EventEmitter<Data[]>();

  constructor() {}

  getVet() {
    return this.s;
  }

  toString() {
    console.log(this.s);
  }
  setMode(b: boolean) {
    this.Admin = b;
    this.Log.emit(b);
  }
}

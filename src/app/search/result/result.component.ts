import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/autenticazione/auth.service';
import { Ser } from './../ser';
import { HttpClient } from '@angular/common/http';
import { Component, Injectable, OnInit } from '@angular/core';
import { Data } from 'src/app/data.model';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.css'],
})
export class ResultComponent implements OnInit {
  userSub!: Subscription;
  isAuthenticated = false;
  vet!: string; // stringhe della ricerca
  vetD: Data[] = []; // vettore dati filtrati dal db

  Admin!: boolean;
  pagine: number[] = [];
  dimdb!: number; //dimdb
  indice = 0;
  caricato = false;

  constructor(
    private http: HttpClient,
    private ser: Ser,
    private root: Router,
    private auth: AuthService
  ) {}

  ngOnInit(): void {
    this.ser.Emit.subscribe((item) => this.avvio(item));
    this.userSub = this.auth.user.subscribe((user) => {
      this.Admin = !!user; //!user ? false : true
    });
  }

  route() {
    this.root.navigate(['newData']);
  }
  setDati(dati: Data[]) {
    this.vetD.push(...dati);

    this.caricato = true;
    this.npagine();
  }

  getDati() {
    let url = 'http://localhost:3000/ricerca';
    const headers = { Authorization: 'Bearer ' + this.auth.tocken };

    this.http
      .get<Data[]>(url, {
        headers,
        params: {
          q: this.vet,
        },
      })
      .subscribe((data) => {
        this.setDati(data);
      });
  }

  avvio(s: string) {
    this.caricato = false;
    this.pagine = [];
    this.vetD = [];

    this.vet = s;

    this.getDati();
  }
  npagine() {
    let va = this.vetD.length;
    va = va / 5;

    for (let i = 0; i < va; i++) {
      this.pagine.push(i + 1);
    }
  }

  contatore(c: number) {
    this.indice = 0;
    if (c === 0) {
      return;
    }
    this.indice = c * 5;
  }
}

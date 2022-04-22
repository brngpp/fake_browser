import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/autenticazione/auth.service';

import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

import { Data } from '../data.model';

@Component({
  selector: 'app-new-data',
  templateUrl: './new-data.component.html',
  styleUrls: ['./new-data.component.css'],
})
export class NewDataComponent implements OnInit {
  Admin=false;
  previewActive: boolean = false;
  userSub!: Subscription;
  id!: number;
  titoloPreview: string = '';
  chiaviPreview: string = '';
  urlPreview: string = '';
  descrizionePreview: string = '';
  dato_form = new FormGroup({
    chiavi: new FormControl(null, Validators.required),
    titolo: new FormControl(null, Validators.required),
    descrizione: new FormControl(null, Validators.required),
    url: new FormControl(null, Validators.required),
  });

  constructor(
    private http: HttpClient,
    
    private auth: AuthService
  ) {}

  ngOnInit(): void {
   
    this.userSub = this.auth.user.subscribe(user => {
      this.Admin = !!user; //!user ? false : true
     
    });
  }

  dimDB() {
    let v = [];
    const headers = { Authorization: 'Bearer ' + this.auth.tocken };
    this.http.get<Data[]>('http://localhost:3000/ricerca', {headers}).subscribe((data) => {
      v = data;

      this.id = v.length;
      this.id = Math.ceil(this.id);
    });
  }
  aggiungi(titolo: string, chiavi: string, descrizione: string, url: string) {
    let dato: Data = new Data(chiavi, this.id, titolo, descrizione, url);
    const headers = { Authorization: 'Bearer ' + this.auth.tocken };
    this.http
      .post('http://localhost:3000/ricerca', dato, { headers })
      .subscribe(() => alert('CARICATO'));
  }

  onPreviewSwitch() {
    this.previewActive = !this.previewActive;
  }
}

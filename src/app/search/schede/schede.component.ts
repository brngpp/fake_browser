import { AuthService } from 'src/app/autenticazione/auth.service';
import { ResultComponent } from './../result/result.component';
import { HttpClient } from '@angular/common/http';
import { Ser } from './../ser';
import { Component, Input, OnInit } from '@angular/core';
import { Data } from 'src/app/data.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-schede',
  templateUrl: './schede.component.html',
  styleUrls: ['./schede.component.css'],
})
export class SchedeComponent implements OnInit {
  @Input() dato!: Data;
  Admin!: boolean;
  userSub!: Subscription;
  constructor(
    private ser: Ser,
    private http: HttpClient,
    private res: ResultComponent,
    private auth: AuthService
  ) {}

  ngOnInit(): void {
    this.ser.Log.subscribe((bool) => (this.Admin = bool));
    this.userSub = this.auth.user.subscribe((user) => {
      this.Admin = !!user; //!user ? false : true
    });
  }

  delete() {
    let url = 'http://localhost:3000/ricerca/' + this.dato.id;
    const headers = { Authorization: 'Bearer ' + this.auth.tocken };
    this.http.delete(url, { headers }).subscribe(() => {
      
      this.ser.Emit.emit(this.ser.s);
    });
  }
}

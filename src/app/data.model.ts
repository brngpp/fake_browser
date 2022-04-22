export class Data {
  chiavi!: string;
  id!: number;
  titolo!: string;
  descrizione!: string;
  url!: string;

  constructor(
    chiavi: string,
    id: number,
    titolo: string,
    descrizione: string,
    url: string
  ) {
    this.chiavi = chiavi;
    this.id = id;
    this.titolo = titolo;
    this.descrizione = descrizione;
    this.url = url;
  }
}

export class User {
  constructor(private _tocken: string, private _tockenExpirationDate: Date) {}

  get tocken() {
    if (
      !this._tockenExpirationDate ||
      new Date() > this._tockenExpirationDate
    ) {
      return null;
    }
    return this._tocken;
  }
}

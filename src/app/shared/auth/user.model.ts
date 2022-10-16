export class User {
  constructor(
    public name: string,
    public username: string,
    private _token: string,
    private _tokenExpDate: Date,
    public image: string
  ) {}

  get token() {
    if (!this._tokenExpDate || new Date() > this._tokenExpDate) {
      return undefined;
    }
    return this._token;
  }
}

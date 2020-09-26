export class ResponseModel<T>{
  constructor(public Body: T) {}
  IsSuccessful: boolean = true;
  Status: number = 200;
}

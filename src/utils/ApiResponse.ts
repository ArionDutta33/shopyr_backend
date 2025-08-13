export class ApiResponse<T> {
  statusCode: number;
  data: T;
  message: string;

  constructor(statusCode: number, data: T, message = "Success") {
    this.statusCode = statusCode;
    this.data = data;
    this.message = message;
  }
}

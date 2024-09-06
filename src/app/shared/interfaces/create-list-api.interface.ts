export interface ICreateListApiInterface {
  name: string;
  url: string;
  body?: string;
  method: string;
  headers?: Array<
  {
    property: string;
    value: string;
  }>;
}

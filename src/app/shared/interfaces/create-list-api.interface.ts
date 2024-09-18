export interface ICreateListApiInterface {
  id: string;
  alias: string;
  url: string;
  corpo?: string;
  metodo: string;
  cabecalho?: Array<
  {
    propriedade: string;
    valor: string;
  }>;
}

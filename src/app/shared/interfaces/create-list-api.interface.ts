export interface ICreateListApiInterface {
  id: number;
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

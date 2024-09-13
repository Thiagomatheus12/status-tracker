export interface ICreateListApiInterface {
  nome: string;
  url: string;
  corpo?: string;
  metodo: string;
  cabecalho?: Array<
  {
    propriedade: string;
    valor: string;
  }>;
}

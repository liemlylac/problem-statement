export interface ImportInterface {
  import(data: any, maxItemPerQueue: number): Promise<any> | void;
}

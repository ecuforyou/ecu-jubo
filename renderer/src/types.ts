export interface ITable {
  rows: number;
  cols: number;
  data: string[];
}

export type Metadata = {
  [key: string]: string;
};
export type RawJuboData = {
  timetable: ITable;
  evangelize: ITable;
  notice: ITable;
  orders: ITable;
  metadata: ITable;
};
export type JuboData = Omit<RawJuboData, 'metadata'> & {
  metadata: Metadata;
};

export type SheetName = keyof JuboData;

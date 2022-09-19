export default interface ICar {
  name:string;
  color: string;
  id: number;
  velocity?: number;
  distance?: number;
  finishTime? : number;
  status: string;
}

export interface IWinner {
  id:number,
  wins: number,
  time: number,
  name:string,
  color:string,
}

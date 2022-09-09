/* export interface IUsuario {
    role: String;
    id: Number;

} */

export interface IReqUser {
    status: number;
    data:   ReqUser[];
  }
  
export interface ReqUser {
    id:           number;
    name:         string;
    email:        string;
    phone:        null;
    role:         number;
  }

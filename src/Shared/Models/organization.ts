import { client } from "./client";

export class organization {
      id :number
      organizationName: string
      organizationCode :string
      address:string
      location :string;
      lat:number;
      lng:number;
      isDeleted:boolean
      clients:client[]
}

// export class OrganizationVM {
//       organizationName: string;
// }
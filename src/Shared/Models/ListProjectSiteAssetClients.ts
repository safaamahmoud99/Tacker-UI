import { client } from "./client"

export class ListProjectSiteAssetClients {
    id:number
    warrantyPeriod:number
    warrantyStartDate:string
    serialNumber:string
    supplierId:number
    supplierName:string
    days:number
    assetId:number
    assetName:string
    ProjectSiteId:number
    ProjectId:number
    ProjectName:string
    siteId:number
    siteName:string
    clients:client[]
}
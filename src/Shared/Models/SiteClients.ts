import { client } from "./client"

export class SiteClients {
    id: number
    siteId: number
    projectSiteId:number
    siteName: string
    clients: client[]
}
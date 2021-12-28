import { stackholder } from '../Models/stackeholder'
import { mileStone } from '../Models/mileStone';
import { projectTeam } from '../Models/projectTeam';
import { ProjectDocuments } from '../Models/ProjectDocuments';
export class project {
  id: number;
  projectName: string
  projectCode: string
  projectTypeId: number
  projectTypeName: string
  cost: number
  projectPeriod: number
  clientName: string
  clientMobile: string
  organizationName: string
  planndedStartDate: string
  actualStartDate: string
  planndedEndDate: string
  actualEndDate: string
  description: string
  IsDeleted: boolean
  organizationId: number
  employeeId: number
  clientId: number
  startDate:Date
  endtDate:Date
  RequestOpenedLength: any
  RequestClosedLength: any
  RequestInProgressLength: any

  listOfStackholders: stackholder[] ///Extra to show stackholders for each project
  listOfmilestones: mileStone[] ///Extra to show milestone for each project
  listofprojectteam: projectTeam[] ///Extra to show teams for each project
  listOfdocuments: ProjectDocuments[] ///Extra to show documents for each project

}
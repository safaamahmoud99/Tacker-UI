export const environment = {
  urlAddress:'http://10.10.0.129/TrackerAPI',
  urlAddress4200:'http://10.10.0.129:7070/#/',
  Domain:'http://10.10.0.129/TrackerAPI/',
  project: 'http://10.10.0.129/TrackerAPI/api/project',
  DeleteProject:'http://10.10.0.129/TrackerAPI/api/project/SoftDelete/',
  stackeholders: 'http://10.10.0.129/TrackerAPI/api/Stackeholders/',
  GetAllStackholdersByProjectID: 'http://10.10.0.129/TrackerAPI/api/Stackeholders/GetStackeholdersByProjectId/',
  postListOfStackholders: 'http://10.10.0.129/TrackerAPI/api/Stackeholders/',
  postListOfMilestoness: 'http://10.10.0.129/TrackerAPI/api/MileStones/',
  ProjectTeams: 'http://10.10.0.129/TrackerAPI/api/ProjectTeam/',
  GetProjectTeamsByProjectPositionId: 'http://10.10.0.129/TrackerAPI/api/ProjectTeam/GetProjectTeamsByProjectPositionId/',
  organizations: 'http://10.10.0.129/TrackerAPI/api/Organizations/',
  clients: 'http://10.10.0.129/TrackerAPI/api/Clients/',
  employees: 'http://10.10.0.129/TrackerAPI/api/Employees/',
  requests: 'http://10.10.0.129/TrackerAPI/api/Request/',
  requestStatus: 'http://10.10.0.129/TrackerAPI/api/RequestStatus/',
  requestTypes: 'http://10.10.0.129/TrackerAPI/api/RequestTypes/',
  requestPeriorities: 'http://10.10.0.129/TrackerAPI/api/RequestPeriorities/',
  department: 'http://10.10.0.129/TrackerAPI/api/Departments/',
  requestSubCategory: 'http://10.10.0.129/TrackerAPI/api/RequestSubCategory/',
  requestSubCategoryById:'http://10.10.0.129/TrackerAPI/api/RequestSubCategory/',
  filterSubCategoriesByCategoryId:'http://10.10.0.129/TrackerAPI/api/RequestSubCategory/GetRequestSubCategoryDTOByCatId/',
  editrequestSubCategory:'http://10.10.0.129/TrackerAPI/api/RequestSubCategory/',
  requestCategory: 'http://10.10.0.129/TrackerAPI/api/RequestCategory/',
  getCategory:'http://10.10.0.129/TrackerAPI/api/RequestCategory/',
  updateCategory:'http://10.10.0.129/TrackerAPI/api/RequestCategory/',
  projectPositions: 'http://10.10.0.129/TrackerAPI/api/ProjectPositions/',
  getDepartmentByEmpID: 'http://10.10.0.129/TrackerAPI/api/Departments/GetDepartmentByEmployeeId/',
  projectTypes: 'http://10.10.0.129/TrackerAPI/api/ProjectTypes/',
  asset: 'http://10.10.0.129/TrackerAPI/api/Assets/',
  GetAllRequestByClientId: 'http://10.10.0.129/TrackerAPI/api/Request/GetAllRequestByClientId/',
  reqMode: 'http://10.10.0.129/TrackerAPI/api/RequestModes/',
  GetAllMilestonsByProjectId: 'http://10.10.0.129/TrackerAPI/api/MileStones/GetMileStonesByProjectId/',
  GetAllTeamsByProjectId: 'http://10.10.0.129/TrackerAPI/api/ProjectTeam/GetProjectTeamsByProjectId/',
  GetAllDocumentByProjectId: 'http://10.10.0.129/TrackerAPI/api/ProjectDocument/GetProjectDocumentsByProjectId/',
  User: 'http://10.10.0.129/TrackerAPI/api',
  getMileStoneById:'http://10.10.0.129/TrackerAPI/api/MileStones/',
  postProjectDocumentByProjectID: 'http://10.10.0.129/TrackerAPI/api/ProjectDocument/SaveDocument',
  clientCanRequest:'http://10.10.0.129/TrackerAPI/api/project/clientCanRequest/',
  updateMileStoneByid:'http://10.10.0.129/TrackerAPI/api/MileStones/updateMileStoneById/',
  uploadFile: 'http://10.10.0.129/TrackerAPI/api/ProjectDocument/uploadfile/',
  deletestakeholder: 'http://10.10.0.129/TrackerAPI/api/Stackeholders/',
  GetProjectForRequest:'http://10.10.0.129/TrackerAPI/api/project/GetProjectForRequest',
  canreqbyprojectID :'http://10.10.0.129/TrackerAPI/api/project/canreqbyprojeID/',
  updatestackholder:'http://10.10.0.129/TrackerAPI/api/Stackeholders/updatestakehodersbyID/',
  getStackholderbyId:'http://10.10.0.129/TrackerAPI/api/Stackeholders/',
  deletemilestone: ' http://10.10.0.129/TrackerAPI/api/MileStones/',
  deleteteam: 'http://10.10.0.129/TrackerAPI/api/ProjectTeam/',
  deletedocument: 'http://10.10.0.129/TrackerAPI/api/ProjectDocument/',
  updatestakeholdersbyprojectid: 'http://10.10.0.129/TrackerAPI/api/Stackeholders/updatestakehodersByProjectId/1',
  updateteamsbyprojectid: 'http://10.10.0.129/TrackerAPI/api/ProjectTeam/updateteamsByProjectId/1',
  updatemilestonebyprojectid: 'http://10.10.0.129/TrackerAPI/api/MileStones/PutmilestonesDTOByProjectId/1',
  updatedocumectsbyprojectid: 'http://10.10.0.129/TrackerAPI/api/ProjectDocument/PutDocumentsDTOByProjectId/',
  updateProject: 'http://10.10.0.129/TrackerAPI/api/Project/',
  GetProjectById: 'http://10.10.0.129/TrackerAPI/api/Project/',
  uploadImage: 'http://10.10.0.129/TrackerAPI/api/UploadImage/uploadimage/',
  addRequstImages: 'http://10.10.0.129/TrackerAPI/api/RequestImages',
  RequestDescription: 'http://10.10.0.129/TrackerAPI/api/RequestDescription/',
  assignedRequests: 'http://10.10.0.129/TrackerAPI/api/AssignedRequests/',
  getTeambyId:'http://10.10.0.129/TrackerAPI/api/Teams/',
  addteams:'http://10.10.0.129/TrackerAPI/api/Teams/',
  GetEmployeessByTeamId:'http://10.10.0.129/TrackerAPI/api/ProjectTeam/GetEmployeessByTeamId/',
  GetRequestImageByRequestId:'http://10.10.0.129/TrackerAPI/api/RequestImages/GetRequestImageByRequestId/',
  GetAllRequestByEmployeeId:'http://10.10.0.129/TrackerAPI/api/AssignedRequests/GetAllRequestByEmployeeId/',
  GetAllProjectTeamsByProjectID:'http://10.10.0.129/TrackerAPI/api/ProjectTeam/GetProjectTeamsByProjectId/',
  GetAllProjectTeamIdByProjectIDandTeamIdAndPoaitionId:'http://10.10.0.129/TrackerAPI/api/ProjectTeam/GetProjectTeamByProjectIdAndTeamIdAndProjectPositionId/',
  GetProjectTeamByProjectPositionIdAndEmployeeId:'http://10.10.0.129/TrackerAPI/api/ProjectTeam/GetProjectTeamByProjectPositionIdAndEmployeeId/',
  GetAllRequestByProjectTeamId:'http://10.10.0.129/TrackerAPI/api/Request/GetAllRequestByProjectTeamId/',
  GetAllProjectsByEmployeeId:'http://10.10.0.129/TrackerAPI/api/project/GetAllProjectsByEmployeeId/',
  GetClientsByEmployeeId:'http://10.10.0.129/TrackerAPI/api/project/GetClientsByEmployeeId/',
  GetAllProjectTeamsByProjectIds:'http://10.10.0.129/TrackerAPI/api/ProjectTeam/GetAllProjectTeamsByProjectIds/',
  Problems:'http://10.10.0.129/TrackerAPI/api/Problems/',
  updateRequest:'http://10.10.0.129/TrackerAPI/api/Request/',
  RequestProblems:'http://10.10.0.129/TrackerAPI/api/RequestProblems/',
  GetProblemByEmployeeIdAndRequestId:'http://10.10.0.129/TrackerAPI/api/RequestProblems/GetProblemByEmployeeIdAndRequestId/',
  GetAllDescByRequestID:'http://10.10.0.129/TrackerAPI/api/RequestDescription/GetAllDescriptionsByRequestId/',
  getImageByName:'http://10.10.0.129/TrackerAPI/api/Employees/getImage/',
  GetEmployeeByDepartmentId:'http://10.10.0.129/TrackerAPI/api/Employees/GetEmployeeByDepartmentId/',
  GetAllProjectsByProjectTypeId:'http://10.10.0.129/TrackerAPI/api/Project/GetAllProjectsByProjectTypeId/',
  GetAllRequestByRequestStatus:'http://10.10.0.129/TrackerAPI/api/Request/GetAllRequestByRequestStatus/',
  CountProject:'http://10.10.0.129/TrackerAPI/api/Request/CountProjects/',
  CountInProgressProjects:'http://10.10.0.129/TrackerAPI/api/Request/CountInProgressProjects/',
  CountOpenProjects:'http://10.10.0.129/TrackerAPI/api/Request/CountOpenProjects/',
  CountClosedProjects:'http://10.10.0.129/TrackerAPI/api/Request/CountClosedProjects/',
  GetAllRequestByRequestStatusAndProjectTeamId:'http://10.10.0.129/TrackerAPI/api/Request/GetAllRequestByRequestStatusAndProjectTeamId/',
 
 
  GetClientByProjectId: 'http://10.10.0.129/TrackerAPI/api/project/GetClientByProjectId/',
  Sites:'http://10.10.0.129/TrackerAPI/api/Sites',
  Origins:'http://10.10.0.129/TrackerAPI/api/Origins',
  Suppliers:'http://10.10.0.129/TrackerAPI/api/Suppliers',
  DueDateCategory:'http://10.10.0.129/TrackerAPI/api/DueDateCategory',
  Brand:'http://10.10.0.129/TrackerAPI/api/Brand',
  ProjectSites:'http://10.10.0.129/TrackerAPI/api/ProjectSites',
  GetAllSitesByProjectId:'http://10.10.0.129/TrackerAPI/api/ProjectSites/GetAllSitesByProjectId',
  SiteClients:'http://10.10.0.129/TrackerAPI/api/SiteClients',
  GetAllUnassignedClients:'http://10.10.0.129/TrackerAPI/api/SiteClients/GetAllUnassignedClients',
  GetAllAssignedClients:'http://10.10.0.129/TrackerAPI/api/SiteClients/GetAllAssignedClients',
  GetAllAssignedClientsByProjectId:'http://10.10.0.129/TrackerAPI/api/SiteClients/GetAllAssignedClientsByProjectId',
  GetAllUnassignedClientsforAnotherProjectAndAssignedByThisProjectId:'http://10.10.0.129/TrackerAPI/api/SiteClients/GetAllUnassignedClientsforAnotherProjectAndAssignedByThisProjectId',
  GetProjectSiteByProjectIdAndSiteId:'http://10.10.0.129/TrackerAPI/api/ProjectSites/GetProjectSiteByProjectIdAndSiteId',
  ProjectSiteAsset:'http://10.10.0.129/TrackerAPI/api/ProjectSiteAsset',
  GetAllProjectSiteAssetBySiteId:'http://10.10.0.129/TrackerAPI/api/ProjectSiteAsset/GetAllProjectSiteAssetBySiteId',
  GetAllProjectSiteAssetByProjectId:'http://10.10.0.129/TrackerAPI/api/ProjectSiteAsset/GetAllProjectSiteAssetByProjectId',
  OrganizationClients:'http://10.10.0.129/TrackerAPI/api/OrganizationClients',
  GetAllUnassignedClientsByOrganization:'http://10.10.0.129/TrackerAPI/api/OrganizationClients/GetAllUnassignedClients',
  GetAllAssignedClientsByOrganizationId:'http://10.10.0.129/TrackerAPI/api/OrganizationClients/GetAllAssignedClientsByOrganizationId',
  GetAllUnassignedClientsforAnotherOrganizationAndAssignedByThisOrganizationId:'http://10.10.0.129/TrackerAPI/api/OrganizationClients/GetAllUnassignedClientsforAnotherOrganizationAndAssignedByThisOrganizationId',
  GetAllAssignedClientsDataByOrganizationId:'http://10.10.0.129/TrackerAPI/api/OrganizationClients/GetAllAssignedClientsDataByOrganizationId',
  GetOrganizationProjectsByClientId:'http://10.10.0.129/TrackerAPI/api/OrganizationClients/GetOrganizationProjectsByClientId',
  GetAllRequestByProjectId: 'http://10.10.0.129/TrackerAPI/api/Request/GetAllRequestByProjectId/',
  GetAllAssetsSerialsByAssetId:'http://10.10.0.129/TrackerAPI/api/ProjectSiteAsset/GetAllAssetsSerialsByAssetId',
  GetProjectsByClientId: 'http://10.10.0.129/TrackerAPI/api/project/GetProjectsByClientId/',
  GetAllRequestByProjectSiteAssetId:'http://10.10.0.129/TrackerAPI/api/Request/GetAllRequestByProjectSiteAssetId/',
  GetProjectSiteAssetBySerialNumber:'http://10.10.0.129/TrackerAPI/api/ProjectSiteAsset/GetProjectSiteAssetBySerialNumber',
  getCitiesbygovid:'http://10.10.0.129/TrackerAPI/api/Cities/Getgovbycity/',
  Cities:'http://10.10.0.129/TrackerAPI/api/Cities',
  Governorates:'http://10.10.0.129/TrackerAPI/api/Governorates',
  GetAllAssignesitesbyclient:'http://10.10.0.129/TrackerAPI/api/SiteClients/GetAllAssignesitesbyclient',
  GetAllAssetsSerialsByProjectId:'http://10.10.0.129/TrackerAPI/api/ProjectSiteAsset/GetAllAssetsSerialsbyProject',
 
 
 
 
 
 
 
 
 
 
  production: true
};

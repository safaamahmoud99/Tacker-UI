import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SignupComponent } from './Components/Signup/signup.component';
import { SideNavComponent } from './Components/Side-nav/side-nav.component'
import { HomeComponent } from './Components/Home/home.component';
import { NavBarComponent } from './Components/Nav-bar/nav-bar.component';
import { AllProjectsComponent } from '../app/Components/Projects/all-projects/all-projects.component'
import { CreateProjectComponent } from '../app/Components/Projects/create-project/create-project.component'

import { UpdateProjectComponent } from '../app/Components/Projects/update-project/update-project.component'
// import { CategoryComponent } from './Components/Request/Categories/category/category.component';
// import { ClientsComponent } from './Components/Clients/clients.component';
// import { DepartmentComponent } from './Components/Department/department.component';
import { CategoryComponent } from './Components/Request/Categories/category/category.component';
import { ClientsComponent } from './Components/ClientComponents/Add-clients/clients.component';
import { CreateRequesteComponent } from './Components/Request/Manager-Create-requeste/create-requeste.component';
import { DepartmentComponent } from './Components/DepartmentComponents/Department/department.component';
import { ChangePaswwordComponent } from './Components/Profile/Change-paswword/change-paswword.component';
import { AllUsersComponent } from './Components/All-users/all-users.component';
import { DisplayAllEmployeesComponent } from './Components/employee/display-all-employees/display-all-employees.component';
import { AddEmployeeComponent } from './Components/employee/add-employee/add-employee.component';
import { EditEmployeeComponent } from './Components/employee/edit-employee/edit-employee.component';
import { AllClientRequestsComponent } from './Components/Request/All-client-requests/all-client-requests.component';
import { AddOrganizationComponent } from './Components/Organization/add-organization/add-organization.component';
import { ListOrganizationsComponent } from './Components/Organization/list-organizations/list-organizations.component';
import { EditOrganizationComponent } from './Components/Organization/edit-organization/edit-organization.component';
import { AllManagerRequestsComponent } from './Components/Request/All-manager-requests/all-manager-requests.component';
import { AssignRequestsComponent } from "./Components/Request/Assign-requests/assign-requests.component";
import { DisplayAllClientsComponent } from './Components/ClientComponents/display-all-clients/display-all-clients.component';
import { ClientCreateRequestComponent } from './Components/Request/Client-create-request/client-create-request.component';
import { DisplayDepartmentsComponent } from './Components/DepartmentComponents/display-departments/display-departments.component';
import { EditDepartmentComponent } from './Components/DepartmentComponents/edit-department/edit-department.component';
import { ProjectTypeComponent } from './Components/ProjectTypeComponents/project-type/project-type.component';
import { AddProjectTypeComponent } from './Components/ProjectTypeComponents/add-project-type/add-project-type.component';
import { EditProjectTypeComponent } from './Components/ProjectTypeComponents/edit-project-type/edit-project-type.component';
import { DisplayCategoriesComponent } from './Components/Request/Categories/display-categories/display-categories.component';
import { EmployeeAssignedRequestsComponent } from './Components/employee/All-employee-assigned-requests/employee-assigned-requests.component';
import { AllTeamLeaderRequestsComponent } from './Components/Request/All-team-leader-requests/all-team-leader-requests.component';
import { AllProjectmanagerProjectsComponent } from './Components/Projects/all-projectmanager-projects/all-projectmanager-projects.component';
import { AllClientsForProjectmanagerComponent } from './Components/ClientComponents/all-clients-for-projectmanager/all-clients-for-projectmanager.component';
import { ProjectmangerRequestsComponent } from './Components/Request/All-projectmanger-requests/projectmanger-requests.component';
import { AssignemployeeRequestComponent } from './Components/Request/assignemployee-request/assignemployee-request.component';
import { EditClientComponent } from './Components/ClientComponents/edit-client/edit-client.component';
import { ProfileComponent } from './Components/Profile/Profile/profile.component';
// import { PiechartComponent } from './Components/Pichart/piechart/piechart.component';
import { PiechartComponent } from "./Components/Dashboard/SuperAdminpiechart/piechart.component";
import { ProjectmanagerDashboardComponent } from './Components/Dashboard/projectmanager-dashboard/projectmanager-dashboard.component';
import { TeamleaderDashboardComponent } from './Components/Dashboard/teamleader-dashboard/teamleader-dashboard.component';
import { DisplayAssetsComponent } from './Components/Assets/display-assets/display-assets.component';
import { Sites } from 'src/Shared/Models/Sites';
import { SitesComponent } from './Components/sites/sites.component';
import { OriginsComponent } from './Components/origins/origins.component';
import { SuppliersComponent } from './Components/suppliers/suppliers.component';
import { DueDateCategoryComponent } from './Components/due-date-category/due-date-category.component';
import { BrandComponent } from './Components/brand/brand.component';
import { ClientManagerRequestsComponent } from './Components/Request/client-manager-requests/client-manager-requests.component';
import { ClientManagerComponent } from './Components/ClientComponents/client-manager/client-manager.component';
import { AuthGuard } from './helpers/auth.guard';
import { AuthGuard2 } from './helpers/auth2.guard';
import { Admin } from './helpers/Admin.guard';
import { all } from './helpers/All.guard';
import { basic } from './helpers/basic.guard';
// import { PiechartComponent } from './Components/Pichart/piechart/piechart.component';
const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'login' },
  { path: 'login', component: SignupComponent },
  {
    path: 'home', component: HomeComponent, children: [
      { path: 'tabs', component: AllProjectsComponent,canActivate:[AuthGuard2,basic] },
      { path: 'Category', component: CategoryComponent,canActivate:[basic] },
      { path: 'client', component: ClientsComponent,canActivate:[basic] },
      { path: 'piechart', component: PiechartComponent ,canActivate:[basic,AuthGuard2] },
      { path: 'editClient/:id', component: EditClientComponent,canActivate:[AuthGuard,basic]  },
      { path: 'editClient/:id', component: EditClientComponent,canActivate:[AuthGuard,basic] },
    { path: 'department', component: DepartmentComponent,canActivate:[basic] },
      { path: 'changePassword', component: ChangePaswwordComponent,canActivate:[basic] },
      { path: 'DisplayDepartments', component: DisplayDepartmentsComponent,canActivate:[Admin,basic] },
      { path: 'editDepartment/:id', component: EditDepartmentComponent,canActivate:[basic,AuthGuard2] },
      { path: 'ProjectTypes', component: ProjectTypeComponent,canActivate:[all,basic] },
      { path: 'addProjectType', component: AddProjectTypeComponent,canActivate:[AuthGuard,basic] },
      { path: 'editProjectType/:id', component: EditProjectTypeComponent,canActivate:[AuthGuard,basic] },
      { path: 'Requests', component: CreateRequesteComponent ,canActivate:[basic]},
      { path: 'allTeamLeaderReqts', component: AllTeamLeaderRequestsComponent,canActivate:[basic] },  // data: { roles: ['SuperAdmin', 'Admin', 'Registration'] }
      { path: 'createProject', component: CreateProjectComponent,canActivate:[AuthGuard2,basic]},
      { path: 'updateproject/:id', component: UpdateProjectComponent,canActivate:[AuthGuard2,basic]},
      { path: 'AllUsers', component: AllUsersComponent,canActivate:[AuthGuard,basic] },
      { path: 'DisplayAllClients', component: DisplayAllClientsComponent,canActivate:[basic,AuthGuard2]},
      { path: 'AllManagersReq', component: AllManagerRequestsComponent,canActivate:[AuthGuard2,basic] },
      { path: 'AllClientsReq', component: ClientCreateRequestComponent,canActivate:[basic] },
      { path: 'assignReq/:reqId', component: AssignRequestsComponent,canActivate:[basic] },
      { path: 'employee', component: DisplayAllEmployeesComponent,canActivate:[AuthGuard] },
      { path: 'addemployee', component: AddEmployeeComponent,canActivate:[AuthGuard]},
      { path: 'profile', component: ProfileComponent,canActivate:[basic] },
      { path: 'projectManagerDashboard', component: ProjectmanagerDashboardComponent,canActivate:[basic] },
      { path: 'teamLeaderDashboard', component: TeamleaderDashboardComponent,canActivate:[basic] },
      { path: 'allClientReqts', component: AllClientRequestsComponent,canActivate:[basic] },
      { path: 'organization', component: AddOrganizationComponent,canActivate:[AuthGuard] },
      { path: 'organizations', component: ListOrganizationsComponent,canActivate:[Admin] },
      { path: 'organization', component: AddOrganizationComponent,canActivate:[AuthGuard] },
      { path: 'editOrganization/:id', component: EditOrganizationComponent,canActivate:[AuthGuard] },
      { path: 'editEmployee/:empId', component: EditEmployeeComponent,canActivate:[AuthGuard] },
      { path: 'allEmpAssignedRequests', component: EmployeeAssignedRequestsComponent,canActivate:[basic] },
      { path: 'allEmpAssigned/:reqId/:problemId', component: EmployeeAssignedRequestsComponent,canActivate:[basic] },
      { path: 'DisplayCategories', component: DisplayCategoriesComponent,canActivate:[all] },
      { path: 'projectsForProjectManager', component: AllProjectmanagerProjectsComponent,canActivate:[basic] },
      { path: 'allclientsforprojectmanager', component: AllClientsForProjectmanagerComponent,canActivate:[basic] },
      { path: 'projectmanagerRequests', component: ProjectmangerRequestsComponent,canActivate:[basic] },
      { path: 'assignemployeerequest/:id', component: AssignemployeeRequestComponent,canActivate:[basic] },
      { path: 'DisplayAssets', component: DisplayAssetsComponent,canActivate:[all] },
      { path: 'Sites', component: SitesComponent,canActivate:[AuthGuard] },
      { path: 'Origins', component: OriginsComponent,canActivate:[AuthGuard]},
      { path: 'Suppliers', component: SuppliersComponent,canActivate:[AuthGuard] },
      // { path: 'DueDateCategory', component: DueDateCategoryComponent },
      { path: 'Brand', component: BrandComponent,canActivate:[AuthGuard] },
      { path: 'ClientManagerRequests/:projectId', component: ClientManagerRequestsComponent ,canActivate:[basic]},
      { path: 'ClientManagerComponent', component: ClientManagerComponent,canActivate:[basic] },


    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

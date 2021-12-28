import { Component, OnInit, ViewChild } from "@angular/core";
import { ApexGrid, ChartComponent } from "ng-apexcharts";
import { ClientService } from "../../../../Shared/Services/client.service";
import { ProjectService } from "../../../../Shared/Services/project.service";
import { RequestService } from "../../../../Shared/Services/request.service";
import { EmployeeService } from "../../../../Shared/Services/employee.service";
import { DepartmentService } from "../../../../Shared/Services/department.service";
import { OrganizationService } from "../../../../Shared/Services/organization.service";
import {
  ApexAxisChartSeries,
  ApexChart,
  ApexDataLabels,
  // ApexXAxis,
  ApexPlotOptions,
  ApexStroke,
  ApexTitleSubtitle,
  ApexYAxis,
  ApexTooltip,
  ApexFill,
  ApexLegend,
  ApexNonAxisChartSeries,
  ApexResponsive,
} from "ng-apexcharts";

import { department } from "src/Shared/Models/department";
import { organization } from "src/Shared/Models/organization";
import { employee } from "src/Shared/Models/employee";
import { serializeNodes } from "@angular/compiler/src/i18n/digest";
import { ProjectTypeService } from "src/Shared/Services/project-type.service";
import { projectType } from "src/Shared/Models/projectType";
import { RequestStatusService } from "src/Shared/Services/request-status.service";
import { requestStatus } from "src/Shared/Models/requestStatus";

// export type ChartOptions = {
//   series: ApexNonAxisChartSeries;
//   chart: ApexChart;
//   responsive: ApexResponsive[];
//   labels: any;
//   fill: ApexFill;
//   legend: ApexLegend;
//   dataLabels: ApexDataLabels;
// };
export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  dataLabels: ApexDataLabels;
  plotOptions: ApexPlotOptions;
  xaxis: ApexXAxis;
  yaxis: ApexYAxis;
  stroke: ApexStroke;
  title: ApexTitleSubtitle;
  tooltip: ApexTooltip;
  fill: ApexFill;
  legend: ApexLegend;
  responsive: ApexResponsive[];
  labels: any;

};
export type chartOptionPie = {
  series: ApexNonAxisChartSeries;
  chart: ApexChart;
  responsive: ApexResponsive[];
  labels: any;
  fill: ApexFill;
  legend: ApexLegend;
  dataLabels: ApexDataLabels;
};
// export type ChartOptionRequest = {
//   series: ApexAxisChartSeries;
//   chart: ApexChart;
//   dataLabels: ApexDataLabels;
//   plotOptions: ApexPlotOptions;
//   responsive: ApexResponsive[];
//   xaxis: ApexXAxis;
//   legend: ApexLegend;
//   fill: ApexFill;
// };
export type ChartOptionRequest = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  dataLabels: ApexDataLabels;
  plotOptions: ApexPlotOptions;
  yaxis: ApexYAxis;
  xaxis: ApexXAxis;
  fill: ApexFill;
  tooltip: ApexTooltip;
  stroke: ApexStroke;
  legend: ApexLegend;
};
type ApexXAxis = {
  type?: "category" | "datetime" | "numeric";
  categories?: any;
  labels?: {
    style?: {
      colors?: string | string[];
      fontSize?: string;
    };
  };
};
export type ChartOptionProject = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  dataLabels: ApexDataLabels;
  plotOptions: ApexPlotOptions;
  yaxis: ApexYAxis;
  xaxis: ApexXAxis;
  grid: ApexGrid;
  colors: string[];
  legend: ApexLegend;
};

@Component({
  selector: 'app-piechart',
  templateUrl: './piechart.component.html',
  styleUrls: ["./piechart.component.css"]
})
export class PiechartComponent implements OnInit {
  @ViewChild("chart") chart: ChartComponent;
  public chartOptions: Partial<ChartOptions>;
  public chartOption2: Partial<ChartOptions>;
  public chartOptionPie: Partial<chartOptionPie>;
  public chartOptionPieProject: Partial<chartOptionPie>;
  public chartOptionRequest: Partial<ChartOptionRequest>;
  public chartOptionProject: Partial<ChartOptionProject>;

  clientLength: number
  projectLength: number
  requestLength: number
  empLength: any
  employeeNumber: number
  projectNumbers: number
  organizationLength: number
  deptLength: number
  employees: employee[]
  projectTypes: projectType[]
  deprtmentNames: string[]
  departments: department[]
  emp: any
  projectTypesNames: string[]
  projectNumber: any
  RequestStatusNames: string[]
  RequestStatus: requestStatus[]
  RequestOpenLength: number
  RequestClosedLength: number
  RequestInProgressLength: number
  requestsLength:number


  constructor(private clientService: ClientService, private empService: EmployeeService,
    private projectService: ProjectService, private requestService: RequestService, private depService: DepartmentService,
    private orgService: OrganizationService, private projectTypesService: ProjectTypeService,
    private requestStatusservice: RequestStatusService
  ) {




  }
  ngOnInit(): void {
    this.projectNumber = []
    this.RequestStatusNames = []
    this.RequestStatus = []
    this.projectTypesNames = []
    this.empLength = []
    console.log("ll", this.empLength)
    this.departments = []
    this.deprtmentNames = []
    this.employees = []
    this.empService.GetAllEmployees().subscribe(e => {
      this.employees = e
      this.employeeNumber = e.length
    })
    this.requestService.GetAllRequests().subscribe(e=>{
      this.requestsLength = e.length
    })
    //Employee Chart
    this.depService.GetAllDepartmens().subscribe(e => {
      this.departments = e
      this.departments.forEach(element => {
        this.deprtmentNames.push(element.name)
        this.empService.GetEmployeeByDepartmentId(element.id).subscribe(res => {
          console.log("GetEmployeeByDepartmentId",res)
          this.empLength.push(res.length)
          this.chartOptionPie = {
            series: this.empLength,
            chart: {
              width: 380,
              type: "pie"
            },
            labels: this.deprtmentNames,
            responsive: [
              {
                breakpoint: 480,
                options: {
                  chart: {
                    width: 200
                  },
                  legend: {
                    position: "bottom"
                  }
                }
              }
            ]
          };
        })
      });
    })
    //Project Chart
    this.projectService.GetAllProjects().subscribe(e => {
      this.projectNumbers = e.length

    })
    this.projectTypesService.GetAllProjectTypes().subscribe(e => {
      console.log("hh", e)
      this.projectTypes = e


      this.projectTypes.forEach(element => {
        this.projectTypesNames.push(element.typeName)

        this.projectService.GetAllProjectsByProjectTypeId(element.id).subscribe(res => {

          this.projectNumber.push(res.length)
          this.chartOptionPieProject = {
            series: this.projectNumber,
            chart: {
              width: 380,
              type: "pie"
            },
            labels: this.projectTypesNames,
            responsive: [
              {
                breakpoint: 480,
                options: {
                  chart: {
                    width: 200
                  },
                  legend: {
                    position: "bottom"
                  }
                }
              }
            ]
          };
        })

      });


    })
    //Request Chart
    this.requestStatusservice.GetAllRequestStatus().subscribe(e => {
      this.RequestStatus = e
      this.RequestStatus.forEach(element => {
        this.RequestStatusNames.push(element.status)
        this.requestService.GetAllRequestByRequestStatus(element.id).subscribe(e => {
          if (element.status == 'Open') {
            this.RequestOpenLength = e.length
          }
          else if (element.status == 'Closed') {
            this.RequestClosedLength = e.length
          }
          else if (element.status == 'InProgress') {
            this.RequestInProgressLength = e.length
          }
          this.chartOptionRequest = {
            series: [
              {
                name: "Number Of Requests",
                data: [this.RequestOpenLength, this.RequestClosedLength, this.RequestInProgressLength]
              }
            ],
            chart: {
              type: "bar",
              height: 350
            },
            plotOptions: {
              bar: {
                horizontal: false,
                columnWidth: "55%",
                endingShape: "rounded"
              }
            },
            dataLabels: {
              enabled: false
            },
            stroke: {
              show: true,
              width: 5,
              colors: ["transparent"]
            },
            xaxis: {
              categories: this.RequestStatusNames
  
  
            },
            yaxis: {
              title: {
                text: "( R e q u e s t s )"
              }
            },
            fill: {
              opacity: 1
            },
            tooltip: {
              y: {
                formatter: function (val) {
                  return "~" + val + " Requests";
                }
              }
            }
          };
        })

       
      });
    })
  }

}



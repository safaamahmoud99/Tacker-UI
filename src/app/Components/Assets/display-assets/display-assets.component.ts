import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { from } from 'rxjs';
import { Table } from 'primeng/table';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { AuthService } from 'src/Shared/Services/auth.service';
import { asset } from 'src/Shared/Models/asset';
import { DepartmentService } from 'src/Shared/Services/department.service';
import { AssetService } from 'src/Shared/Services/asset.service';
import { Directionality } from '@angular/cdk/bidi';
import { Brand } from 'src/Shared/Models/Brand';
import { Origins } from 'src/Shared/Models/Origins';
import { BrandService } from 'src/Shared/Services/brand.service';
import { OriginsService } from 'src/Shared/Services/origins.service';

@Component({
    selector: 'app-display-assets',
    templateUrl: './display-assets.component.html',
    styleUrls: ['./display-assets.component.css']
})
export class DisplayAssetsComponent implements OnInit {

    lstassets: asset[]
    assetObj: asset
    displayBasic: boolean;
    loading: boolean = true;
    Editboolean: boolean;
    NewDialogbool: boolean;
    lstBrand: Brand[];
    lstOrigins: Origins[];
    constructor(private assetservice: AssetService, private router: Router, private authservice: AuthService,
        private BrandService: BrandService, private OriginsService: OriginsService,
        private confirmationService: ConfirmationService, private messageService: MessageService, dir: Directionality) {
        dir.change.subscribe((changes) => {
            console.log(changes)
        });
    }

    ngOnInit(): void {
        this.lstOrigins = []
        this.lstBrand = []
        this.assetObj = {
            id: 0, assetCode: '', assetName: '', assetModel: '', brandId: 0, brandName: '', originId: 0, originName: ''
        }
        this.assetservice.GetAllAssets().subscribe(
            data => {
                this.lstassets = data,
                    this.loading = false;
            },
            err => console.log(err)
        )
        this.BrandService.GetAllBrands().subscribe(
            res => { this.lstBrand = res },
            err => console.log(err)
        )
        this.OriginsService.GetAllOrigins().subscribe(
            res => { this.lstOrigins = res },
            err => console.log(err)
        )
    }
    showBasicDialog(id) {
        this.displayBasic = true;
        this.assetservice.GetAssetById(id).subscribe(
            data => { this.assetObj = data },
            error => { console.log(error) }
        )
    }
    NewDialog() {
        this.NewDialogbool = true;
        this.assetObj = {
            id: 0, assetCode: '', assetName: '', assetModel: '', brandId: 0, brandName: '', originId: 0, originName: ''
        }
    }
    add() {
        this.messageService.clear();
        if (this.assetObj.assetName.length >=3 && this.assetObj.assetModel.length>=3 && this.assetObj.brandId != 0 && this.assetObj.originId != 0) {
            this.assetservice.inserAsset(this.assetObj).subscribe(
                res => {
                    this.NewDialogbool = false;
                    this.ngOnInit(),
                        this.messageService.add({ severity: 'info', summary: 'Record Added!', detail: 'Record Added!' });
                },
                error=>{
                    this.messageService.add({ key: 'tr', severity: 'error', summary: 'Attention !!!', sticky:false, detail: error.error.message });
            
                  },
            );
        }
        else {
            this.messageService.add({ severity: 'warn', summary: 'Error !', detail: 'Plz complete data!' });
        }
    }
    EditDialog(id) {
        this.Editboolean = true;
        this.assetservice.GetAssetById(id).subscribe(
            data => { this.assetObj = data },
            error => { console.log(error) }
        )
    }
    update(id) {
        this.messageService.clear();
        if (this.assetObj.assetName.length >=3 && this.assetObj.assetModel.length>=3 && this.assetObj.brandId != 0 && this.assetObj.originId != 0) {
        this.assetservice.updateAsset(id, this.assetObj).subscribe(
            data => {
                this.ngOnInit()
                this.messageService.add({ severity: 'info', summary: 'Record Updated!', detail: 'Record Updated!' });
                this.Editboolean = false;
            },
          error=>{
                this.messageService.add({ key: 'tr', severity: 'error', summary: 'Attention !!!', sticky:false, detail: error.error.message });
        
              }
        );
      
            }
            else{
                this.messageService.add({ severity: 'warn', summary: 'Error !', detail: 'Plz complete data!' });    
            }
    }
    confirm(id) {
        this.confirmationService.confirm({
            message: 'Are you sure that you want to perform this action?',
            accept: () => {
                this.assetservice.deleteAsset(id).subscribe(
                    data => {
                        this.ngOnInit(),
                            this.messageService.add({ severity: 'info', summary: 'Record Deleted!', detail: 'Record Deleted!' });
                    }
                )
            }
        });
    }
    showSuccess() {
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Message Content' });
    }

    showInfo() {
        this.messageService.add({ severity: 'info', summary: 'Info', detail: 'Message Content' });
    }

    showWarn() {
        this.messageService.add({ severity: 'warn', summary: 'Warn', detail: 'Message Content' });
    }

    showError() {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Message Content' });
    }

    showTopLeft() {
        this.messageService.add({ key: 'tl', severity: 'info', summary: 'Info', detail: 'Message Content' });
    }

    showTopCenter() {
        this.messageService.add({ key: 'tc', severity: 'info', summary: 'Info', detail: 'Message Content' });
    }

    showBottomCenter() {
        this.messageService.add({ key: 'bc', severity: 'info', summary: 'Info', detail: 'Message Content' });
    }

    showConfirm() {
        this.messageService.clear();
        this.messageService.add({ key: 'c', sticky: true, severity: 'warn', summary: 'Are you sure?', detail: 'Confirm to proceed' });
    }

    showMultiple() {
        this.messageService.addAll([
            { severity: 'info', summary: 'Message 1', detail: 'Message Content' },
            { severity: 'info', summary: 'Message 2', detail: 'Message Content' },
            { severity: 'info', summary: 'Message 3', detail: 'Message Content' }
        ]);
    }

    showSticky() {
        this.messageService.add({ severity: 'info', summary: 'Sticky', detail: 'Message Content', sticky: true });
    }

    onConfirm() {
        this.messageService.clear('c');
    }

    onReject() {
        this.messageService.clear('c');
    }

    clear() {
        this.messageService.clear();
    }
}

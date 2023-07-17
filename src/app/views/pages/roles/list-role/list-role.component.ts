import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { AccessService } from 'src/app/services/access.service';
import { AddRoleComponent } from '../add-role/add-role.component';
import Swal from 'sweetalert2';
import { Product } from 'src/app/models/entity/product';
import { ModuleService } from 'src/app/services/module.service';
import { ModuleDTO } from 'src/app/models/DTO/ModuleDTO';
import { AccessDTO } from 'src/app/models/DTO/AccessDTO';
import { EditRoleComponent } from '../edit-role/edit-role.component';

@Component({
  selector: 'app-list-role',
  templateUrl: './list-role.component.html',
  styleUrls: ['./list-role.component.css']
})
export class ListRoleComponent implements OnInit {
  accessForm!: FormGroup;
  accessData!:AccessDTO;
  access: AccessDTO[] = [];
  searchKey!: string;
  showspinner = false;
  accessList = [];
  data: any;
  modules: ModuleDTO [] = [];
  product: Product[] = [];
  
  datasource = new MatTableDataSource(this.access);
  displayedColumns: string[] = [
    'accessName',
    'productName',
    'moduleName',
    'lastModificatedDate',
    'actions',
  ];


  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort, {}) sort!: MatSort;
  mybreakpoint!: number;

  constructor(
    private dialog: MatDialog,
    public _Snackbar: MatSnackBar,
    private accessService: AccessService,
    public router: Router,
    public dialogRef: MatDialogRef<AddRoleComponent>) { }


  ngOnInit(): void {
    this.mybreakpoint = window.innerWidth <= 600 ? 1 : 6;
    this.datasource.sort = this.sort;
    this.datasource.paginator = this.paginator;
    this.getAllaccesss();
    this.getmoduleList()
  }
  ngAfterViewInit() {
    this.datasource.paginator = this.paginator;
    this.datasource.sort = this.sort;
  }


  /*********************
   * Get All accesss
   * 
   ***/

  getAllaccesss() {
      this.accessService.getallAccess().subscribe((response) => {
      this.datasource.data = response;
      console.log('response',response)
    });
  }
  getproductList() {
    this.accessService.getallProducts().subscribe((response: any) => {
      this.product = response;
    })
  }



  

  // get the list of modules
  
  getmoduleList() {
    this.accessService.getallModule().subscribe((response: any) => {
      this.modules = response;
    })
  }


  //search 
  onSearchClear() {
    this.searchKey = '';
    this.applyFilter();
  }

  //apply filter
  applyFilter() {
    this.datasource.filter = this.searchKey.trim().toLowerCase();
  }


  /************************
   * OnDelete User
   * 
   ***/
 
  onDeleteAccess(accessId: number) {
    Swal.fire({
      title: 'Are you sure to delete this Role?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'No',
      cancelButtonColor: 'gray'
    }).then((result) => {
      if (result.value) {
        this.accessService.deleteAccess(accessId)
          .subscribe(
            response => {
              console.log(response);
              //Swal.fire('Deleted!', ' Deleted successfully.', 'success');
              if (result.dismiss === Swal.DismissReason.cancel) {
              }

              this.getAllaccesss()

            });
        //snackBar success 
        this._Snackbar.open(" Deleted Successfully", + '' + "K" + '' + '⚡', {
          duration: 5000,
          horizontalPosition: "right",
          verticalPosition: "bottom",
          panelClass: ["mat-toolbar", "mat-success"],
        });
      }

    });

  }


  /************************
    * OnEdite PoP UP
    * 
    ***/

  onEdit(row: any) {
    this.accessService.populateForm(row);
    console.log('the row ===>', JSON.stringify(row));
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "50%";
    dialogConfig.height= "60%";
    this.dialog.open(EditRoleComponent, dialogConfig);
  }



  /************************
   * On clear Form
   * 
   ***/

  onClear() {
    this.accessService.form.reset();
    this.accessService.initializeFormGroup();
  }



  /***************************
  *  Dialog Config For create 
  * 
  ****/

  onCreate() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "50%";
    dialogConfig.height= "60%";
    this.dialog.open(AddRoleComponent, dialogConfig);
    this.onClear()

  }



}

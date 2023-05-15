import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DonorAddEditComponent } from './donor-add-edit/donor-add-edit.component';
import { DonorService } from 'src/app/services/donor.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { SnackbarService } from 'src/app/core/snackbar.service';


@Component({
  selector: 'app-donor',
  templateUrl: './donor.component.html',
  styleUrls: ['./donor.component.scss']
})
export class DonorComponent implements OnInit {

  allColumns: string[] = ['id', 'firstName', 'lastName', 'email', 'phone', 'address', 'postCode', 'area', 'group', 'promisedAmount', 'promisedDate', 'action'];

  displayedColumns: string[] = ['firstName', 'lastName', 'email', 'phone', 'area', 'group', 'promisedAmount', 'promisedDate', 'action'];

  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private _dialog: MatDialog, private _donorService: DonorService,
    private _snackbarService: SnackbarService) { }

  ngOnInit(): void {
    this.getDonors();
  }

  openDialog() {
    const dialogRef = this._dialog.open(DonorAddEditComponent, {
    });
    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.getDonors();
        }
      }
    });
  }

  getDonors() {
    this._donorService.getDonors().subscribe({
      next: (res) => {
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      error: console.log,
    })
  }

  deleteDonor(id: number) {
    const confirmed = confirm('Are you sure you want to delete this donor?');
    if (confirmed) {
      this._donorService.deleteDonor(id).subscribe({
        next: (res) => {
          this._snackbarService.showSnackbar('Donor deleted successfully!', 'Success');
          this.getDonors();
        },
        error: console.log,
      });
    }
  }

  openEditDialog(data: any) {
    const dialogRef = this._dialog.open(DonorAddEditComponent, {
      data,
    });

    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.getDonors();
        }
      },
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

}

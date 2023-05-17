import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ConfirmationService } from 'src/app/core/confirmation.service';
import { SnackbarService } from 'src/app/core/snackbar.service';
import { ExpenseService } from 'src/app/services/expense.service';
import { ExpenseAddEditComponent } from './expense-add-edit/expense-add-edit.component';

@Component({
  selector: 'app-expense',
  templateUrl: './expense.component.html',
  styleUrls: ['./expense.component.scss']
})
export class ExpenseComponent implements OnInit {

  allColumns: string[] = ['id', 'expenseName', 'paymentMethod', 'expenseCategory', 'payeeInformation', 'expenseAmount', 'expenseDate', 'expenseDescription', 'action'];

  displayedColumns: string[] = ['expenseName', 'paymentMethod', 'expenseCategory', 'payeeInformation', 'expenseAmount', 'expenseDate', 'action'];

  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private _dialog: MatDialog,
    private _expenseService: ExpenseService,
    private _snackbarService: SnackbarService,
    private _confirmationService: ConfirmationService
  ) { }

  ngOnInit(): void {
    this.getExpenses();
  }

  getExpenses() {
    this._expenseService.getExpenses().subscribe({
      next: (res) => {
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      error: console.log,
    })
  }

  openDialog() {
    const dialogRef = this._dialog.open(ExpenseAddEditComponent, {
    });
    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.getExpenses();
        }
      }
    });
  }

  openEditDialog(expense: any) {
    const dialogRef = this._dialog.open(ExpenseAddEditComponent, {
      data: expense
    });
    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.getExpenses();
        }
      }
    });
  }

  deleteExpense(id: any) {
    const message = 'Are you sure you want to delete this Expense?';

    this._confirmationService.openConfirmDialog(message)
      .then(result => {
        if (result) {
          // User confirmed the delete action
          this._expenseService.deleteExpense(id).subscribe({
            next: (res) => {
              this._snackbarService.showSnackbar('Expense deleted successfully!', 'Success');
              this.getExpenses();
            },
            error: console.log,
          });
        }
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

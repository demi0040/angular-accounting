import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { SnackbarService } from 'src/app/core/snackbar.service';
import { ExpenseService } from 'src/app/services/expense.service';

@Component({
  selector: 'app-expense-add-edit',
  templateUrl: './expense-add-edit.component.html',
  styleUrls: ['./expense-add-edit.component.scss']
})
export class ExpenseAddEditComponent implements OnInit {
  expenseForm: any;

  constructor(
    private _fb: FormBuilder,
    private _expenseService: ExpenseService,
    private _dialogRef: MatDialogRef<ExpenseAddEditComponent>,
    private _snackbarService: SnackbarService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.expenseForm = this._fb.group({
      expenseName: '',
      paymentMethod: '',
      expenseCategory: '',
      payeeInformation: '',
      expenseAmount: '',
      expenseDate: '',
      expenseDescription: '',
    });
  }

  ngOnInit(): void {
    this.expenseForm.patchValue(this.data);
  }

  onSubmit() {
    if (this.data) {
      this._expenseService.updateExpense(this.data.id, this.expenseForm.value).subscribe({
        next: (val: any) => {
          this._snackbarService.showSnackbar('Expense updated successfully!', 'Success');
          this._dialogRef.close(true);
        },
        error: (err: any) => { console.error(err); },
      });
    } else {
      this._expenseService.addExpense(this.expenseForm.value).subscribe({
        next: (val: any) => {
          this._snackbarService.showSnackbar('Expense added successfully!', 'Success');
          this._dialogRef.close(true);
        },
        error: (err: any) => { console.error(err); },
      });
    }
  }


}

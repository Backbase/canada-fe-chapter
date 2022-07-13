import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validator, Validators } from "@angular/forms";
import { MAT_DIALOG_DATA, MatDialog, MatDialogConfig, MatDialogRef } from "@angular/material/dialog";
import { Contact } from "@comp-store/data-model";

@Component({
  selector: 'comp-store-edit-contact',
  templateUrl: './edit-contact.component.html',
  styleUrls: ['./edit-contact.component.scss']
})
export class EditContactComponent implements OnInit {
  constructor(private fb: FormBuilder,
              @Inject(MAT_DIALOG_DATA) private contact: Contact,
              private dialogRef: MatDialogRef<EditContactComponent>) {
  }

  form = this.fb.group({
    id: [this.contact.id],
    name: [this.contact.name, Validators.required],
    phone: [this.contact.phone, Validators.required],
    email: [this.contact.email, Validators.required],
  });

  ngOnInit(): void {
  }

  close() {
    this.dialogRef.close();
  }

  save() {
    this.dialogRef.close(this.form.value);
  }
}

export const openEditContactDialog = (dialog: MatDialog, contact: Contact) => {
  const config = new MatDialogConfig();
  config.disableClose = true;
  config.autoFocus = true;
  config.data = {
    ...contact
  };

  const dialogRef = dialog.open(EditContactComponent, config);
  return dialogRef.afterClosed();
};

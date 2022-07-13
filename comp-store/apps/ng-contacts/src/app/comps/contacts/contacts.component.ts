import {
  Component, EventEmitter,
  Input,
  OnChanges,
  OnInit, Output,
  SimpleChanges
} from '@angular/core';
import { Contact } from "@comp-store/data-model";
import { filter, Observable, take } from "rxjs";
import { openEditContactDialog } from "../edit-contact/edit-contact.component";
import { MatDialog } from "@angular/material/dialog";

@Component({
  selector: 'comp-store-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.scss']
})
export class ContactsComponent implements OnInit, OnChanges {
  @Input() contacts$!:Observable<Contact[]> | null;
  @Output() emitUpdate = new EventEmitter<Contact>();
  @Output() emitDelete = new EventEmitter<Contact>();

  dataSource: any;
  displayedColumns = ['name', 'phone', 'email', 'edit', 'delete'];

  constructor(private dialog: MatDialog) {}

  ngOnInit(): void {
    this.dataSource = this.contacts$;
  }

  ngOnChanges(changes: SimpleChanges) {
    this.dataSource = this.contacts$;
  }

  updateContact(contact:Contact) {
    openEditContactDialog(this.dialog, contact)
      .pipe(
        take(1),
        filter(val => !!val)
      )
      .subscribe(contact => this.emitUpdate.emit(contact))
  }

  deleteContact(contact:Contact) {
    this.emitDelete.emit(contact);
  }
}

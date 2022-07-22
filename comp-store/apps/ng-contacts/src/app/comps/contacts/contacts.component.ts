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
import { ContactsStore } from "@comp-store/comp-store";

@Component({
  selector: 'comp-store-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.scss']
})
export class ContactsComponent {
  // @Input() contacts$!:Observable<Contact[]> | null;
  @Output() emitUpdate = new EventEmitter<Contact>();
  // @Output() emitDelete = new EventEmitter<Contact>();

  dataSource = this.store.contacts$;
  displayedColumns = ['name', 'phone', 'email', 'edit', 'delete'];

  constructor(private dialog: MatDialog, private store: ContactsStore) {}

  // ngOnInit(): void {
  //   // this.dataSource = this.contacts$;
  // }
  //
  // ngOnChanges(changes: SimpleChanges) {
  //   // this.dataSource = this.contacts$;
  // }

  updateContact(contact:Contact) {
    openEditContactDialog(this.dialog, contact)
      .pipe(
        take(1),
        filter(val => !!val)
      )
      .subscribe(contact => this.emitUpdate.emit(contact))
  }

  deleteContact(contact:Contact) {
    this.store.deleteContact(contact);
  }
}

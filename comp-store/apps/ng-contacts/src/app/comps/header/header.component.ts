import { ChangeDetectorRef, Component, ElementRef,
  EventEmitter, Output, ViewChild } from '@angular/core';
import { MatDialog } from "@angular/material/dialog";
import { openEditContactDialog } from "../edit-contact/edit-contact.component";
import { filter, take } from "rxjs";
import { Contact, emptyContact } from "@comp-store/data-model";

@Component({
  selector: 'comp-store-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  searchOn = false;
  @ViewChild('searchInput') searchInput!: ElementRef;
  @Output() emitSearchKeys = new EventEmitter<any>();
  @Output() emitAddContact = new EventEmitter<Contact>();
  searchStr = '';

  constructor(private cd: ChangeDetectorRef,
              private dialog: MatDialog) {
  }

  toggleSearch() {
    this.searchOn = !this.searchOn;
    if (this.searchOn) {
      this.cd.detectChanges();
      this.searchInput.nativeElement.focus();
    }
  }

  addContact() {
    openEditContactDialog(this.dialog, emptyContact)
      .pipe(
        take(1),
        filter(val => !!val)
      ).subscribe(contact => this.emitAddContact.next(contact))
  }
}

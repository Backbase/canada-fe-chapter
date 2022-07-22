import { Component, OnInit } from '@angular/core';
import { Contact } from "@comp-store/data-model";
import { map, Observable, take } from "rxjs";
import { ContactsService } from "@comp-store/data-api";
import { ContactsStore } from "@comp-store/comp-store";

@Component({
  selector: 'comp-store-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [ContactsStore]
})
export class AppComponent implements OnInit {
  contacts$!: Observable<Contact[]>;
  contactsFiltered$: any;
  searchStr = '';

  constructor(private service: ContactsService,
              private store: ContactsStore) {
  }

  ngOnInit() {
    this.prepViewData();
    this.store.init();
  }

  prepViewData() {
    this.contacts$ = this.service.all();
    this.contactsFiltered$ = this.contacts$;
    this.searchKeys(this.searchStr);
  }

  searchKeys(searchKeys: any) {
    this.searchStr = searchKeys;
    this.contactsFiltered$ = this.contacts$
      .pipe(
        take(1),
        map((contacts: any) =>
          contacts.filter((contact: Contact) =>
            JSON.stringify(contact).toLowerCase().includes(searchKeys))
        ));
  }

  // onAdd(contact: Contact) {
  //   this.doRestOp(this.service.create(contact));
  // }

  onUpdate(contact: Contact) {
    this.doRestOp(this.service.update(contact));
  }

  // onDelete(contact: Contact) {
  //   this.doRestOp(this.service.delete(contact));
  // }

  doRestOp(obs: Observable<any>) {
    obs.pipe(
      take(1)
    ).subscribe(() => this.prepViewData());
  }
}

import { Injectable } from "@angular/core";
import { ComponentStore } from "@ngrx/component-store";
import { Contact } from "@comp-store/data-model";
import { ContactsService } from "@comp-store/data-api";
import { map, take, withLatestFrom } from "rxjs";

export interface ContactsState {
  contacts: Contact[];
  searchStr: string;
}

const defaultState: ContactsState = {
  contacts: [],
  searchStr: ''
};

@Injectable()
export class ContactsStore extends ComponentStore<ContactsState> {
  constructor(private apiService: ContactsService) {
    super(defaultState);
  }

  init() {
    this.loadContacts();
  }

  readonly loadContacts = () => {
    this.apiService.all()
      .pipe(take(1))
      .subscribe(contacts => this.setState((state) => ({
        ...state,
        contacts
      })));
  };

  readonly contacts$ =
    this.select(({contacts}) => contacts);

  readonly contactsUpdate = this.updater((state, contacts: Contact[]) => ({
    ...state,
    contacts
  }));

  deleteContact = (contact: Contact) =>
    this.apiService.delete(contact)
      .pipe(take(1))
      .subscribe(contacts => this.contactsUpdate(contacts));

  addContact = (contact: Contact) => {
    this.apiService.create(contact)
      .pipe(
        withLatestFrom(this.state$),
        map(([apiContact, state]) => ([...state.contacts, apiContact])),
        take(1))
      .subscribe((contacts: Contact[]) =>
        this.patchState({contacts})
      );
  };

}

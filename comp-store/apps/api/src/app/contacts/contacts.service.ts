import { Injectable } from '@nestjs/common';
import { CONTACTS } from "./db";
import { Contact } from "@comp-store/data-model";
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class ContactsService {
  contacts = CONTACTS;

  findAll() {
    return this.contacts;
  }

  findOne(id: string) {
    return this.contacts.find(contact => contact.id === id);
  }

  create(contact: Contact) {
    const newContact = Object.assign({}, contact, {id: uuidv4()});
    this.contacts = [...this.contacts, newContact];
    return newContact;
  }

  update(id: string, contact: Contact) {
    const idx = this.contacts.findIndex(contact => contact.id === id);
    this.contacts[idx] = contact;
    return this.contacts[idx];
  }

  remove(id: string) {
    const idx = this.contacts.findIndex(contact => contact.id === id);
    this.contacts.splice(idx, 1);
    return this.contacts;
  }
}

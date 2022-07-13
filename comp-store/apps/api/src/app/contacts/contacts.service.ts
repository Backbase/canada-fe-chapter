import { Injectable } from '@nestjs/common';
import { CONTACTS } from "./db";
import { Contact } from "@comp-store/data-model";
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class ContactsService {
  contacts = CONTACTS;

  create(contact: Contact) {
    this.contacts = [
      ...this.contacts,
      Object.assign({}, contact, {id: uuidv4()})
    ];

    return this.contacts;
  }

  findAll() {
    return this.contacts;
  }

  findOne(id: string) {
    return `This action returns a #${id} contact`;
  }

  update(id: string, contact: Contact) {
    const idx = this.contacts.findIndex(contact => contact.id === id);
    this.contacts[idx] = contact;
    return this.contacts;
  }


  remove(id: string) {
    const idx = this.contacts.findIndex(contact => contact.id === id);
    this.contacts.splice(idx, 1);
    return this.contacts;
  }
}

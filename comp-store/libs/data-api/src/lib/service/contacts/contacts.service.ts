import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Contact } from "@comp-store/data-model";

const URL = 'http://localhost:2222/api/contacts';

@Injectable({
  providedIn: 'root'
})
export class ContactsService {

  constructor(private http: HttpClient) {
  }

  all(): Observable<Contact[]> {
    return this.http.get<Contact[]>(URL);
  }

  create(contact: Contact): Observable<Contact[]> {
    return this.http.post<Contact[]>(URL, contact);
  }

  update(contact: Contact) {
    return this.http.put(URL + `/${contact.id}`, contact);
  }

  delete(contact: Contact) {
    return this.http.delete(URL + `/${contact.id}`);
  }
}

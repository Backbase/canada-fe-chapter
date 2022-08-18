import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Contact } from "@comp-store/data-model";

const URL = 'http://localhost:3333/api/contacts';

@Injectable({
  providedIn: 'root'
})
export class ContactsService {

  constructor(private http: HttpClient) {
  }

  all(): Observable<Contact[]> {
    return this.http.get<Contact[]>(URL);
  }

  create(contact: Contact): Observable<Contact> {
    return this.http.post<Contact>(URL, contact);
  }

  update(contact: Contact): Observable<Contact> {
    return this.http.put<Contact>(URL + `/${contact.id}`, contact);
  }

  // for a change, we're making "delete" return the entire collection
  delete(contact: Contact): Observable<Contact[]> {
    return this.http.delete<Contact[]>(URL + `/${contact.id}`);
  }
}

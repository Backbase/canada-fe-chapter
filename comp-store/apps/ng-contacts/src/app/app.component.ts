import { Component, OnInit } from '@angular/core';
import { ContactsStore } from "@comp-store/comp-store";

@Component({
  selector: 'comp-store-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [ContactsStore] // having the provider here makes this like a global store
})
export class AppComponent implements OnInit {
  constructor(private store: ContactsStore) {
  }

  ngOnInit() {
    this.store.init();
  }
}

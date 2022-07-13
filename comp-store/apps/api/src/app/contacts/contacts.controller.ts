import { Controller, Get, Post, Body, Param, Delete, Put } from '@nestjs/common';
import { ContactsService } from './contacts.service';
import { Contact } from "@comp-store/data-model";

@Controller('contacts')
export class ContactsController {
  constructor(private readonly contactsService: ContactsService) {}

  @Post()
  create(@Body() contact: Contact) {
    return this.contactsService.create(contact);
  }

  @Get()
  findAll() {
    return this.contactsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.contactsService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() contact: Contact) {
    return this.contactsService.update(id, contact);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.contactsService.remove(id);
  }
}

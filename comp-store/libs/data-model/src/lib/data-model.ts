export interface Contact {
  id?: string;
  name: string;
  phone: string;
  email: string;
}

export const emptyContact:Contact = {
  name: '',
  phone: '',
  email: ''
}

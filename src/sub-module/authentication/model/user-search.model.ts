export class UserSearch {
  filter: any = [
    {
      value: 'Username',
      text: 'Username',
      inputType: 'text'
    },
    {
      value: 'FirstName',
      text: 'First Name',
      inputType: 'text'
    },
    {
      value: 'LastName',
      text: 'Last Name',
      inputType: 'text'
    },
    {
      value: 'Email',
      text: 'Email',
      inputType: 'text'
    },
    {
      value: 'PhoneNo',
      text: 'Phone No',
      inputType: 'text'
    },
  ];
  api: any = {
    Username: null,
    FirstName: null,
    LastName: null,
    Email: null,
    PhoneNo: null,
    currentPage: 1,
    itemPerPage: 10,
    totalPage: 0,
    field: 'CreateDate',
    byDescending: true,
  };
  field: string = 'CreateDate';
  paginationArr: number[] = [];
  totalItem: number = 0;
  itemLength: number = 0;
}

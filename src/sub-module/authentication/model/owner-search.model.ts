export class OwnerSearch {
  filter: any = [
    {
      value: 'OwnerId',
      text: 'Owner Id',
      inputType: 'text'
    },
    {
      value: 'OwnerName',
      text: 'Owner Name',
      inputType: 'text'
    },
    {
      value: 'PhoneNo',
      text: 'Phone No',
      inputType: 'text'
    },
  ];
  api: any = {
    OwnerId: null,
    OwnerName: null,
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
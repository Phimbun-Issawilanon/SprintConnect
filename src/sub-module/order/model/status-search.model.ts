export class StatusSearch {
  filter: any = [
    {
      value: 'StatusCode',
      text: 'Status Code',
      inputType: 'text'
    },
    {
      value: 'StatusReason',
      text: 'Status Reason',
      inputType: 'text'
    },
    {
      value: 'StatusDisplayName',
      text: 'Status Display Name',
      inputType: 'text'
    },
    {
      value: 'StatusType',
      text: 'Status Type',
      inputType: 'text'
    },
  ];
  api: any = {
    StatusCode: null,
    StatusReason: null,
    StatusDisplayName: null,
    StatusType: null,
    currentPage: 1,
    itemPerPage: 10,
    totalPage: 0,
    field: 'SequenceShow',
    byDescending: true,
  };
  field: string = 'SequenceShow';
  paginationArr: number[] = [];
  totalItem: number = 0;
  itemLength: number = 0;
}
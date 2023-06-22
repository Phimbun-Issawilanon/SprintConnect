export class DeliverySubtypeSearch {
  filter: any = [
    {
      value: 'Key',
      text: 'Key',
      inputType: 'text'
    },
    {
      value: 'Value',
      text: 'Value',
      inputType: 'text'
    },
    {
      value: 'DisplayName',
      text: 'Display Name',
      inputType: 'text'
    },
  ];
  api: any = {
    Key: null,
    Value: null,
    DisplayName: null,
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

export class OrderTypeSearch {
  filter: any = [
    {
      value: 'OrderType',
      text: 'Order Type',
      inputType: 'text'
    },
    {
      value: 'OrderConfig',
      text: 'Order Config',
      inputType: 'text'
    },
    {
      value: 'Description',
      text: 'Description',
      inputType: 'text'
    },
    {
      value: 'DeliveryTypeValue',
      text: 'Delivery Type Value',
      inputType: 'text'
    },
    {
      value: 'DeliverySubTypeValue',
      text: 'Delivery Sub Type Value',
      inputType: 'text'
    },
  ];
  api: any = {
    OrderType: null,
    OrderConfig: null,
    Description: null,
    DeliveryTypeValue: null,
    DeliverySubTypeValue: null,
    currentPage: 1,
    itemPerPage: 10,
    totalPage: 0,
    field: 'OrderType',
    byDescending: true,
  };
  field: string = 'OrderType';
  paginationArr: number[] = [];
  totalItem: number = 0;
  itemLength: number = 0;
}


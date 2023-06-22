export class RunningNumberTypeSearch {
  filter: any = [
    {
      value: 'RunningNumberTypeCode',
      text: 'Running Number Type Code',
      inputType: 'text'
    },
    {
      value: 'RunningNumberTypeName',
      text: 'Running Number Type Name',
      inputType: 'text'
    },
  ];
  api: any = {
    RunningNumberTypeCode: null,
    RunningNumberTypeName: null,
    currentPage: 1,
    itemPerPage: 10,
    totalPage: 0,
    field: 'RunningNumberTypeCode',
    byDescending: true,
  };
  field: string = 'RunningNumberTypeCode';
  paginationArr: number[] = [];
  totalItem: number = 0;
  itemLength: number = 0;
}

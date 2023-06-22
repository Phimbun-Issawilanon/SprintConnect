export class FunctionConfigSearch {
  filter: any = [
    {
      value: 'ConfigKey',
      text: 'Config Key',
      inputType: 'text'
    },
    {
      value: 'ConfigValue',
      text: 'Config Value',
      inputType: 'text'
    },
    {
      value: 'ConfigType',
      text: 'Config Type',
      inputType: 'text'
    },
    {
      value: 'Function',
      text: 'Function',
      inputType: 'text'
    },
  ];
  api: any = {
    ConfigKey: null,
    ConfigValue: null,
    ConfigType: null,
    Function: null,
    currentPage: 1,
    itemPerPage: 10,
    totalPage: 0,
    field: 'Seq',
    byDescending: true,
  };
  field: string = 'Seq';
  paginationArr: number[] = [];
  totalItem: number = 0;
  itemLength: number = 0;
}

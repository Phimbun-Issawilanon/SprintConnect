export class RunningNumberSearch {
  filter: any = [
    {
      value: 'RunningNumberTypeName',
      text: 'Running Number Type Name',
      inputType: 'text'
    },
    {
      value: 'RunningYear',
      text: 'Running Year',
      inputType: 'text'
    },
    {
      value: 'RunningMonth',
      text: 'Running Month',
      inputType: 'text'
    },
  ];
  api: any = {
    RunningNumberTypeName: null,
    RunningYear: null,
    RunningMonth: null,
    currentPage: 1,
    itemPerPage: 10,
    totalPage: 0,
    field: 'RunningNumberTypeName',
    byDescending: true,
  };
  field: string = 'RunningNumberTypeName';
  paginationArr: number[] = [];
  totalItem: number = 0;
  itemLength: number = 0;
}

export class RoleSearch {
  filter: any = [
    {
      value: 'RoleId',
      text: 'Role Id',
      inputType: 'number'
    },
    {
      value: 'RoleName',
      text: 'Role Name',
      inputType: 'text'
    },
  ];
  api: any = {
    RoleId: null,
    RoleName: null,
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

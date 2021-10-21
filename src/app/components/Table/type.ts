export interface IProps {
  // table props
  data: any;
  columns: any;
  onPageChange?: any;
  onSortedChange?: any;
  onPageSizeChange?: any;
  page?: number;
  pageSize: number;
  offset?: number;
  limit?: number;
  pages?: number;
  filter?: any;
  total?: number;
  onDetail?: any;
  // searching props
  isShowSearch?: boolean;
  keySearchDefault?: string;
  onSearch?: any;
  placeholder?: string;
  // custom field props
  name?: string;
}

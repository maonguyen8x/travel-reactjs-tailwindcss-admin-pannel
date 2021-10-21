export interface IProps {
  onDetail?: (p: any) => void;
  onEdit?: (p: any) => void;
  onDelete?: (p: any) => void;
  onBlock?: (e: any, blocked: string, id: number) => void;
  isDelete?: boolean;
  roles?: any;
  item?: any;
  isPublish?: boolean;
  onPublish?: (e: any, blocked: string, id: number) => void;
  onBlockIP?: (e: any, blocked: string, id: number, page: any) => void;
  isChangeRole?: boolean;
  isLock?: boolean;
}

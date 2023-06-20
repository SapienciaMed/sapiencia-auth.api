export interface IMenuAccess {
  id: number;
  aplicationId: number;
  name: string;
  url: string | null;
  topMenuAccessId: number | null;
  order: number;
  actionIndicator: string | null;
}

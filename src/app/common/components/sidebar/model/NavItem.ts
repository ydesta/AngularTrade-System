export interface NavItem {
  path: string;
  title: string;
  type: string;
  iconType: string;
  children?: NavItem[];
}

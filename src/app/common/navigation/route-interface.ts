export interface RouteInfo {

    path: string;
    title: string;
    type: string;
    userType?: Array<string>;
    iconType: string;
    no?:string;
    collapse?: string;
    children?:RouteInfo[];
}



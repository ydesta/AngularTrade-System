export type PermissionNames =  
  'View Users' | 'Manage Users' |
  'View Roles' | 'Manage Roles' | 'Assign Roles' |
  'View Projects' | 'Manage Projects' |
  'View Tasks' | 'Manage Tasks' |
  'View Service Application' | 'Manage Service Application' |
  'Manage Site Administrators' | 'Manage Settings' | 'Manage Lookups' | 'View Setting' | 'Manage Setting'|
  'Manage Quarterly Report'|'Manage Annually Audited Report'|'Manage Client Information';

export type PermissionValues =
   'users.view' | 'users.manage' |
  'roles.view' | 'roles.manage' | 'roles.assign' |
  'projects.view' | 'projects.manage' |
  'task.view' | 'task.manage' |  
  'services.manage' |
  'customerProfile.manage' |
  'projectProfile.manage' |
  'licensingServices.manage' |
  'incentiveServices.manage' |
  'uploadedItems.manage' |
  'incentivesServices.manage' |
  'aftercareData.manage' |
  'data.View' |
  'serviceApplication.view' | 'serviceApplication.manage' |
  'superadmin.manageAdmins' | 'superadmin.manageLookups' | 'superadmin.manageSettings' |
   'case.manage'|'setting.view'|'setting.manage' | 
  'quarterreport.view'|'annually.view'|'clientinformation.view'|'0' | '1' | '2' | '3' | '4'| '7' ;


export class Permission {
  /* end trade execution permissions */
  public static readonly viewProjectsPermission: PermissionValues = 'projects.view';
  public static readonly manageProjectsPermission: PermissionValues = 'projects.manage';

  public static readonly viewServiceList: PermissionValues = 'task.view';
  public static readonly manageTasks: PermissionValues = 'task.manage';

  public static readonly viewServiceApplication: PermissionValues = 'serviceApplication.view';
  public static readonly manageServiceApplication: PermissionValues = 'serviceApplication.manage';

  public static readonly viewUsersPermission: PermissionValues = 'users.view';
  public static readonly manageUsersPermission: PermissionValues = 'users.manage';

  public static readonly viewRolesPermission: PermissionValues = 'roles.view';
  public static readonly manageRolesPermission: PermissionValues = 'roles.manage';
  public static readonly assignRolesPermission: PermissionValues = 'roles.assign';

  public static readonly manageSiteAdministratorsPermission: PermissionValues = 'superadmin.manageAdmins';
  public static readonly manageLookupsPermission: PermissionValues = 'superadmin.manageLookups';
  public static readonly manageSettingsPermission: PermissionValues = 'superadmin.manageSettings';



  // Manage Aftercare Data
  public static readonly ManageAftercareDataPermission: PermissionValues = 'aftercareData.manage';

  // Management Services Permission
  public static readonly ViewReadOnlyDataPermission: PermissionValues = 'data.View';
//Manage off-site Monitoring
public static readonly QuarterlyReport: PermissionValues = 'quarterreport.view';
  public static readonly UpdateClientInformation: PermissionValues = 'clientinformation.view';
  public static readonly AnnuallyAuditedReport: PermissionValues = 'annually.view';
  public static readonly prepare: PermissionValues = '0';
  public static readonly checker: PermissionValues = '1';
  public static readonly approverOne: PermissionValues = '2';
  public static readonly approverTwo: PermissionValues = '3';
  public static readonly direcotr: PermissionValues = '4';
  public static readonly reporter: PermissionValues = '7';
  public static readonly viewSettingPermission: PermissionValues = "setting.view";

  constructor(name?: PermissionNames, value?: PermissionValues, groupName?: string, description?: string) {
    this.Name = name;
    this.Value = value;
    this.GroupName = groupName;
    this.Description = description;
  }

  public Name: PermissionNames;
  public Value: PermissionValues;
  public GroupName: string;
  public Description: string;
}

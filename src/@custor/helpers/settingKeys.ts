import { Injectable } from '@angular/core';

@Injectable()
// tslint:disable-next-line:class-name
export class settingKeys {
  public static readonly CURRENT_USER = 'current_user';
  public static readonly ONLINE_SITE_CODE = 'OnlineSite';
  public static readonly ONLINE_ROLE = 'Online Users';
  public static readonly USER_PERMISSIONS = 'user_permissions';
  public static readonly ACCESS_TOKEN = 'access_token';
  public static readonly REFRESH_TOKEN = 'refresh_token';
  public static readonly TOKEN_EXPIRES_IN = 'expires_in';
  public static readonly REMEMBER_ME = 'remember_me';
  public static readonly LANGUAGE = 'language';
  public static readonly HOME_URL = 'home_url';
  public static readonly THEME_ID = 'themeId';
}

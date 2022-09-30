import { User } from './user.model';

export class UserEdit extends User {
  constructor(currentPassword?: string, newPassword?: string, confirmPassword?: string) {
    super();

    this.CurrentPassword = currentPassword;
    this.NewPassword = newPassword;
    this.ConfirmPassword = confirmPassword;
  }

  public CurrentPassword: string;
  public NewPassword: string;
  public ConfirmPassword: string;
}

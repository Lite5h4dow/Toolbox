import { userTypes } from "./userTypes";
export class userData {
  constructor(
    forename: string,
    surname: string,
    username: string,
    email: string,
    userType: userTypes
  ) {
    (this.Forename = forename),
      (this.Surname = surname),
      (this.Username = username),
      (this.Email = email),
      (this.UserType = userType);
  }
  Forename: string;
  Surname: string;
  Username: string;
  Email: string;
  UserType: userTypes;
}

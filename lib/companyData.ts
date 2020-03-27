export class company {
  constructor(
    id: string,
    name: string,
    admins: string[],
    managers: string[],
    cleaners: string[]
  ) {
    (this.ID = id),
      (this.Name = name),
      (this.Admins = admins),
      (this.Managers = managers),
      (this.Cleaners = cleaners);
  }

  ID: string;
  Name: string;
  Admins: string[];
  Managers: string[];
  Cleaners: string[];
}

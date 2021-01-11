import { RolesBuilder } from "nest-access-control";

export enum AppRoles {
  ADMIN = 'Admin',
  GROUP_LEADER = 'Jefe de grupo',
  JANITOR = 'Intendente',
}

export enum AppResource {
  USER = 'USER',
  REPORT = 'REPORT',
  ISSUE = 'ISSUE'
}

export const roles: RolesBuilder = new RolesBuilder();

roles
  //JANITOR ROLES
  .grant(AppRoles.JANITOR)
  .updateOwn([AppResource.USER])
  .updateAny([AppResource.REPORT])
  .deleteAny([AppResource.REPORT])
  // GROUP_LEADER ROLES
  .grant(AppRoles.GROUP_LEADER)
  .extend(AppRoles.JANITOR)
  .createOwn([AppResource.REPORT])
  // ADMIN ROLES
  .grant(AppRoles.ADMIN)
  .extend(AppRoles.GROUP_LEADER)
  .createAny([AppResource.USER, AppResource.ISSUE])
  .updateAny([AppResource.REPORT, AppResource.USER, AppResource.ISSUE])
  .deleteAny([AppResource.REPORT, AppResource.USER, AppResource.ISSUE]);
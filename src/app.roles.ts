import { RolesBuilder } from "nest-access-control";

export enum AppRoles {
  ADMIN = 'Admin',
  GROUP_LEADER = 'Lider de grupo',
  JANITOR = 'Intendente',
}

export enum AppResource {
  USER = 'USER',
  REPORT = 'REPORT',
  ISSUE = 'ISSUE'
}

export const roles: RolesBuilder = new RolesBuilder();

roles
  // GROUP_LEADER ROLES
  .grant(AppRoles.GROUP_LEADER)
  .updateOwn([AppResource.USER])
  .createOwn([AppResource.REPORT])
  .updateOwn([AppResource.REPORT])
  .deleteOwn([AppResource.REPORT])
  //JANITOR ROLES
  .grant(AppRoles.GROUP_LEADER)
  .updateOwn([AppResource.USER])
  .updateAny([AppResource.REPORT])
  .deleteAny([AppResource.REPORT])
  // ADMIN ROLES
  .grant(AppRoles.ADMIN)
  .extend(AppRoles.GROUP_LEADER)
  .createAny([AppResource.USER, AppResource.ISSUE])
  .updateAny([AppResource.REPORT, AppResource.USER, AppResource.ISSUE])
  .deleteAny([AppResource.REPORT, AppResource.USER, AppResource.ISSUE]);
import { getRepository } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { DEFAULT_USER, DEFAULT_USER_LAST_NAME, DEFAULT_USER_NAME, DEFAULT_USER_PASSWORD, DEFAULT_USER_ROL } from './constants';
import { User } from 'src/user/entities';

export const setDefaultUser = async (config: ConfigService) => {
  const userRepository = getRepository<User>(User);

  const defaultUser = await userRepository
    .createQueryBuilder()
    .where('userName = :userName', {
      userName: config.get<string>('DEFAULT_USER'),
    })
    .getOne();

  if (!defaultUser) {
    const adminUser = userRepository.create({
      name: config.get<string>(DEFAULT_USER_NAME),
      lastName: config.get<string>(DEFAULT_USER_LAST_NAME),
      userName: config.get<string>(DEFAULT_USER),
      password: config.get<string>(DEFAULT_USER_PASSWORD),
      rol: config.get<string>(DEFAULT_USER_ROL),
    });

    return await userRepository.save(adminUser);
  }
};

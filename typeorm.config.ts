import { TypeOrmModuleOptions } from '@nestjs/typeorm';

const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: '1234',
  database: 'challenge_02_alura_backend',
  entities: ['src/**/*.entity.ts'],
  synchronize: true,
};

export default typeOrmConfig;

import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class EnvironmentConfigService {

  constructor(private configService: ConfigService) { }

  getNodeEnv(): string {
    return this.configService.get<string>('NODE_ENV');
  }

  getDatabaseUrl(): string {
    return this.configService.get<string>('DATABASE_URL');
  }
}

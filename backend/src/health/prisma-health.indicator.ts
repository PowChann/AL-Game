import { Injectable } from '@nestjs/common';
import { HealthIndicatorService } from '@nestjs/terminus';
import { PrismaService } from '../database/prisma.service';

@Injectable()
export class PrismaHealthIndicator {
  constructor(
    private readonly healthIndicatorService: HealthIndicatorService,
    private readonly prisma: PrismaService,
  ) {}

  async isHealthy() {
    const indicator = this.healthIndicatorService.check('database');

    try {
      await this.prisma.$queryRaw`SELECT 1`;
      return indicator.up();
    } catch {
      return indicator.down();
    }
  }
}

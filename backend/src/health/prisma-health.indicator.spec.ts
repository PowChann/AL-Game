import { HealthIndicatorService } from '@nestjs/terminus';
import { PrismaService } from '../database/prisma.service';
import { PrismaHealthIndicator } from './prisma-health.indicator';

describe('PrismaHealthIndicator', () => {
  const healthIndicatorService = new HealthIndicatorService();

  it('reports the database as up when the query succeeds', async () => {
    const prisma = {
      $queryRaw: jest.fn().mockResolvedValue([{ value: 1 }]),
    } as unknown as PrismaService;
    const indicator = new PrismaHealthIndicator(healthIndicatorService, prisma);

    await expect(indicator.isHealthy()).resolves.toEqual({
      database: { status: 'up' },
    });
  });

  it('reports the database as down when the query fails', async () => {
    const prisma = {
      $queryRaw: jest.fn().mockRejectedValue(new Error('unavailable')),
    } as unknown as PrismaService;
    const indicator = new PrismaHealthIndicator(healthIndicatorService, prisma);

    await expect(indicator.isHealthy()).resolves.toEqual({
      database: { status: 'down' },
    });
  });
});

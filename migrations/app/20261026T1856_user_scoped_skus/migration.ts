#!/usr/bin/env -S bun
import type { Contract as End } from '../../snapshots/8401a83f152166a9c166d2af074e9ac52e0d23e4c6b0868f88ede481ba5f9cb3/contract';
import endContract from '../../snapshots/8401a83f152166a9c166d2af074e9ac52e0d23e4c6b0868f88ede481ba5f9cb3/contract.json' with { type: 'json' };
import type { Contract as Start } from '../../snapshots/c75d1e6428891b708c3d0bf51633cffa0b738e67bf0f1d2c767cc308b0c1e679/contract';
import startContract from '../../snapshots/c75d1e6428891b708c3d0bf51633cffa0b738e67bf0f1d2c767cc308b0c1e679/contract.json' with { type: 'json' };
import { Migration, MigrationCLI } from '@prisma/orm-postgres/migration';

export default class M extends Migration<Start, End> {
  override readonly startContractJson = startContract;
  override readonly endContractJson = endContract;

  override get operations() {
    return [
      this.dropIndex({ schema: 'public', table: 'Product', index: 'Product_sku_key' }),
      this.createIndex({
        schema: 'public',
        table: 'Product',
        index: 'Product_userId_sku_key',
        columns: ['userId', 'sku'],
        extras: { unique: true },
      }),
    ];
  }
}

MigrationCLI.run(import.meta.url, M);

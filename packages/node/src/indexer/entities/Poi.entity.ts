// Copyright 2020-2021 OnFinality Limited authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { BuildOptions, DataTypes, Model, Sequelize } from 'sequelize';

interface ProofOfIndex {
  id: number;
  blockHeight: number;
  chainBlockHash: string;
  parentHash?: string;
  operationHashRoot: string;
  mmrRoot: string;
  projectId: string;
}

export type PoiRepo = typeof Model & {
  new (values?: unknown, options?: BuildOptions): ProofOfIndex;
};

export function PoiFactory(sequelize: Sequelize, schema: string): PoiRepo {
  return <PoiRepo>sequelize.define(
    `_poi`,
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
      },
      chainBlockHash: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      parentHash: {
        type: DataTypes.STRING,
        allowNull: true,
        unique: true,
      },
      operationHashRoot: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: '0x000',
      },
      mmrRoot: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      projectId: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: '0',
      },
    },
    { freezeTableName: true, schema: schema },
  );
}

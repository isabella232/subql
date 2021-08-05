// Copyright 2020-2021 OnFinality Limited authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { BuildOptions, DataTypes, Model, Sequelize } from 'sequelize';

interface Metadata {
  key: string;
  value: string;
}

export type MetadataRepo = typeof Model & {
  new (values?: unknown, options?: BuildOptions): Metadata;
};

export function MetadataFactory(
  sequelize: Sequelize,
  schema: string,
): MetadataRepo {
  return <MetadataRepo>sequelize.define(
    `_metadata`,
    {
      key: {
        type: DataTypes.STRING,
        primaryKey: true,
      },
      value: {
        type: DataTypes.JSONB,
      },
    },
    { freezeTableName: true, schema: schema },
  );
}

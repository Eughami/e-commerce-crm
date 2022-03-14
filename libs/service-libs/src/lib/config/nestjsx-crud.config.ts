import { BaseRouteName, CrudOptions, CrudRequest } from '@nestjsx/crud';

export const crudGeneralOptions: Partial<CrudOptions> = {
  params: {
    id: {
      field: 'id',
      type: 'uuid',
      primary: true,
    },
  },
  query: {
    maxLimit: 100,
    cache: 2000,
    alwaysPaginate: true,
    exclude: [
      'password',
      'passwordSalt',
      'passwordCreatedAt',
      'accessToken',
      'twoFactorAuthSecret',
      'ipWhitelist',
      'salt',
    ],
  },
};

export const crudDefaultRequest: CrudRequest = {
  options: {
    query: {
      maxLimit: 100,
      cache: 2000,
      alwaysPaginate: true,
    },
  },
  parsed: {
    fields: [],
    paramsFilter: [],
    search: { $and: [null, {}] },
    filter: [],
    or: [],
    join: [],
    sort: [],
    limit: undefined,
    authPersist: undefined,
    cache: undefined,
    offset: undefined,
    page: undefined,
    includeDeleted: 0,
  },
};

export const allBaseRoutes = (): BaseRouteName[] => [
  'getManyBase',
  'getOneBase',
  'createOneBase',
  'createManyBase',
  'updateOneBase',
  'replaceOneBase',
  'deleteOneBase',
  'recoverOneBase',
];

export const emptyDefaultGetManyResponse = {
  data: [],
  count: 0,
  total: 0,
  page: 1,
  pageCount: 1,
};

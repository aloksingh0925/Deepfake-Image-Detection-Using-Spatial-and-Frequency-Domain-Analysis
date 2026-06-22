import { Prisma, PrismaClient } from './generated/prisma/index.js';

// add prisma to the NodeJS global type
// interface CustomNodeJsGlobal extends Global {
//   prisma: PrismaClient;
// }

// Prevent multiple instances of Prisma Client in development
// declare const global: CustomNodeJsGlobal;

const PRISMA_OPS = {
    findUnique: 'findUnique',
    findUniqueOrThrow: 'findUniqueOrThrow',
    findMany: 'findMany',
    findFirst: 'findFirst',
    findFirstOrThrow: 'findFirstOrThrow',
    create: 'create',
    createMany: 'createMany',
    createManyAndReturn: 'createManyAndReturn',
    update: 'update',
    updateMany: 'updateMany',
    updateManyAndReturn: 'updateManyAndReturn',
    upsert: 'upsert',
    delete: 'delete',
    deleteMany: 'deleteMany',
    executeRaw: 'executeRaw',
    queryRaw: 'queryRaw',
    aggregate: 'aggregate',
    count: 'count',
    runCommandRaw: 'runCommandRaw',
    findRaw: 'findRaw',
    groupBy: 'groupBy'
} as const;

const getGlobalFiltersExtension = () => {
    return Prisma.defineExtension({
        name: 'globalFilters',
        query: {
            $allModels: {
                async $allOperations({ operation, args, query }) {
                    const globalData = { isDeleted: false };
                    const op = operation as string;
                    const parsedArgs = args as any;

                    switch (op) {
                        case PRISMA_OPS.findUnique:
                        case PRISMA_OPS.findUniqueOrThrow:
                        case PRISMA_OPS.findMany:
                        case PRISMA_OPS.findFirst:
                        case PRISMA_OPS.findFirstOrThrow:
                        case PRISMA_OPS.count:
                        case PRISMA_OPS.groupBy:
                        case PRISMA_OPS.aggregate:
                        case PRISMA_OPS.update:
                        case PRISMA_OPS.updateMany:
                        case 'updateManyAndReturn':
                        case PRISMA_OPS.delete:
                        case PRISMA_OPS.deleteMany:
                            parsedArgs.where = {
                                ...globalData,
                                ...(parsedArgs.where || {})
                            };
                            break;
                        case PRISMA_OPS.create:
                            if (parsedArgs.data && typeof parsedArgs.data === 'object')
                                parsedArgs.data = {
                                    ...globalData,
                                    ...parsedArgs.data
                                };
                            break;
                        case PRISMA_OPS.createMany:
                        case 'createManyAndReturn':
                            if (parsedArgs.data && Array.isArray(parsedArgs.data))
                                for (let i = 0; i < parsedArgs.data.length; i++) {
                                    const item = parsedArgs.data[i];
                                    if (typeof item === 'object')
                                        parsedArgs.data[i] = {
                                            ...globalData,
                                            ...item
                                        };
                                }
                            break;

                        case PRISMA_OPS.upsert:
                            parsedArgs.where = {
                                ...globalData,
                                ...(parsedArgs.where || {})
                            };
                            if (parsedArgs.create && typeof parsedArgs.create === 'object')
                                parsedArgs.create = {
                                    ...globalData,
                                    ...parsedArgs.create
                                };
                            break;
                        default:
                            break;
                    }

                    return await query(parsedArgs);
                }
            }
        }
    });
};

const prisma = new PrismaClient().$extends(getGlobalFiltersExtension());

export default prisma;

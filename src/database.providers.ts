import * as mongoose from 'mongoose';

export const databaseProviders = [
  {
    provide: 'DATABASE_CONNECTION',
    useFactory: (): Promise<typeof mongoose> =>
      mongoose.connect(
        'mongodb://eliseonop:VUJueD3VaboKWgGq@ac-wzcmu8i-shard-00-00.xvx2wf7.mongodb.net:27017,ac-wzcmu8i-shard-00-01.xvx2wf7.mongodb.net:27017,ac-wzcmu8i-shard-00-02.xvx2wf7.mongodb.net:27017/?ssl=true&replicaSet=atlas-mr32gg-shard-0&authSource=admin&retryWrites=true&w=majority',
      ),
  },
];

import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'

import { MongooseModule } from '@nestjs/mongoose'
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb://eliseonop:VUJueD3VaboKWgGq@ac-wzcmu8i-shard-00-00.xvx2wf7.mongodb.net:27017,ac-wzcmu8i-shard-00-01.xvx2wf7.mongodb.net:27017,ac-wzcmu8i-shard-00-02.xvx2wf7.mongodb.net:27017/?ssl=true&replicaSet=atlas-mr32gg-shard-0&authSource=admin&retryWrites=true&w=majority'
    ),

    UsersModule
  ],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}

import { Body, Controller, Get, Post, Query, Sse } from '@nestjs/common';
import { AppService } from './app.service';
import { Observable, map } from 'rxjs';
import { MessageEventData, TypeData } from './models/messageEvent.model';
export class DataDto {
  value: any;
  kds: string;
  userId: string;
  crudId: string;
  type: TypeData;
}

interface SseQueryDto {
  kds: string;
  user: string;
}



interface MessageEvent {
  data: MessageEventData;
}

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Sse('api/events')
  sse(@Query() sseQuery: SseQueryDto): Observable<MessageEvent> {
    const kds = sseQuery.kds;
    const user = sseQuery.user;
    const dataObservable = this.appService.getObservable(kds, user);

    return dataObservable.pipe(
      map((data: MessageEventData): MessageEvent  => ({ data }))
    );
  }

  @Post('data')
  setData(@Body() data: DataDto): { message: string; data: MessageEventData } {
    console.log('data', data);
    const messageData: MessageEventData = {
      value: data.value,
      Kds: data.kds,
      userId: data.userId,
      crudId: data.crudId,
      type: data.type,
    };
    return this.appService.setData(messageData);
  }

  @Get('allData')
  getAllData(): { message: string; data: any[] } {
    try {
      return this.appService.getAllData();
    } catch (error) {
      console.log('error', error);
      return { message: 'error', data: error };
    }
  }
}


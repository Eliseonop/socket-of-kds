import { Injectable } from '@nestjs/common';
import { KdsObservable } from './models/dataObservable';
import { BehaviorSubject } from 'rxjs';
import { MessageEventData } from './models/messageEvent.model';

@Injectable()
export class AppService {
  private mapSubjects = new Map<string, KdsObservable>();

  getHello(): string {
    return 'Hello World!';
  }

  getObservable(Kds: string, user: string): BehaviorSubject<MessageEventData> {
    const dataSubject = this.mapSubjects.get(Kds);
    if (dataSubject) {
      if (!dataSubject.user.includes(user)) {
        dataSubject.user.push(user);
      }
      return dataSubject.observable;
    }

    const newDataSubject = new BehaviorSubject<MessageEventData>(null);
    const newKdsObservable = {
      observable: newDataSubject,
      user: [user],
    };
    this.mapSubjects.set(Kds, newKdsObservable);
    return newDataSubject;
  }

  setData(data: MessageEventData): { message: string; data: MessageEventData } {
    const Kds = data.Kds;

    if (!Kds) {
      return { message: 'falta Kds', data: data };
    }
    const dataSubject = this.mapSubjects.get(Kds);

    if (dataSubject) {
      dataSubject.observable.next(data);
      dataSubject.observable.next(null);
      return { message: 'Data posted', data: data };
    } else {
      console.log('dataSubject is null');
      return { message: 'No está registrada esa Kds', data: data };
    }
  }

  getAllData(): { message: string; data: any[] } {
    const KdsObservableList: any[] = [];

    this.mapSubjects.forEach((value: KdsObservable, key: string) => {
      const KdsObservableJson = {
        Kds: key,
        user: value.user,
      };

      KdsObservableList.push(KdsObservableJson);
    });

    return { message: 'allData RealTime', data: KdsObservableList };
  }
}
              
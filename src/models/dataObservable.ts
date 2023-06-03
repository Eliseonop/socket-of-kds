import { BehaviorSubject } from "rxjs"
import { MessageEventData } from "./messageEvent.model"

export interface KdsObservable {
    observable: BehaviorSubject<MessageEventData>
    user: string[]
  }
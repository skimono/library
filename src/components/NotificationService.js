import * as rxjs from 'rxjs';

export default class NotificationService {
  constructor() {
    this.subject = new rxjs.Subject();
  }

  emit(value) {
    this.subject.next(value);
  }

  notify() {
    return this.subject.asObservable();
  }
}

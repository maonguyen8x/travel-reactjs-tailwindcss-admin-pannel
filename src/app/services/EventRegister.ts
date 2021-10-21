import { isString, isFunction } from 'ramda-adjunct';

class EventRegister {
  static listeners: any = {
    count: 0,
    refs: {},
  };

  static addEventListener(eventName: string, callback: (data: any) => void) {
    if (isString(eventName) && isFunction(callback)) {
      EventRegister.listeners.count = EventRegister.listeners.count + 1;
      const eventId = `l${EventRegister.listeners.count}`;
      EventRegister.listeners.refs[eventId] = {
        name: eventName,
        callback,
      };
      return eventId;
    }
    return false;
  }

  static removeEventListener(id: string) {
    if (isString(id)) {
      return delete EventRegister.listeners.refs[id];
    }
    return false;
  }

  static removeAllListeners() {
    let removeError = false;
    Object.keys(EventRegister.listeners.refs).forEach((id) => {
      const removed = delete EventRegister.listeners.refs[id];
      removeError = !removeError ? !removed : removeError;
    });
    return !removeError;
  }

  static emitEvent(eventName: string, data: any) {
    Object.keys(EventRegister.listeners.refs).forEach((id) => {
      if (
        EventRegister.listeners.refs[id] &&
        eventName === EventRegister.listeners.refs[id].name
      )
        EventRegister.listeners.refs[id].callback(data);
    });
  }

  /*
   * shortener
   */
  static on(eventName: string, callback: (data: any) => void) {
    return EventRegister.addEventListener(eventName, callback);
  }

  static rm(eventName: string) {
    return EventRegister.removeEventListener(eventName);
  }

  static rmAll() {
    return EventRegister.removeAllListeners();
  }

  static emit(eventName: string, data: any) {
    EventRegister.emitEvent(eventName, data);
  }
}

export { EventRegister };

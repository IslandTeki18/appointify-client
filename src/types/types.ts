interface Attendee {
  name: string;
  email: string;
}

interface EventType {
  availability: {
    days: number[];
    startTime: string;
    endTime: string;
  };
  _id: string;
  title: string;
  duration: number;
  description: string;
  user: string;
  __v: number;
}

interface Appointment {
  attendee: Attendee;
  _id: string;
  eventType: EventType;
  host: string;
  startTime: string;
  endTime: string;
  status: string;
  __v: number;
}

export { Attendee, EventType, Appointment };

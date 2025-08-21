export class Task {
  private _id: number;
  private _title: string;
  private _color: string;
  private _status: string;
  private _timeStamp: string;

  constructor(
    id: number,
    title: string,
    color: string,
    status: string,
    timeStamp: string
  ) {
    this._id = id;
    this._title = title;
    this._color = color;
    this._status = status;
    this._timeStamp = timeStamp;
  }

  // Getters without underscore
  get id(): number {
    return this._id;
  }

  get title(): string {
    return this._title;
  }

  get color(): string {
    return this._color;
  }

  get status(): string {
    return this._status; 
  }

  get timeStamp(): string {
    return this._timeStamp; 
  }

    toJSON() {
    return {
      id: this._id,
      title: this._title,
      color: this._color,
      status: this._status,
      timeStamp: this._timeStamp,
    };
  }
}

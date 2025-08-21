import {baseLogger} from "../../logging/log";

export default class BaseService {
  logger:any;
  constructor() {
    this.logger = baseLogger;
  }
}
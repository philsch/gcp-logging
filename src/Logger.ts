import type {LogMessage, StructuredLog} from "./types";
import {Severity} from "./types";

let logger: Logger;

class Logger {
    constructor(opt = {}) {
        // no options for now
    }

    static init(opt = {}) {
        logger = new Logger(opt);
    }

    private getErrorStack(e: Error): string {
        return e.stack;
    }

    log(message: LogMessage, severity = Severity.INFO) {
        // Cloud Error Reporting expects error.stack as message
        // see https://cloud.google.com/error-reporting/reference/rest/v1beta1/projects.events/report#ReportedErrorEvent
        const msg = (message instanceof Error) ? this.getErrorStack(message) : message;
        const payload: StructuredLog = {severity: severity, message: msg};
        console.log(JSON.stringify(payload));
    }

    /**
     * Write an "info" level log.
     */
    static log(message: LogMessage, severity = Severity.INFO) {
        logger.log(message, severity);
    }

    /**
     * Write an "error" level log.
     */
    static error(message: LogMessage) {
        logger.log(message, Severity.ERROR);
    }

    /**
     * Write a "WARNING" level log.
     */
    static warn(message: LogMessage) {
        logger.log(message, Severity.WARNING);
    }

    /**
     * Write a "DEBUG" level log.
     */
    static debug(message: LogMessage) {
        logger.log(message, Severity.DEBUG);
    }
}

export default Logger;
export {Severity};
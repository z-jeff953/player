export class Logger {
  info = console.log
  warn = console.warn
  error = console.error
  debug = console.log
}

export const logger = new Logger();

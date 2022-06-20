import winston, { createLogger, format, transports } from "winston";

const logLevels = {
  fatal: 0,
  error: 1,
  warning: 2,
  info: 3,
  debug: 4,
  trace: 5
};

const logger = createLogger({
  format: format.combine(
    format.timestamp(),
    format.json(),
    format.colorize(),
    format.prettyPrint(),
    format.splat()
  ),
  defaultMeta: true,
  level: "info",
  levels: logLevels,
  transports: [new transports.Console()]
});

if (process.env.NODE_ENV !== "production") {
  // logger.add(
  //   new winston.transports.Console({
  //     format: winston.format.simple()
  //   })
  // );
}

export default logger;

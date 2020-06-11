const MY_TOKEN = "RFKHYNH566XSFMX5YHRBJL4RD6J7BPWF"

const { Wit, log } = require('node-wit');

const client = new Wit({
  accessToken: MY_TOKEN,
  logger: new log.Logger(log.DEBUG) // optional
});

export const analyzeIntent = (text) => {
  return client.message(text)
}
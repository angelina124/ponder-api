const MY_TOKEN = "RFKHYNH566XSFMX5YHRBJL4RD6J7BPWF"

const { Wit, log } = require('node-wit');

const client = new Wit({
  accessToken: MY_TOKEN,
  logger: new log.Logger(log.DEBUG) // optional
});

// returns a tuple (error, intents)
const analyzeIntent = (text) => {
  return new Promise(resolve => {
    client.message(text)
      .then((data) => {
        const { intents } = data
        if (intents.length > 0) {
          const { name, confidence } = intents[0]
          resolve([null, { name, confidence }])
        } else {
          resolve([null, { name: "sleep", confidence: 0 }])
        }
      }).catch((err) => {
        resolve([err, null])
      })
  })
}

module.exports = { analyzeIntent }
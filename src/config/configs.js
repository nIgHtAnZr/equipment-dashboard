const configs = {
  statusCode: {
    unauthorizedCodes: [401],
    errorCodes       : [400, 403, 404, 405, 406, 412, 415, 500, 501],
    successCodes     : [200, 201],
  },
  colorCode: {
    operationalStatus: [
      '#4ce300',
      '#ff0000',
    ],
  },
  maximumItemPerRequest: 99,
  requestDelayTimeInMs: 100,
}

export default configs;

// host de web service
export const host = {
  //url: 'http://localhost:8000'
  //url: 'https://192.168.2.17/webservice'
  url: 'https://micompra.local.lan/'
};

// url de apis
export let appService = {
  // Producto
  ws_producto: host.url + 'webservice/api/producto',
  media: host.url +  'media/',
  parametroBuscar : 'search',
  parametroPagina : 'page',
};

export let tablaConf = {
    itemsPorPagina : 10,
};

export let DECODER_CONFIG;
DECODER_CONFIG = {
  inputStream: {
    size: 800
  },
  locator: {
    patchSize: "medium",
    halfSample: false
  },
  numOfWorkers: 1,
  decoder: {
    readers: ['ean_reader', 'code_128_reader', 'ean_8_reader', 'code_39_reader', 'code_39_vin_reader',
      'codabar_reader', 'upc_reader', 'upc_e_reader', 'i2of5_reader']
  },
  locate: true,
  src: null
};

export let DECODER_LIVE_CONFIG;
DECODER_LIVE_CONFIG = {
  locator: {
    patchSize: "medium",
    halfSample: false
  },
  numOfWorkers: 1,
  decoder: {
    readers: ['ean_reader',
      // 'code_128_reader',
      // 'ean_8_reader',
      // 'code_39_reader',
      // 'code_39_vin_reader',
      // 'codabar_reader',
      // 'upc_reader',
      // 'upc_e_reader',
      //  'i2of5_reader'
    ]
  },
  locate: true,
};


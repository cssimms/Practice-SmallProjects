/**
 * This might be a harder one to reproduce, as we used an API key for the given endpiont that is no longer valid.
 * However, when practicing this one again I would do something like -
 *
 * Create an http client that fetches data from a GET endoint, passing date and currency code values. The API should return currency conversion rates between
 * the codes passed.
 *
 * Cache the responses such that future requests using the client don't need to hit the API.
 *
 */
// write a http client to fetch data from this endpoint -
// https://apilayer.com/marketplace/exchangerates_data-api#endpoints

const axios = require("axios");
const { result } = require("lodash");

// then write a cache to store results for given parameters (base currency and date)

const localCache = {
  "2021-09-10": {
    USD: {
      CAD: 1.45,
    },
  },
};

const getFromCache = (date, baseCurrency, outputSymbols) => {
  const cacheData = localCache[date] && localCache[date][baseCurrency];
  if (!cacheData) return false;

  const resultData = {};
  Object.keys(cacheData)
    .filter((symbol) => {
      return outputSymbols.includes(symbol);
    })
    .forEach((key) => {
      resultData[key] = cacheData[key];
    });
  return resultData;
};

const writeToCache = (data) => {
  // if (!localCache[data]) {
  //   localCache[date][baseCurrency] =
  // }
};

const fetchData = async (date, baseCurrency, outputSymbols) => {
  const base = baseCurrency ? baseCurrency : "";
  const symbols = outputSymbols ? outputSymbols.join(",") : "";
  const url = `https://api.apilayer.com/exchangerates_data/${date}`;

  const cacheData = getFromCache(date, baseCurrency, outputSymbols);

  if (cacheData) return cacheData;

  console.log("fetching data for...", date, base, symbols);
  const returnedData = await axios.get(url, {
    headers: {
      apikey: "REDACTED",
    },
    params: {
      base: base,
      symbols: symbols,
    },
  });

  writeToCache(returnedData.data);
  return returnedData.data;
};

const date = "2022-10-01";
const base = "USD";
const symbols = ["CAD", "GBP"];
const testGet = async () => {
  const data = await fetchData(date, base, symbols);
  console.log(data.data);
};
testGet();

const testGetCache = () => {
  const cacheData = getFromCache("2021-09-10", "USD", ["CAD"]);
  console.log("should return CAD data:", cacheData);
  const failedCache = getFromCache("2021-09-10", "CAD", ["JPY"]);
  console.log("should return false:", failedCache);
};
testGetCache();

const testHitCache = async () => {
  const resultData = await fetchData("2021-09-10", "USD", ["CAD"]);
  console.log("should not fetching data but return:", resultData);
};

testHitCache();

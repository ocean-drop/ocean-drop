import Sailor from './Sailor.js';
import Earth from './Earth.js';
import Ocean from './Ocean.js';
import Boat from './Boat.js';

const { RippleAPI } = ripple;
const rippleAPI = new RippleAPI({
  server: 'wss://s1.ripple.com',
});

const url = new URL(window.location);
const urlParams = new URLSearchParams(url.search);
const DEBUG = urlParams.has('debug');
const WAVE = urlParams.get('wave');

//Logger
const log = function () {
  if (DEBUG) {
    console.log.apply(this, arguments);
  }
};

//Generate QR code
Sailor.paddle(Ocean.LOCATION, Boat.$('.ocean-address__img'));
Boat.makeAWave(WAVE, Sailor, Ocean);

//Ripple api connection
rippleAPI.connect().then(async () => {
  const oceanDrops = await Earth.getOceanDrops(rippleAPI, Ocean);
  const hasDropsLeft = Ocean.hasDropsLeft(oceanDrops.length);
  const tellMeIfTheOceanIsThere = Ocean.dropsLeft(oceanDrops.length);

  Boat.watchTheOcean(tellMeIfTheOceanIsThere);
  Boat.jumpIntoTheOcean(hasDropsLeft);
  Boat.canSwim(!hasDropsLeft);

  //Listening to transaction events
  rippleAPI.connection.on('transaction', async (event) => {
    const lastOceanDrops = await Earth.getOceanDrops(rippleAPI, Ocean);
    const isItStillPossibleToSwim = Ocean.hasDropsLeft(lastOceanDrops.length);
    const [...sources] = lastOceanDrops.map((p) => p.specification.source);

    Boat.watchTheOcean(Ocean.dropsLeft(lastOceanDrops.length));
    Boat.canSwim(!isItStillPossibleToSwim);
  });

  //Subscribe to account
  rippleAPI
    .request('subscribe', {
      accounts: [Ocean.LOCATION],
    })
    .then((response) => {
      log(`Successfully subscribed to ${Ocean.LOCATION}`, response);
    })
    .catch((error) => {
      log('Something went wrong...', error);
    });
});

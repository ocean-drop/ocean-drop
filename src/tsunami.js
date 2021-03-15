('use strict');
import crypto from 'crypto';
import { RippleAPI } from 'ripple-lib';
import Earth from './Earth.js';
import Ocean from './Ocean.js';

const rippleAPI = new RippleAPI({
  server: 'wss://s1.ripple.com',
});

const tsunamiASCII = `
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⠀⠀⢀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⡀⠀⠀⠀⠀⠀⠀⠀⢀⠀⠠⢀⠢⠀⠐⠠⣀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⠠⠀⠀⠀⠀⠀⠀⠀⠀⢀⠀⢠⢩⢊⠈⢁⣀⢰⡨⠄⠀⠢⢀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠠⠀⠀⠀⠀⠀⡠⢠⠠⠐⠀⢨⢘⣈⠢⣶⢈⣐⡀⠐⠈⢤⠙⢒⠚⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠠⠂⠀⠀⠀⠀⠐⠀⠠⢉⢐⣠⢛⣿⣶⢀⡙⣷⣿⣿⣭⣂⠔⠤⣄⢱⢁⢢⢰⠠⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠰⠁⠀⠀⠀⠀⠀⠀⠀⣶⣸⢨⡷⣹⣾⣾⣻⣿⣷⢟⣿⣿⣾⣶⠰⡤⠘⢀⢄⠔⠔⣀⢈⢈⠀⢠⡠⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⢀⠐⠁⠀⠀⠀⠀⠀⠀⠀⠀⠀⠻⣿⣏⣷⣏⣿⣟⢾⡿⢿⣽⣿⣿⠿⡿⠾⢀⢰⠢⢠⠨⠈⡀⢄⢐⡨⠚⢀⢠⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⣤⢤⣰⠒⠈⠀⠀⠀⠀⠠⢀⢐⠐⠠⠀⠀⠀⡀⠀⠈⠉⢀⢰⣿⣟⣯⣿⠿⣿⣟⢼⣼⠙⠈⠹⠠⢈⠤⢐⠠⠀⢈⠰⢸⠂⠀⠁⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠚⠀⠀⢀⢀⢀⢠⢀⠀⢁⢀⠐⢁⠀⠐⢀⣀⢠⠐⢨⡀⣈⠉⠠⠘⣌⠿⠻⣿⣟⣯⠀⠀⠀⠀⠀⠘⢉⠀⠈⠀⡅⠈⠰⠘⠂⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⢐⢠⢀⢠⡌⢰⣶⣞⡘⠀⡠⢐⢀⠘⣼⣨⡌⣴⠠⣼⢠⡆⢰⣸⣸⣼⣿⢸⠀⠀⠀⠀⠀⠀⠀⠀⠀⠈⠸⠈⠘⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠠⠈
⠀⠀⠐⡈⣡⣼⡨⠉⠹⣾⣿⢿⢀⠸⠘⠀⠀⠛⠭⠛⠛⣏⣟⢽⣻⣶⣮⢿⣽⣿⣿⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠐⠀⠀⠀
⠰⠀⣰⣽⢿⣿⣇⣤⠁⣴⣶⣿⣛⣀⠸⡀⠐⠪⢠⠦⣘⢺⣻⣿⣿⣽⠿⡷⢿⣶⣾⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠐⠀⠀⠐⠠⠀
⠐⠒⠀⠀⠰⣦⡿⢿⣷⣿⣗⢾⢐⣶⣶⣽⣻⣮⠐⠸⣆⣯⣷⣿⠟⠉⠋⢾⣾⣟⣛⢆⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠠⠀⠀⢐⢒⠀⠳⣾
⢰⢨⢐⢰⣀⠠⢌⣚⣾⢾⣶⣟⣼⣾⣿⣽⣿⣿⣮⣣⣿⣟⠟⠁⠀⠀⠀⠀⠀⠀⠙⣳⣦⢰⢸⢀⠀⠀⠀⢀⠀⠀⢀⢀⠀⠀⢠⠀⠀⠀⠀⠀⠀⠀⠀⢀⠀⠀⢠⢀⣀⠀⠀⢀⠀⢀⢐⢀⠀⠀⠤⠉⡀⠀⠀⣀⣀⠪⣿⣼
⠀⠐⢚⣾⡾⠹⣿⣻⣿⣷⣽⣾⣻⣿⣿⣿⣕⣟⣿⠭⠊⠀⠀⠀⢀⠂⢄⠀⠀⠀⠀⠐⠛⣿⣼⢀⠀⠚⢀⠠⠀⢐⠀⢀⢠⢠⢴⢸⢠⠸⢼⢐⢠⢀⢐⠐⠀⢀⢀⠀⢸⣀⠀⢀⣀⢠⢀⠐⡰⠉⠀⠀⠀⣤⣾⣶⣭⣿⡾⢛
⢘⠀⠀⠹⣿⣗⢽⣶⡿⣿⣿⣿⣿⣿⠿⠛⢉⢀⠀⠀⠀⠀⡠⣸⡀⢼⠀⠀⠀⠀⠀⠀⠐⢐⠀⠨⠙⢀⠿⠀⢾⠛⢠⢿⢰⣵⣼⢿⢉⣰⠀⡈⠻⢼⢴⡏⠉⢛⢸⣀⣸⢸⢸⠊⠀⣩⠾⢉⠀⠐⠐⢀⠐⣶⡔⠐⢈⠄⠈⢀
⠀⠀⠀⠀⠈⠙⠛⠉⠉⠀⠀⢀⢀⠀⠀⠀⠀⡔⠀⠀⠈⢨⢀⠀⠂⢐⢒⢰⠈⢀⢰⠀⡢⠀⠐⡠⢀⠀⠈⠐⠈⣓⣾⢸⠬⠉⡟⣿⠉⢹⢿⣿⣶⣴⣬⡗⠀⠰⠐⢠⣀⣏⢹⠠⠊⡠⣰⣈⣴⠶⠙⠉⠈⠀⠠⠂⠀⠀⠀⠀
⠀⠀⠀⠀⢠⢐⢠⢐⠀⠐⠀⢈⢀⠰⣠⡐⢘⢐⠀⢰⠀⢀⠈⠂⠀⠐⠈⠀⠀⡦⢮⣿⡸⢘⠀⣈⠢⣜⣦⠙⠶⣀⠀⠁⠺⢀⠀⠠⢸⢸⢺⣿⣿⣹⡇⣰⣄⠠⠠⣐⠂⠩⠀⠒⠊⠉⠈⠀⢀⣤⣤⡶⠋⠀⠀⠀⠀⣀⣤⣶
⠀⠀⠀⠀⠘⠁⠸⠠⢒⠀⢀⣀⣤⣿⣿⣤⡈⢂⠀⠁⠀⠨⠀⠂⠸⠈⠀⠨⠀⢿⣺⣾⣿⡈⡳⡈⣗⣤⠛⣿⣿⣾⣲⡈⣤⣀⢀⠀⢀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠐⠀⠤⣬⣭⡽⠙⠀⠀⠀⢀⢀⠐⠶⣬⣟⣻
⠀⠀⠀⢠⣔⣬⢰⢔⢮⣿⢼⣷⢿⣹⠿⣛⠀⡀⢀⢐⢪⢐⢰⣴⣠⣿⠟⢠⣲⠈⢿⢿⣿⣝⣾⣮⣤⠙⢿⣦⣈⠛⢿⣿⣦⣛⢿⣶⣤⠠⢀⠠⢌⠑⠲⢶⣤⣒⣰⠤⢬⣭⣸⣒⣲⣶⠒⠁⠀⠀⢀⠀⢀⣀⣉⣉⣛⣛⣋⣉
⠀⠀⠀⣿⢽⣽⠻⣿⢷⣿⣾⣓⣃⢠⣄⠀⢀⠼⠮⢐⠈⠀⢈⣛⢿⣿⢰⢿⠀⢀⢀⠓⣿⣿⣟⢿⣿⣿⣤⢈⠻⣷⣤⣀⠉⠛⢿⣮⣝⠻⣷⣶⣄⣀⠐⠈⢉⢀⢒⠘⠸⠨⢬⠘⠉⠀⠀⢠⣀⣐⠲⠼⠭⠹⢛⣛⣫⣩⣻⣛
⠀⠀⠀⠹⣾⣩⣶⣽⡿⣿⣽⣽⣿⣺⣻⡿⣗⠀⢀⣼⣚⢀⣶⡉⣊⣠⢻⣌⣤⣸⣌⣠⠀⠈⠛⠻⣿⣽⣿⢾⣷⣶⣌⢙⠻⣿⣶⣤⣍⣛⠻⢿⣿⣿⣿⣿⣿⠿⠻⠒⢉⢀⣀⣀⣀⣀⣘⡻⢦⣿⣼⣿⣿⠿⠻⠻⠿⣿⢒⢸
⠀⠀⠀⠀⠙⢿⢻⣿⣯⣭⢿⣿⢿⣿⣿⣾⣖⣀⢸⣮⢲⣿⣛⣼⣤⢀⠉⠨⠪⣿⢹⣽⣤⢹⣌⢰⠠⠠⠠⠄⢈⢈⢈⠈⢉⠁⠀⠈⠈⠈⢈⠈⠈⠀⠀⢀⠠⠀⠀⠀⠀⠀⠀⠈⢉⠉⠉⢉⢉⠈⠀⢀⠀⠀⠀⠀⠀⠀⠀⠀
`;

const wavesASCII = `
,(   ,(   ,(   ,(   ,(   ,(   ,(   ,(
  '-'  '-'  '-'  '-'  '-'  '-'  '-'  '-'
`;

rippleAPI.connect().then(async () => {
  //Get drops
  const drops = await Earth.getOceanDrops(rippleAPI, Ocean);

  if (drops.length === Ocean.AVAILABLE_DROPS) {
    //Shake the drops
    const shakedDrops = Ocean.shake(drops);
    //Pick random drop
    const randomDrop = crypto.randomInt(0, shakedDrops.length - 1);
    const {
      id,
      specification: {
        source: { address, tag },
      },
    } = shakedDrops[randomDrop];
    const str = tag ? `${address}:${tag}` : address;
    const tsunamiHeight = (Ocean.AVAILABLE_DROPS * 2).toString();

    const unfurlingTsunami = await rippleAPI.preparePayment(
      Ocean.LOCATION,
      Earth.generateWave(
        {
          wave: address,
          waveHeight: tsunamiHeight,
          id,
          tag,
        },
        Ocean
      )
    );

    console.log(tsunamiASCII);
    console.log(`${str}::${id}`, unfurlingTsunami);

    //WAVES
    console.log(wavesASCII);
    const waves = [];
    const dropsWithwaves = drops.filter(
      ({
        specification: {
          destination: { tag },
        },
      }) => {
        return tag;
      }
    );
    //Get waves drops
    const purifiedWaves = Object.entries(
      Ocean.filterEmptyWaves(Ocean.dropsByWaves(drops))
    ).filter((wave) => wave[1] > 1);

    purifiedWaves.forEach((wave) => {
      const [firstWave] = dropsWithwaves
        .filter(
          ({
            specification: {
              destination: { tag },
            },
          }) => {
            return tag === parseInt(wave[0]);
          }
        )
        .sort(
          (
            { outcome: { timestamp: timestampA } },
            { outcome: { timestamp: timestampB } }
          ) => {
            return new Date(timestampA) - new Date(timestampB);
          }
        );

      firstWave.waveHeight = wave[1] - 1;
      waves.push(firstWave);
    });

    await Promise.all(
      waves.map(async (wave) => {
        const {
          id,
          specification: {
            source: { address, tag },
          },
          waveHeight,
        } = wave;

        const unfurlingWaves = await rippleAPI.preparePayment(
          Ocean.LOCATION,
          Earth.generateWave(
            {
              wave: address,
              waveHeight: waveHeight.toString(),
              id,
              tag,
            },
            Ocean
          )
        );

        console.log(unfurlingWaves, ',');
      })
    );

    process.exit(0);
  }

  console.log('The tsunami is comming 🌊...');
  process.exit(1);
});

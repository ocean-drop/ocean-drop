export default class Earth {
  /**
   * Avoid having **Server is missing ledger history in the specified range** error
   * @see : https://github.com/ripple/ripple-lib/issues/879#issuecomment-387374077
   */
  static async info(earthAPI) {
    const info = await earthAPI.getServerInfo();
    const borders = info.completeLedgers.split('-');
    const minLedgerVersion = Number(borders[0]);
    const maxLedgerVersion = Number(borders[1]);

    return {
      minLedgerVersion,
      maxLedgerVersion,
    };
  }

  /**
   *
   * @param {Object} props
   */
  static async oceanWater({
    earthAPI,
    oceanLocation,
    minLedgerVersion,
    maxLedgerVersion,
  }) {
    return await earthAPI.getTransactions(oceanLocation, {
      minLedgerVersion,
      maxLedgerVersion,
    });
  }

  /**
   *
   * @param {*} rippleAPI
   * @param {*} Ocean
   * @returns
   */
  static async getOceanDrops(rippleAPI, Ocean) {
    const { minLedgerVersion, maxLedgerVersion } = await Earth.info(rippleAPI);
    const oceanLocation = Ocean.LOCATION;
    const oceanWater = await Earth.oceanWater({
      earthAPI: rippleAPI,
      oceanLocation,
      minLedgerVersion,
      maxLedgerVersion,
    });
    const filteredOcean = Ocean.filtrate(oceanWater);
    const drops = Ocean.drops(filteredOcean);

    return drops;
  }

  static generateWave({ wave, waveHeight, id, tag }, Ocean) {
    const unfurlingWave = {
      source: {
        address: Ocean.LOCATION,
        maxAmount: {
          value: waveHeight,
          currency: 'XRP',
        },
      },
      destination: {
        address: wave,
        amount: {
          value: waveHeight,
          currency: 'XRP',
        },
      },
      memos: [
        {
          type: 'initial-sender-tx-id',
          format: 'text/plain',
          data: id,
        },
      ],
    };

    if (tag) {
      unfurlingWave.destination['tag'] = tag;
    }

    return unfurlingWave;
  }
}

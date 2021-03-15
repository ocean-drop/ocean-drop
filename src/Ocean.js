export default class Ocean {
  /**
   * Creates a new wave.
   *
   * @param {String} wave - the have id.
   *
   * @returns {String} the wave id.
   */
  static createWave(wave) {
    if (Ocean.isWaveValid(wave)) {
      return wave;
    }

    return undefined;
  }

  /**
   * Aggregates the number of drops per wave.
   *
   * @param {Array} waves
   *
   * @returns {Array}
   */
  static dropsByWaves(waves = []) {
    return waves.reduce((waves = {}, { specification: { destination } }) => {
      const { tag: wave = Ocean.NO_DROP } = destination;

      if (!waves[wave]) {
        waves[wave] = 1;
      } else {
        waves[wave] += 1;
      }

      return waves;
    }, {});
  }

  static drops(ocean) {
    return ocean.filter(
      ({
        outcome: {
          deliveredAmount: { value },
          result,
        },
      }) =>
        Number.parseFloat(value) === Ocean.DROP_PRICE && result === 'tesSUCCESS'
    );
  }

  /**
   * Formats the text of the available drops.
   *
   * @param {Number} drops - actual number of drops.
   *
   * @returns {String} available drops text.
   */
  static dropsLeft(drops = 0) {
    const formatDropsLeft = (Ocean.AVAILABLE_DROPS - drops).toLocaleString(
      'de-CH'
    );

    return `Only ${formatDropsLeft} Left!`;
  }

  /**
   * Filter waves that are empty.
   *
   * @param {Object} waves
   *
   * @returns {Array} filtered waves.
   */
  static filterEmptyWaves(waves) {
    return Object.fromEntries(
      Object.entries(waves).filter(([wave, _drops]) => wave !== Ocean.NO_DROP)
    );
  }

  /**
   * Filters impurities from the oceans.
   *
   * @param {Array} ocean - ocean with all impurities.
   *
   * @returns {Array} purified ocean water.
   */
  static filtrate(ocean) {
    return ocean.filter(
      ({ type, address }) => type === 'payment' && address !== Ocean.LOCATION
    );
  }

  /**
   * Check if has drops left.
   *
   * @param {Number} drops - actual number of drops.
   *
   * @returns {Boolean} true if has drops left false otherwise.
   */
  static hasDropsLeft(drops = 0) {
    return Ocean.AVAILABLE_DROPS > drops;
  }

  /**
   * Check if the wave is valid.
   *
   * @param {String} wave - represents the wave id.
   *
   * @returns {Boolean} true if it's a valid wave false otherwise.
   */
  static isWaveValid(wave) {
    const parsedWave = Number.parseInt(wave);

    return parsedWave && parsedWave > 0 && Number.isSafeInteger(parsedWave);
  }

  /**
   * Shake the ocean. Uses the Fisher-Yates shuffle algorithm.
   *
   * @see https://en.wikipedia.org/wiki/Fisher%E2%80%93Yates_shuffle#The_modern_algorithm
   *
   * @param {Array} drops - all drops in the ocean.
   *
   * @returns {Array} shaken ocean.
   */
  static shake(drops = []) {
    for (let i = drops.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));

      [drops[i], drops[j]] = [drops[j], drops[i]];
    }

    return drops;
  }

  /**
   *
   * @param {*} wave
   * @param {*} oceanWaves
   *
   * @returns
   */
  static wave(wave, oceanWaves = []) {
    return Object.fromEntries(
      Object.entries(oceanWaves).filter(
        ([oceanWave, _drops]) => oceanWave === wave.toString()
      )
    );
  }

  /**
   * Get drops by waves.
   *
   * @param {Array} ocean
   *
   * @returns {Array} waves
   */
  static waves(ocean = []) {
    return Ocean.filterEmptyWaves(Ocean.dropsByWaves(ocean));
  }

  /**
   * Available drops in the ocean.
   */
  static get AVAILABLE_DROPS() {
    return 1000000;
  }

  /**
   * Ocean's drop price.
   */
  static get DROP_PRICE() {
    return 5;
  }

  static get LOCATION() {
    return 'r9chCF3ieEKCVDW1pAvtuDnvcjmBShiVfW';
  }

  /**
   * No drop.
   */
  static get NO_DROP() {
    return 'noDrop';
  }
}

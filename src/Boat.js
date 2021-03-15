export default class Boat {
  static $ = document.querySelector.bind(document);

  static jumpIntoTheOcean(canJumpIntoTheOcean) {
    if (canJumpIntoTheOcean) {
      Boat.$('.falling-drops').classList.add('hide');
      Boat.$('.ocean-drop').classList.remove('hide');
    }
  }

  static canSwim(isSwimmable) {
    if (isSwimmable) {
      Boat.$('.ocean-drop').classList.add('hide');
      Boat.$('.falling-drops').classList.add('hide');
      Boat.$('.no-ocean-drop').classList.remove('hide');
    }
  }

  static makeAWave(wave, Sailor, Ocean) {
    const newWave = Ocean.createWave(wave);

    if (newWave) {
      Sailor.paddle(newWave, Boat.$('.ocean-wave__img'));

      Boat.$('.ocean-wave').classList.remove('hide');
      Boat.$('.ocean-wave figcaption').innerText = wave.toString();
    }
  }

  static watchTheOcean(drops) {
    Boat.$('.drops-remaining').innerText = drops;
  }
}

/**
 * @class Sailor allows to generate a QR code
 */
export default class Sailor {
  /**
   * Generates a QR code image
   *
   * @param {String} text
   * @param {HTMLImageElement} imgElement
   */
  static paddle(text, imgElement, log = console.log) {
    QRCode.toDataURL(text, {
      errorCorrectionLevel: 'H',
      type: 'image/jpeg',
      quality: 0.8,
      margin: 3,
      width: 256,
      height: 256,
      color: {
        // dark: '#23292f',
        // light: '#ffffff',
        dark: '#37405e',
        light: '#d3c29d',
      },
    })
      .then((response) => {
        if (imgElement) {
          imgElement.src = response;
        }
      })
      .catch(log);
  }
}

/**
 * Classe personalitzada d'error per gestionar errors específics del joc.
 * Extén la classe nativa `Error` i mostra missatges d'error a la interfície.
 *
 * @extends Error
 * @author Bernat Alvarez Borrell
 */
export class ErrorBob extends Error {
  /**
   * Crea una nova instància d'ErrorBob.
   *
   * @param {number|string} code - Codi d'error que identifica el tipus d'error.
   * @param {string} message - Missatge descriptiu de l'error.
   */
  constructor(code, message) {
    super(message);
    this.code = code;
  }

  /**
   * Mostra el missatge d'error en una capsa d'error HTML amb l'ID `errorBox`.
   * El missatge es mostra durant 1 segon i després desapareix.
   */
  showError() {
    const errorBox = document.getElementById('errorBox');
    const errorMessage = document.getElementById('errorMessage');

    errorMessage.textContent = this.message;
    errorBox.style.display = 'block';

    setTimeout(() => {
      errorBox.style.display = 'none';
    }, 1000);
  }
}

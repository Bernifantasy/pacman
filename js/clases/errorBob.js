export class ErrorBob extends Error {
  constructor(code,message) {
    super(message);
    this.code = code;
  }

  showError(){
    const errorBox = document.getElementById('errorBox');
    const errorMessage = document.getElementById('errorMessage');

    errorMessage.textContent = this.message;
    errorBox.style.display = 'block';

    setTimeout(() => {errorBox.style.display = 'none';}, 1000);

  }
}

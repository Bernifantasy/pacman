export const auth = {
  // Desa un nou usuari al localStorage
  saveUser(user) {
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    users.push(user);
    localStorage.setItem('users', JSON.stringify(users));
  },

  // Busca un usuari pel seu nom d’usuari
  getUser(username) {
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    return users.find(u => u.username === username);
  },

  // Intenta iniciar sessió amb nom d’usuari i contrasenya
  login(username, password) {
    const user = this.getUser(username);
    if (user && user.password === password) {
      localStorage.setItem('loggedUser', JSON.stringify(user));
      return true;
    }
    return false;
  },

  // Tanca la sessió de l’usuari actual
  logout() {
    localStorage.removeItem('loggedUser');
  },

  // Retorna l’usuari actualment connectat
  currentUser() {
    return JSON.parse(localStorage.getItem('loggedUser'));
  },

  // Comprova si hi ha un usuari autenticat
  isAuthenticated() {
    return !!this.currentUser();
  }
};

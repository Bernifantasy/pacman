// js/auth.js

export const auth = {
    saveUser(user) {
      const users = JSON.parse(localStorage.getItem('users') || '[]');
      users.push(user);
      localStorage.setItem('users', JSON.stringify(users));
    },
  
    getUser(username) {
      const users = JSON.parse(localStorage.getItem('users') || '[]');
      return users.find(u => u.username === username);
    },
  
    login(username, password) {
      const user = this.getUser(username);
      if (user && user.password === password) {
        localStorage.setItem('loggedUser', JSON.stringify(user));
        return true;
      }
      return false;
    },
  
    logout() {
      localStorage.removeItem('loggedUser');
    },
  
    currentUser() {
      return JSON.parse(localStorage.getItem('loggedUser'));
    },
  
    isAuthenticated() {
      return !!this.currentUser();
    }
  };
  
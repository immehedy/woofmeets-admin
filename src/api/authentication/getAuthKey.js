const getAuthKey = () => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('auth-token')
        ? 'Bearer ' + (localStorage.getItem('auth-token') || '')
        : false;
    }
    return false;
  };
  
  export default getAuthKey;
  
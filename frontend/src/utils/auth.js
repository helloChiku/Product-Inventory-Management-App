
export const getAuthToken=()=>{
  return localStorage.getItem('pd_token')
}
export const isAuthorized = ()=> {
  return !!getAuthToken();
};

export const setAuthToken = (token)=>{
  localStorage.setItem('pd_token', token);
}

export const logOutUser = ()=>{
  localStorage.clear();
  sessionStorage.clear();
  window.location.reload()
}






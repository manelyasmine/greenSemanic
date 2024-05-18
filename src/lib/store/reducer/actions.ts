function setAuth(payload: any) {
  return { type: 'SET_AUTH', payload };
}
function signOut(payload: any) {
  return { type: 'SIGN_OUT', payload };
}

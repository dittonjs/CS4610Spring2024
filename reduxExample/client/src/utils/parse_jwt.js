export const parseJwt = (token) => {
  if (!token) return {};
  try {
    const jwtPayload = JSON.parse(window.atob(token.split('.')[1]));
    return jwtPayload;
  } catch {}
};
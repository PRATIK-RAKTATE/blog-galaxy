export const setRefreshCookie = (res, token) => {
  res.cookie("refreshToken", token, {
    httpOnly: true,
    secure: true,
    sameSite: "strict",
    path: "/auth/refresh",
  });
};

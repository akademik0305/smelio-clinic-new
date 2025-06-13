export const useToken = () =>
  useState("token", () =>
    useCookie("rm_token", {
      maxAge: 99999999,
    })
  );

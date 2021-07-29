import { fetchConToken, fetchSinToken } from "../helpers/fetch";

export const startLogin = async (email: any, password: any) => {
  const resp = await fetchSinToken("auth", { email, password }, "POST");
  const body = await resp.json();

  if (body.ok) {
    const actualDate: string = new Date().getTime() as any;
    localStorage.setItem("token", body.token);
    localStorage.setItem("token-init-date", actualDate);
  }
};

export const startChecking = async () => {
  const resp = await fetchConToken("auth/renew");
  const body = await resp.json();
  if (body.ok) {
    const actualDate: string = new Date().getTime() as any;
    localStorage.setItem("token", body.token);
    localStorage.setItem("token-init-date", actualDate);
  }
};

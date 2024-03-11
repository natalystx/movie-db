import { SESSION } from "@/constants/keyValue";

export type SessionData = {
  session_id: string;
  request_token: string;
};

export default class Session {
  static set(session: SessionData, onSet?: () => void) {
    if (global.window) {
      const cookie = new (require("react-cookie") as any).Cookies();
      cookie.set(SESSION.REQUEST_TOKEN, session.request_token, { path: "/" });
      cookie.set(SESSION.SESSION_ID, session.session_id, { path: "/" });
      onSet?.();
      return;
    }
    const cookies = require("next/headers").cookies;
    cookies().set(SESSION.REQUEST_TOKEN, session.request_token);
    cookies().set(SESSION.SESSION_ID, session.session_id);
    onSet?.();
  }

  static get(): SessionData {
    if (global.window) {
      const cookie = new (require("react-cookie") as any).Cookies();
      const request_token = cookie.get(SESSION.REQUEST_TOKEN);
      const session_id = cookie.get(SESSION.SESSION_ID);
      return { request_token, session_id };
    }

    const cookies = require("next/headers").cookies;
    const request_token = cookies().get(SESSION.REQUEST_TOKEN)?.value || "";
    const session_id = cookies().get(SESSION.SESSION_ID)?.value || "";

    return { request_token, session_id };
  }

  static clear(onDone?: () => void) {
    if (global.window) {
      const cookie = new (require("react-cookie") as any).Cookies();
      cookie.remove(SESSION.REQUEST_TOKEN);
      cookie.remove(SESSION.SESSION_ID);
      onDone?.();
      return;
    }
    const cookies = require("next/headers").cookies;
    cookies().delete(SESSION.REQUEST_TOKEN);
    cookies().delete(SESSION.SESSION_ID);
    onDone?.();
  }
}

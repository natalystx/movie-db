import Rxios from "@/core/rxios";
import { RequestTokenDto, SessionDto, ValidApiKeyDto } from "./data-contract";
import Session from "@/utils/Session";

export default class AuthenticationService extends Rxios {
  constructor() {
    super();
  }

  checkApiKey() {
    return this.get<ValidApiKeyDto>("/authentication");
  }

  createRequestToken() {
    return this.get<RequestTokenDto>("/authentication/token/new");
  }

  createSession() {
    return this.get<SessionDto>("/authentication/guest_session/new");
  }

  authenticate(REQUEST_TOKEN: string) {
    if (!global.window) return;
    Session.set({ session_id: "", request_token: REQUEST_TOKEN });
    window.location.replace(
      `https://www.themoviedb.org/authenticate/${REQUEST_TOKEN}?redirect_to=${process.env.NEXT_PUBLIC_HOSTED_URL}`
    );
  }
}

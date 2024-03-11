import AuthenticationService from "@/services/authentication.service";
import { CreateSessionInput } from "@/services/data-contract";

export class AuthRepository {
  private _service: AuthenticationService;
  constructor(service: AuthenticationService) {
    this._service = service;
  }

  checkApiKey() {
    return this._service.checkApiKey();
  }

  createRequestToken() {
    return this._service.createRequestToken();
  }

  createSession() {
    return this._service.createSession();
  }

  authenticate(REQUEST_TOKEN: string) {
    return this._service.authenticate(REQUEST_TOKEN);
  }
}

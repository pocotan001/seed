import { APIClient } from "../client/APIClient";
import createAuthRepository, { AuthRepository } from "./AuthRepository";

export interface Repositories {
  auth: AuthRepository;
}

const createAuthRepositories = (api: APIClient): Repositories => ({
  auth: createAuthRepository(api)
});

export default createAuthRepositories;

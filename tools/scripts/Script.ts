import { Config } from "../Config";

export type Script = (config: Config) => Promise<void>;

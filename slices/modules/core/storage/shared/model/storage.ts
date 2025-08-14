import type { storage } from "../config";

type Storage = typeof storage;
export type StorageSaveParams = Parameters<Storage["save"]>[0];

import type { Draft } from "@reduxjs/toolkit";
import type { StateReducer } from "@shared/model";
import type { AssetDownloaderState } from "../lib";

export type AssetDownloaderReducer<Payload = void> = StateReducer<
	AssetDownloaderDraft,
	Payload
>;
export type AssetDownloaderDraft = Draft<AssetDownloaderState>;

export type AssetDownloaderHandler<Payload = void> = (
	state: AssetDownloaderDraft,
	payload: Payload,
) => void;

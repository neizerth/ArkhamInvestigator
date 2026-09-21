import { END, eventChannel } from "redux-saga";
import type { InitAssetDownloadPayload } from "../../shared/lib";

import * as FileSystem from "expo-file-system";

export type DownloadChannelData =
	| {
			type: "progress";
			value: FileSystem.DownloadProgressData;
	  }
	| {
			type: "error";
			value: Error;
	  }
	| {
			type: "result";
			value?: FileSystem.FileSystemDownloadResult;
	  };

type DownloadChannelOptions = InitAssetDownloadPayload & {
	resumeData?: string;
};

export const downloadChannel = ({
	url,
	diskPath,
	resumeData,
}: DownloadChannelOptions) => {
	const path = FileSystem.documentDirectory + diskPath;

	let emitProgress: FileSystem.FileSystemNetworkTaskProgressCallback<
		FileSystem.DownloadProgressData
	> = () => {};

	const downloadResumable = FileSystem.createDownloadResumable(
		url,
		path,
		{},
		(progress) => emitProgress(progress),
		resumeData,
	);

	const channel = eventChannel<DownloadChannelData>((emit) => {
		emitProgress = (progress) => {
			emit({
				type: "progress",
				value: progress,
			});
		};

		downloadResumable
			.downloadAsync()
			.then((result) => {
				emit({
					type: "result",
					value: result,
				});
				emit(END);
			})
			.catch((error) => {
				emit({
					type: "error",
					value: new Error(error),
				});
			});

		return () => {
			// rejects when the download is already finished or paused
			downloadResumable.pauseAsync().catch(() => {});
		};
	});

	/** Stops the download; on iOS the result holds the only data to resume it later. */
	const pause = () => downloadResumable.pauseAsync();

	return { channel, pause };
};

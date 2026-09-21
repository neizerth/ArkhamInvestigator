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
	return eventChannel<DownloadChannelData>((emit) => {
		const path = FileSystem.documentDirectory + diskPath;

		const downloadResumable = FileSystem.createDownloadResumable(
			url,
			path,
			{},
			(progress) => {
				emit({
					type: "progress",
					value: progress,
				});
			},
			resumeData,
		);

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
			// rejects when the download is already finished
			downloadResumable.pauseAsync().catch(() => {});
		};
	});
};

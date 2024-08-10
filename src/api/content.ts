import API from "api/api";
import { AnnotationI, ContentI } from "types/content";

interface CreateContentI {
	source: string;
}

export const createContent = async (
	data: CreateContentI | FormData,
): Promise<ContentI> => {
	return (await API.POST("content", data)) as ContentI;
};

export const getContent = async (): Promise<ContentI[]> => {
	return (await API.GET("content")) as ContentI[];
};

export const updateContent = async (
	id: string,
	data: { readStatus?: boolean },
) => {
	await API.PATCH(`content/${id}`, { read_status: data.readStatus });
};

export const deleteContent = async (id: string): Promise<void> => {
	await API.DELETE(`content/${id}`);
};

export const downloadFile = async (id: string): Promise<Blob> => {
	return (await API.GET(`content/file/${id}`)) as Blob;
};

export const updateAnnotations = async (
	id: string,
	annotations: AnnotationI[],
) => {
	await API.PUT(`content/${id}/annotation`, { annotations });
};

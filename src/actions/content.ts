import {
	createContent,
	deleteContent,
	getContent,
	updateAnnotations,
} from "api/content";
import { AnnotationI, ContentI } from "types/content";
import { RangeDetailsI } from "util/dom";

export const createContentAction = async (source: string | File | null) => {
	if (!source) {
		throw Error("No source provided.");
	}

	try {
		let data;

		if (source instanceof File) {
			data = new FormData();
			data.append("file", source);
		} else data = { source };

		const newEntry = await createContent(data);
		return (curState: Array<ContentI>) => {
			return { content: [...curState, newEntry] };
		};
	} catch (e) {
		throw Error("Error creating entry.");
	}
};

export const getContentAction = async () => {
	try {
		const content = await getContent();
		return () => {
			return { content };
		};
	} catch (e) {
		throw Error("Error fetching content.");
	}
};

export const deleteContentAction = async (id: string) => {
	try {
		await deleteContent(id);
		return (curState: Array<ContentI>) => {
			return { content: curState.filter(entry => entry.id !== id) };
		};
	} catch (e) {
		throw Error("Error deleting content.");
	}
};

export const addAnnotationAction = async (
	contentID: string,
	annotations: AnnotationI[],
	newAnnotation: AnnotationI,
) => {
	try {
		const newAnnotations = [...annotations, newAnnotation];
		await updateAnnotations(contentID, newAnnotations);
		return (curState: Array<ContentI>) => {
			const updateContent = curState.map(oldContentInst => {
				if (oldContentInst.id === contentID) {
					return { ...oldContentInst, annotations: newAnnotations };
				}
				return oldContentInst;
			});

			return { content: updateContent };
		};
	} catch (e) {
		throw Error("Error adding annotation.");
	}
};

export const deleteAnnotationAction = async (
	contentID: string,
	annotations: AnnotationI[],
	annotationToDelete: RangeDetailsI,
) => {
	try {
		const newAnnotations = annotations.filter(
			annotation =>
				annotation.start_path !== annotationToDelete.startPath ||
				annotation.end_path !== annotationToDelete.endPath ||
				annotation.start_offset !== annotationToDelete.startOffset ||
				annotation.end_offset !== annotationToDelete.endOffset,
		);

		await updateAnnotations(contentID, newAnnotations);
		return (curState: Array<ContentI>) => {
			const updateContent = curState.map(oldContentInst => {
				if (oldContentInst.id === contentID) {
					return { ...oldContentInst, annotations: newAnnotations };
				}
				return oldContentInst;
			});

			return { content: updateContent };
		};
	} catch (e) {
		throw Error("Error deleting annotation.");
	}
};

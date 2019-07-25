import { useEffect } from "react";

export const useDocumentTitle: (title: string) => void = title => {
	useEffect(() => {
		document.title = title;
	}, [title]);
};

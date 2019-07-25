import { stringify } from "query-string";

export type GetCourseURLParams = {
	courseCode: string;
	courseClassListId?: number;
	courseClassId?: number;
	courseClassNumber?: number;
	showOnSeconds?: number;
};

export const getCoursePath = (params: GetCourseURLParams): string => {
	let result = `/courses/${params.courseCode}`;

	let queryParams: Array<[string, string]> = [];

	if (params.courseClassId) queryParams.push(["cci", params.courseClassId.toString()]);
	else if (params.courseClassNumber) queryParams.push(["ccn", params.courseClassNumber.toString()]);
	if (params.courseClassListId) queryParams.push(["ccl", params.courseClassListId.toString()]);
	if (params.showOnSeconds) queryParams.push(["t", params.showOnSeconds.toString()]);

	const queryString = stringify(
		queryParams.reduce<Record<string, string>>(
			(previousValue, currentValue) => ({ ...previousValue, [currentValue[0]]: currentValue[1] }),
			{}
		)
	);

	if (queryString) result += `?${queryString}`;

	return result;
};

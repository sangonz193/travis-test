// import { History } from "history";
// import { action, observable } from "mobx";
//
// export type NavigateOptions = { replace?: boolean; params?: any };
//
// export type NavigateToHomeOptions = NavigateOptions;
//
// // export type NavigateToCoursePathOptions = {
// // 	course: Models.Course | string;
// // 	courseClass?: Models.CourseClass;
// // 	t?: number;
// // };
// // export type NavigateToCourseOptions = NavigateOptions & {
// // 	course: Models.Course | string;
// // 	courseClass?: Models.CourseClass;
// // };
// // export type NavigateToCreateCourseClassContext = {
// // 	course: Models.Course;
// // };
// // export type NavigateToUpdateCourseContext = {
// // 	course: Models.Course;
// // };
// // export type NavigateToUpdateCourseClassContext = {
// // 	courseClass: Models.CourseClass;
// // 	course: Models.Course;
// // };
// // export type NavigateToUpdateFAQContext = {
// // 	faq: Models.FAQ;
// // };
//
// export class NavigationState {
// 	public baseURL: string;
//
// 	@observable
// 	public history: History;
//
// 	public setBaseURL(baseURL: string) {
// 		this.baseURL = baseURL;
// 	}
//
// 	@action
// 	public setHistory(history: History) {
// 		this.history = history;
// 	}
//
// 	@bind
// 	public goBack() {
// 		const { history } = this;
// 		history.goBack();
// 	}
//
// 	public getHomePath(): string {
// 		return "/";
// 	}
//
// 	@bind
// 	public navigateToHome(options: NavigateToHomeOptions = {}) {
// 		this.navigate(this.getHomePath(), options);
// 	}
//
// 	public getCoursePath(options: NavigateToCoursePathOptions) {
// 		const { course, courseClass, t } = options;
//
// 		let result = `/courses/${typeof course === "string" ? course : course.code}`;
//
// 		if (courseClass !== undefined) {
// 			result += `/${courseClass.number}`;
//
// 			if (t !== undefined) result += `?t=${t}`;
// 		}
//
// 		return result;
// 	}
//
// 	@bind
// 	public navigateToCourse(options: NavigateToCourseOptions) {
// 		this.navigate(this.getCoursePath(options), options);
// 	}
//
// 	public getCreateCoursePath() {
// 		return `/courses/create`;
// 	}
//
// 	@bind
// 	public navigateToCreateCourse() {
// 		this.navigate(this.getCreateCoursePath(), {});
// 	}
//
// 	public getCreateCourseClassPath(courseCode: string) {
// 		return `/courses/${courseCode}/createClass`;
// 	}
//
// 	@bind
// 	public navigateToCreateCourseClass({ course }: NavigateToCreateCourseClassContext, options?: NavigateOptions) {
// 		this.navigate(this.getCreateCourseClassPath(course.code), options);
// 	}
//
// 	public getUpdateCoursePath(courseCode: string) {
// 		return `/courses/${courseCode}/update`;
// 	}
//
// 	@bind
// 	public navigateToUpdateCourse({ course }: NavigateToUpdateCourseContext, options?: NavigateOptions) {
// 		this.navigate(this.getUpdateCoursePath(course.code), options);
// 	}
//
// 	public getUpdateCourseClassPath(courseCode: string, courseClassNo: string | number) {
// 		return `/courses/${courseCode}/${courseClassNo}/update`;
// 	}
//
// 	@bind
// 	public navigateToUpdateCourseClass(
// 		{ courseClass, course }: NavigateToUpdateCourseClassContext,
// 		options?: NavigateOptions
// 	) {
// 		this.navigate(this.getUpdateCourseClassPath(course.code, courseClass.number!), options);
// 	}
//
// 	public getCoursesPath() {
// 		return `/courses`;
// 	}
//
// 	@bind
// 	public navigateToCourses(options?: NavigateOptions) {
// 		this.navigate(this.getCoursesPath(), options);
// 	}
//
// 	public getCreateFAQPath() {
// 		return `/faqs/create`;
// 	}
//
// 	@bind
// 	public navigateToCreateFAQ(options?: NavigateOptions) {
// 		this.navigate(this.getCreateFAQPath(), options);
// 	}
//
// 	public getFAQsPath() {
// 		return `/faqs`;
// 	}
//
// 	@bind
// 	public navigateToFAQs(options?: NavigateOptions) {
// 		this.navigate(this.getFAQsPath(), options);
// 	}
//
// 	public getUpdateFAQPath({ faq }: NavigateToUpdateFAQContext) {
// 		return `/faqs/${faq.id}/update`;
// 	}
//
// 	@bind
// 	public navigateToUpdateFAQ(context: NavigateToUpdateFAQContext, options?: NavigateOptions) {
// 		this.navigate(this.getUpdateFAQPath(context), options);
// 	}
//
// 	@bind
// 	protected navigate<TParams extends object>(path: string, options: NavigateOptions = {}, params?: TParams) {
// 		const { history } = this;
//
// 		if (options.replace) history.replace(path);
// 		else history.push(path, params);
// 	}
// }

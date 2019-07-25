declare module "*.svg";
declare module "*.jpeg";
declare module "*.jpg";

declare const uuid: () => string;

declare type RecursivePartial<T> = {
	[P in keyof T]?: T[P] extends Array<infer U>
		? Array<RecursivePartial<U>>
		: T[P] extends object
		? RecursivePartial<T[P]>
		: T[P];
};

declare type Nullable<T> = T | undefined | null;

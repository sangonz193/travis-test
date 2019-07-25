// import localforage from "localforage";
//
// enum StorageKeys {
// 	TOKEN = "token"
// }
//
// export class StorageState {
// 	public async getToken(): Promise<string | null> {
// 		const token = await localforage.getItem<any>(StorageKeys.TOKEN);
//
// 		return Promise.resolve(typeof token === "string" ? token : null);
// 	}
//
// 	public async setToken(token: string) {
// 		return localforage.setItem(StorageKeys.TOKEN, token);
// 	}
//
// 	public deleteToken() {
// 		localforage.removeItem(StorageKeys.TOKEN);
// 	}
// }

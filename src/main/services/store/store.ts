import { app } from "electron";
import Store from "electron-store";
import { v4 as uuidv4 } from "uuid";
export type Data = {
  title: string;
  url: string;
  iconUrl?: string;
};

export type Schema = {
  [id: string]: Data;
};

const store = new Store<Schema>({
  cwd: app.getPath("userData"),
  name: "config",
  fileExtension: "json",
});

export function getAlldata(): Data[] {
  return Object.values(store.store);
}

export function getData(id: string): Data {
  return store.get(id);
}

export function addData(data: Data): boolean {
  const id = uuidv4();
  store.set(id, data);
  const isSuccess = !!store.get(id);
  return isSuccess;
}

export function editData(id: string, data: Data): boolean {
  store.set(id, data);
  const isSuccess = JSON.stringify(store.get(id)) == JSON.stringify(data);
  return isSuccess;
}

export function deleteData(id: string): boolean {
  store.delete(id);
  const isSuccess = !!store.get(id);
  return isSuccess;
}

export function clearStore() {
  store.clear();
}

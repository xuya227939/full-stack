import { createStore, useStore } from "zustand";

//  to 6-20: 定义下载数据的接口类型
export interface DownloadData {
  url?: string;
  type?: "video" | "picker";
  picker?: Array<{
    url: string;
    type: "photo";
  }>;
  origin?: string;
}

interface State {
  //  to 6-20: 存储下载解析后的数据
  downloadDatas: DownloadData | null;
}

interface Actions {
  setDownloadDatas: (params: DownloadData | null) => void;
}

const initialState: State = {
  downloadDatas: null,
};

export const landingStore = createStore<State & Actions>()((set, get) => ({
  ...initialState,
  //  to 6-20: 设置下载数据
  setDownloadDatas: (params) => {
    set(() => ({ downloadDatas: params }));
  },
}));

export const useLandingStore = () => useStore(landingStore);

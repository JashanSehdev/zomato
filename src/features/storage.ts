// /home/zenmonk-info/Titanium/next-recipe/features/storage.ts
import createWebStorage from "redux-persist/lib/storage/createWebStorage";

// Creates a dummy storage engine for Server-Side Rendering (SSR) environments
const createNoopStorage = () => {
  return {
    getItem(_key: string) {
      return Promise.resolve(null);
    },
    setItem(_key: string, value: any) {
      return Promise.resolve(value);
    },
    removeItem(_key: string) {
      return Promise.resolve();
    },
  };
};

// Check if running in browser (window is defined); otherwise use dummy storage
const storage = typeof window !== "undefined" 
  ? createWebStorage("local") 
  : createNoopStorage();

export default storage;

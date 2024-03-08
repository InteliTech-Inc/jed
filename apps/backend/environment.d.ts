declare global {
  namespace NodeJS {
    interface ProcessEnv {
      [key: string]: number | undefined;
      PORT: string;
      MONGO_DB_URI: string;
    }
  }
}

export {};

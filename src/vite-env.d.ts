/// <reference types="vite/client" />
interface ImportMetaEnv {
  readonly VITE_KAKAO_API: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

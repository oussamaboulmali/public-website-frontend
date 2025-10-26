"use client";

import { LoginDialog } from "./login";

export default function LoginClientWrapper({
  isMobile,
  designChanger,
  envConfig,
  dir,
}) {
  return (
    <LoginDialog
      isMobile={isMobile}
      designChanger={designChanger}
      envConfig={envConfig}
      dir={dir}
      lang={envConfig?.lang}
    />
  );
}

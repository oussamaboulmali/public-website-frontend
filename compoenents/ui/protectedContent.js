"use client";

import { useState } from "react";
import Icon from "@mdi/react";
import { mdiLock } from "@mdi/js";
import { LoginDialog } from "./Auth/login";
import translations from "../../locales/translation";

export default function SubscriberContent({ envConfig }) {
  const [isLoginDialogOpen, setIsLoginDialogOpen] = useState(false);

  const openLoginDialog = () => {
    setIsLoginDialogOpen(true);
  };

  const closeLoginDialog = () => {
    setIsLoginDialogOpen(false);
  };

  return (
    <div className="flex justify-center w-full my-6">
      <div className="w-4/5 bg-[#EFF6FF] rounded-lg shadow p-8">
        <div className="flex flex-col items-center gap-4 text-center">
          <Icon
            path={mdiLock}
            size={2.5}
            className="text-[#1D589F]"
            aria-hidden="true"
          />

          <h3 className="text-xl font-bold text-gray-800">
            {translations?.restricted_content_title}
          </h3>

          <p className="text-gray-600 mb-4">
            {translations?.restricted_content_description}
          </p>

          <LoginDialog
            isOpen={isLoginDialogOpen}
            onClose={closeLoginDialog}
            designChanger={true}
            envConfig={envConfig}
            lang={envConfig?.lang}
          />
        </div>
      </div>
    </div>
  );
}

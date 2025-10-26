"use client";
import {
  useEffect,
  useState,
  useRef,
  useActionState,
  startTransition,
} from "react";
import {
  mdiAccount,
  mdiClose,
  mdiEmail,
  mdiLock,
  mdiLogout,
  mdiChevronDown,
  mdiChevronUp,
} from "@mdi/js";
import Icon from "@mdi/react";
import translations from "../../../locales/translation";
import Captcha from "./captcha";
import LoginForm from "./otpLogin";
import { loginAction, LogoutAction } from "src/app/actions/actions-server";
import { deleteCookies } from "src/app/actions/deleteAuthCookie";
import { decryptData } from "utils/crypto";
import { compareCaseSensitive } from "utils/helpersClient";
import Cookies from "js-cookie";
import Image from "next/image";

export function LoginDialog({ isMobile, designChanger, envConfig, dir, lang }) {
  const [open, setOpen] = useState(false);
  const [newForm, setNewForm] = useState(false);
  const [userId, setUserId] = useState(false);
  const [captchaValue, setCaptchaValue] = useState(null);
  const [userInput, setUserInput] = useState(null);
  const [subscriber, setSubscriber] = useState(null);
  const [subscriberAlias, setSubscriberAlias] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const [stateForm, formAction] = useActionState(loginAction, null);
  const [stateLogout, formLogoutAction] = useActionState(LogoutAction, null);
  const [statedelete, DeleteAction] = useActionState(deleteCookies, null);
  const [captchaActions, setCaptchaActions] = useState(null);
  const formRef = useRef(null);

  const dropdownRef = useRef(null);

  useEffect(() => {
    const encrypted = sessionStorage.getItem("aorm");
    if (!encrypted) return;
    try {
      const decrypted = decryptData(encrypted);
      const parsed = JSON.parse(decrypted);
      const storedUsername = parsed[1]?.username;
      const storedUsernameAlias = parsed[2]?.subscriber;
      setSubscriber(storedUsername);
      setSubscriberAlias(storedUsernameAlias);
    } catch (err) {}
  }, []);

  // Fermer le dropdown quand on clique en dehors
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownRef]);

  useEffect(() => {
    if (statedelete?.success) {
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    }
  }, [statedelete]);

  useEffect(() => {
    if (stateLogout?.data?.success) {
      sessionStorage.clear();
      setSubscriber(null);
      setSubscriberAlias(null);
      setDropdownOpen(false);
      startTransition(() => {
        DeleteAction();
      });
    }
  }, [stateLogout]);

  const handleLogout = async () => {
    startTransition(() => {
      formLogoutAction();
    });
  };

  useEffect(() => {
    if (stateForm?.data?.success) {
      /*  if (!stateForm?.isBlocked) {
        setDisabled(false);
      } */
      setErrorMessage(null);
      setNewForm(stateForm.data.success);
      setUserId(stateForm.data.data?.userId);
    }
  }, [stateForm]);

  useEffect(() => {
    const cookieValue = Cookies.get(envConfig?.cookiesFormName);

    if (cookieValue === "1" || cookieValue === JSON.stringify(1)) {
      setDisabled(true);
    }
  }, []);

  const OnClearCaptchaError = () => {
    setCaptchaActions(false);
  };

  useEffect(() => {
    if (stateForm?.error) {
      setErrorMessage(stateForm?.error);
      setCaptchaActions(true);
      if (stateForm?.isBlocked) {
        setTimeout(() => {
          setOpen(false);
          const expiresAt = new Date(
            new Date().getTime() +
              parseInt(envConfig?.cookiesFormExpire) * 60 * 1000
          );
          Cookies.set(envConfig?.cookiesFormName, JSON.stringify(1), {
            secure: true,
            sameSite: "Strict",
            expires: expiresAt,
          });

          setDisabled(true);
        }, 1000);
      }
    }
  }, [stateForm]);

  const handleGetCaptchValue = (userInput, captchaValue) => {
    setCaptchaValue(captchaValue);
    setUserInput(userInput);
  };

  // Fonction de soumission du formulaire avec validation du captcha
  const handleSubmit = (event) => {
    setErrorMessage(null);
    event.preventDefault();
    if (!formRef.current) {
      setErrorMessage(translations?.otpError);
      return;
    }

    const formData = new FormData(formRef.current);
    let formValues = {};
    let allFieldsFilled = true;

    for (const [key, value] of formData.entries()) {
      formValues[key] = value.trim();

      if (!formValues[key]) {
        allFieldsFilled = false;
      }
    }

    if (!allFieldsFilled) {
      setErrorMessage(translations?.errorSubmitForm);
      return;
    }

    if (!userInput || userInput.trim() === "") {
      setErrorMessage(translations?.otpMsg);
      return;
    }

    if (!compareCaseSensitive(userInput, captchaValue)) {
      setErrorMessage(translations?.otpMsgError);
      return;
    }

    // Si tout est valide, soumettre le formulaire
    startTransition(() => {
      formAction(formData);
    });
  };

  // Fonction pour gérer le retour au formulaire de connexion (depuis OTP)
  const handleBackToLogin = () => {
    setNewForm(false);
  };

  // Fonction pour toggler le dropdown
  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Bouton d'ouverture */}
      {subscriber ? (
        <div
          onClick={toggleDropdown}
          className="flex items-center w-auto text-white cursor-pointer hover:font-bold bg-[#1D589F] p-2"
        >
          <Icon path={mdiAccount} size={0.8} className="text-white" />
          <span className="ml-2 max-w-32 truncate">{subscriber}</span>
          <Icon
            path={dropdownOpen ? mdiChevronUp : mdiChevronDown}
            size={0.7}
            className="ml-1 text-white"
          />
        </div>
      ) : (
        <button
          onClick={() => setOpen(true)}
          disabled={disabled}
          className={`flex items-center justify-center ${
            isMobile
              ? designChanger
                ? "w-10 h-10 rounded-full bg-[#1D589F] text-white shadow-md hover:bg-[#1D589F]/90"
                : "w-10 h-10 rounded-full bg-white text-[#1D589F] shadow-md hover:bg-gray-100"
              : designChanger
              ? "btn bg-[#1D589F] text-white hover:bg-[#1D589F]/90 px-4 py-2"
              : "btn btn-outline-white bg-white text-black hover:bg-gray-100 px-4 py-2"
          }`}
        >
          <Icon path={mdiAccount} size={1} className="text-inherit" />
          {!isMobile && <span className="ml-2">{translations?.connected}</span>}
        </button>
      )}

      {/* Dropdown menu */}
      {dropdownOpen && subscriber && (
        <div className="absolute left-1/2 -translate-x-1/2 mt-2 w-64 bg-white rounded-lg shadow-lg border border-gray-200 z-50 overflow-hidden">
          <div className="p-4 border-b border-gray-200">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                <span className="text-[#1D589F] font-bold text-lg">
                  {subscriberAlias.charAt(0)}
                </span>
              </div>

              <div className="ml-3">
                <p className="font-medium text-gray-800">{subscriberAlias}</p>
                <p className="text-sm text-gray-500 truncate">{subscriber}</p>
              </div>
            </div>
          </div>

          <div className="py-2 border-t border-gray-200">
            <button
              onClick={handleLogout}
              className="w-full text-left px-4 py-2 text-red-600 hover:bg-gray-100 flex items-center"
            >
              <Icon path={mdiLogout} size={0.8} className="mr-2" />
              {translations?.disconnected}
            </button>
          </div>
        </div>
      )}

      {/* Dialogue de connexion */}
      {open && (
        <div className="fixed inset-0 flex items-center justify-center bg-[#222021]/80 bg-opacity-10 z-1000000">
          <div className="w-[90%] h-fit min-h-[550px] 2xl:min-h-[650px] relative bg-white md:w-full max-w-6xl rounded-lg overflow-hidden shadow-lg flex">
            {/* Bouton Close */}

            <button
              onClick={() => setOpen(false)}
              className={`absolute top-4 ${
                dir === "rtl" ? "left-4" : "right-4"
              } text-gray-500 cursor-pointer hover:text-gray-700 z-10`}
            >
              <Icon path={mdiClose} size={1} className="text-gray-500" />
            </button>

            {/* Partie gauche */}
            <div className="hidden sm:block w-1/2 relative aspect-1">
              <Image
                src={`/${lang}/aps-paper.png`}
                alt="APS Paper"
                fill
                className="object-cover object-center "
                priority
              />
              <div className="absolute inset-0 flex items-center justify-center"></div>
            </div>

            {/* Partie droite - Le formulaire */}
            {newForm ? (
              <LoginForm
                envConfig={envConfig}
                onBackToLogin={handleBackToLogin}
                userId={userId}
              />
            ) : (
              <div className="w-full sm:w-1/2 p-8 flex flex-col justify-center">
                <h1 className="text-4xl font-bold mb-2 text-center text-black">
                  {translations?.connexion}
                </h1>
                <p className="text-[17px] font-normal mb-8 text-center text-gray-500">
                  {translations?.connexionLabel}
                </p>
                <form
                  className="flex flex-col gap-5 w-[98%] md:w-[75%] mx-auto"
                  ref={formRef}
                  onSubmit={handleSubmit}
                  //action={formAction}
                >
                  <div className="relative w-full">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                      <Icon path={mdiEmail} className="h-5 w-5 text-gray-600" />
                    </div>
                    <input
                      type="text"
                      name="email"
                      placeholder={translations?.username}
                      className="bg-gray-100 rounded-[5px] p-3 w-full pl-10 placeholder-gray-500 text-black"
                      //onChange={(e) => setUsername(e.target.value)}
                    />
                  </div>

                  <div className="relative ">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                      <Icon path={mdiLock} className="h-5 w-5 text-gray-600" />
                    </div>
                    <input
                      type="password"
                      name="password"
                      placeholder={translations?.password}
                      className="bg-gray-100 rounded-[5px] p-3 w-full pl-10 placeholder-gray-500 text-black"
                      //onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>

                  <div className="relative ">
                    <Captcha
                      handleGetCaptchValue={handleGetCaptchValue}
                      compareCaseSensitive={compareCaseSensitive}
                      onCaptchaError={captchaActions}
                      OnClearCaptchaError={OnClearCaptchaError}
                    />
                  </div>

                  {/* Bouton de connexion */}
                  <button
                    //type="submit"
                    className="btn w-full text-white bg-[#1D589F] hover:bg-[#1D589F]/80 border border-[#1D589F]"
                  >
                    {translations.connected}
                  </button>
                  {errorMessage && (
                    <div className="text-red-600 text-sm font-bold">
                      {errorMessage}
                    </div>
                  )}
                </form>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

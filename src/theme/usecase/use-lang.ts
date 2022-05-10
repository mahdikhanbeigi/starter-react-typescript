import { useEffect, useState } from "react";
import { IDictionary, IUseLang, langEn, langFa } from "theme";
import { instance } from "hook/global";

const createLinkCss = (id: string, href: string) => {
  const head = document.getElementsByTagName("head")[0];
  const link = document.createElement("link");
  link.id = id;
  link.rel = "stylesheet";
  link.type = "text/css";
  link.href = href;
  head.appendChild(link);
};
const getDictionary = (code: string): IDictionary => {
  let data: IDictionary = Object(langEn);
  switch (code) {
    case "fa-IR": {
      data = Object(langFa);
      break;
    }
  }
  document.documentElement.lang = data["theme.locale"];
  document.documentElement.dir = data["theme.dir"];
  const rtlPathname = data["theme.dir"] === "rtl" ? ".rtl" : "";
  const bootstrapReboot = document.querySelector('link[id="bootstrapReboot"]');
  const bootstrapRebootPathname =
    "/assets/css/bootstrap-reboot" + rtlPathname + ".min.css";
  const bootstrapGrid = document.querySelector('link[id="bootstrapGrid"]');
  const bootstrapGridPathname =
    "/assets/css/bootstrap-grid" + rtlPathname + ".min.css";

  const iransansPathname = "/assets/css/iransans.css";
  const robotoPathname =
    "https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;600;700;800&display=swap";
  const fontFamily = document.querySelector('link[id="fontFamily"]');
  const fontFamilyPathname =
    data["theme.locale"] === "fa-IR" ? iransansPathname : robotoPathname;

  if (bootstrapReboot && bootstrapGrid && fontFamily) {
    bootstrapReboot.setAttribute("href", bootstrapRebootPathname);
    bootstrapGrid.setAttribute("href", bootstrapGridPathname);
    fontFamily.setAttribute("href", fontFamilyPathname);
  } else {
    createLinkCss("bootstrapReboot", bootstrapRebootPathname);
    createLinkCss("bootstrapGrid", bootstrapGridPathname);
    createLinkCss("fontFamily", fontFamilyPathname);
  }

  return data;
};
const localDictionary = localStorage.getItem("lang");

let defaultDictionary = getDictionary(localDictionary || "fa-IR");

export const useLang = (): IUseLang => {
  const [dictionary, setDictionary] = useState<IDictionary>(defaultDictionary);

  useEffect(() => {
    const changeStorage = () => {
      const lang = localStorage.getItem("lang");
      if (lang === "en-US" || lang === "fa-IR") {
        onChange(lang);
      }
    };
    window.addEventListener("storage", changeStorage);
    return () => {
      window.removeEventListener("storage", changeStorage);
    };
  }, []);

  const onChange: IUseLang["onChange"] = (code) => {
    localStorage.setItem("lang", code);
    instance.defaults.baseURL = process.env.REACT_APP_API_URL + "/" + code;
    setDictionary(getDictionary(code));
  };
  return {
    dictionary,
    onChange,
  };
};

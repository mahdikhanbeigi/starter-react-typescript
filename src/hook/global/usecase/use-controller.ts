import axios from "axios";
import { IDictionary } from "theme";
import { IOutputController, IUseController } from "hook/global";

const STORAGE_LANG = localStorage.getItem("lang") || "en-US";
export const instance = axios.create({
  baseURL: process.env.REACT_APP_API_URL + "/" + STORAGE_LANG,
});

export const useController = (dictionary: IDictionary) => {
  const onRequest: IUseController["onRequest"] = (data) => {
    const REPEAT_INTERVAL_SECOND = 10;
    const CancelToken = axios.CancelToken;
    const source = CancelToken.source();
    let output: {
      [index: string]: Promise<IOutputController>;
    } = {};
    for (let property in data) {
      const stopDate = Date.now() + REPEAT_INTERVAL_SECOND * 1000;
      let _timeout: undefined | NodeJS.Timeout;
      const request = {
        ...data[property],
        cancelToken: source.token,
        ...data[property].config,
      };
      delete request.config;
      output[property] = new Promise((resolve, reject) => {
        const getData = (counterDown: number) => {
          if (_timeout) clearTimeout(_timeout);
          instance(request)
            .then((res) => {
              const data = res.data;
              return resolve({
                code: data.isSuccess,
                errors: data.errors,
                data: data.data,
              });
            })
            .catch((e) => {
              if (axios.isCancel(e)) return reject(e);
              const date = Date.now();
              let errors = [dictionary["fetch.request.error"]];
              try {
                // if (e.response?.status === 401) {
                //     localStorage.clear();
                //     window.location.replace(window.location.origin+"/login?backUrl=" + window.location.pathname);
                // }
                errors = e.response.data.errors;
              } catch (e) {}
              if (
                (!e.response ||
                  (e.response && ![404, 401].includes(e.response.status))) &&
                (date < stopDate || counterDown > 0)
              ) {
                _timeout = setTimeout(() => {
                  getData(--counterDown);
                }, 1000);
              } else {
                return resolve({ data: null, code: false, errors });
              }
            });
        };
        getData(3);
      });

      request.cancelToken.promise.then(() => {
        if (_timeout) clearTimeout(_timeout);
      });
    }
    return {
      output,
      cancel: source.cancel,
    };
  };
  return {
    onRequest,
  };
};

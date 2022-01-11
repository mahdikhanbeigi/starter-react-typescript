import axios, {AxiosRequestConfig} from 'axios';


export function getRandomIntInclusive(min: number, max: number) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return (Math.random() * (max - min + 1)) + min;
}

const persianNumbers = [/۰/g, /۱/g, /۲/g, /۳/g, /۴/g, /۵/g, /۶/g, /۷/g, /۸/g, /۹/g],
    arabicNumbers = [/٠/g, /١/g, /٢/g, /٣/g, /٤/g, /٥/g, /٦/g, /٧/g, /٨/g, /٩/g];
export const fixNumbers = function (str: string) {
    for (let i = 0; i < 10; i++) {
        str = str.replace(persianNumbers[i], String(i)).replace(arabicNumbers[i], String(i));
    }
    return str;
};

export function just_persian(str: string) {
    const p = /^[\u0600-\u06FF\s]+$/;
    return p.test(str);
}

export const instance = axios.create({baseURL: process.env.REACT_APP_API_URL});
type IDataController = {
    [index: string]: {
        baseURL?: string,
        url: string,
        method: "POST" | "GET" | "PUT" | "DELETE",
        data?: any,
        config?: AxiosRequestConfig;
    };
}
type IOutputController = {
    data: [] | {} | null,
    code: boolean,
    errors: string[]
}
export const controller = (data: IDataController) => {
    const CancelToken = axios.CancelToken;
    const source = CancelToken.source();
    let output: {
        [index: string]: Promise<IOutputController>
    } = {};
    for (let property in data) {
        const request = {
            ...data[property],
            cancelToken: source.token,
            ...data[property].config
        }
        delete request.config;

        output[property] = new Promise((resolve) => {
            instance(request)
                .then((res): IOutputController => {
                    const data = res.data;
                    return {
                        code: data.isSuccess,
                        errors: data.errors,
                        data: data.data,
                    };
                })
                .catch((e): IOutputController => {
                    let errors = ["خطا در برقراری ارتباط"];
                    try {
                        errors = e.response.data.errors
                    }catch (e){}
                    return {data: null, code: false, errors};
                })
                .then((r) => resolve(r))
        });
    }
    return {
        output,
        cancel: source.cancel
    }
};

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
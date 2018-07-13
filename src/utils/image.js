import { getAccoImg } from "./accommodation";
import { getMissionImg } from "./mission";

export const getDefaultObjImg = (obj) => {
    if (!obj) {
        return "/img/people-working.jpg";
    }
    if (Object.prototype.hasOwnProperty.call(obj, "travellers")) {
        return getMissionImg(obj);
    }
    if (Object.prototype.hasOwnProperty.call(obj, "host")) {
        return getAccoImg(obj);
    }
    return null;
};

export const getImgUrl = (imgObj) => {
    if (imgObj && imgObj.url) {
        if (!imgObj.url.includes("data:image/") && !imgObj.url.includes("http")) {
            return `data:image/jpeg;base64,${imgObj.url}`;
        }
        return imgObj.url;
    }
    return "/img/people-working.jpg";
}

export const euiezijfiezjfe = "dfjiezfoeo";

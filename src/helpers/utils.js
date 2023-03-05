import { enUS } from "date-fns/locale";
import { formatDistanceToNowStrict } from "date-fns";

export function getFormattedDistanceToNow(date) {
  const options = {
    locale: {
      ...enUS,
      formatDistance: (unit, count) => {
        const units = {
          xDays: `${count}d ago`,
          xHours: `${count}h ago`,
          xMinutes: `${count}mins ago`,
          xMonths: `${count}mo ago`,
          xSeconds: `${count} secs ago`,
          xYears: `${count}y ago`,
        };
        return units[unit] || "%d h ago";
      },
    },
  };

  return formatDistanceToNowStrict(new Date(date), options);
}

export function fileToBase64(file) {
  return new Promise((resolve, reject) => {
    const fr = new FileReader();
    fr.onload = () => resolve(fr.result);
    fr.onerror = (err) => reject(err);
    fr.readAsDataURL(file);
  });
}

export function getShortText(text, maxLength = 230) {
  const isLongText = text.length > maxLength;
  const shortText = isLongText ? text.substring(0, maxLength) + "..." : text;
  return shortText;
}

export function randomNumber(min = 0, max = 100) {
  const difference = max - min;
  let rand = Math.random();
  rand = Math.floor(rand * difference);
  rand = rand + min;
  return rand;
}

export function toFormDataObj(params) {
  const fd = new FormData();
  for (const [v, k] of Object.entries(params)) {
    if (Array.isArray(k)) {
      for (let item of k) {
        fd.append(v, item);
      }
    } else {
      fd.append(v, k);
    }
  }
  return fd;
}

function dec2hex(dec) {
  return dec.toString(16).padStart(2, "0");
}

export function generateId(len) {
  const arr = new Uint8Array((len || 40) / 2);
  window.crypto.getRandomValues(arr);
  return Array.from(arr, dec2hex).join("");
}

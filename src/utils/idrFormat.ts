export function idrFormat(number: number) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
  }).format(number);
}

export function formatK(num: number) {
  const numAbs = Math.abs(num);
  const numSign = Math.sign(num);
  let formattedNum;
  if (numAbs >= 1e6) {
    formattedNum = (numSign * (numAbs / 1e6)).toFixed(1) + "M";
  } else if (numAbs >= 1e3) {
    formattedNum = (numSign * (numAbs / 1e3)).toFixed(1) + "K";
  } else {
    formattedNum = num.toString();
  }
  return formattedNum;
}

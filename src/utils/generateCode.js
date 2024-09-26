const generateCode = (codelength) => {
  const number = String(Math.random()).split(".")[1].split("");
  const length = number.length;
  let code = "";

  if (!codelength) {
    codelength = 4;
  }

  for (let i = 0; i < codelength; i++) {
    code = code + number[length - (i + 1)];
  }
  return code
};

export default generateCode;

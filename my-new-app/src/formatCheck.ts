const FormatCheck = (value: string): boolean => {
  const reg = /^\d{4}-\d{2}-\d{2} \d{2}:\d{2}$/;
  return reg.test(value);
}

export default FormatCheck;
const FormatCheck = (value: string): boolean => {
  // まずは簡単にフォーマットチェック
  const reg = /^\d{4}-\d{2}-\d{2} \d{2}:\d{2}$/;
  if(!reg.test(value)) return false
  // 日付として有効かどうかをチェック
  const [a, b] = value.split(" ");
  const date = new Date(`${a}T${b}:00.125Z`);
  return !(Number.isNaN(date.getTime()));
}

export default FormatCheck;
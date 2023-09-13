export const validateUsername = username => {
  if (username.length !== 12) {
    return 'Số (CCCD) phải có độ dài là 12 ký tự';
  }
  return '';
};

export const validatePassword = password => {
  if (password.trim() === '') {
    return 'Vui lòng nhập mật khẩu';
  }
  return '';
};

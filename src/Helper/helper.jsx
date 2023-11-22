import { isEmail, isURL } from 'validator';

export  const catchError = (e) => {
  let message = 'Unknown error';
  if (typeof e === 'string') message = e;
  if (Object.prototype.hasOwnProperty.call(e, 'message') && typeof e.message === 'string') ({ message } = e);
  if (Object.prototype.hasOwnProperty.call(e, 'error') && typeof e.error === 'string') ({ error: message } = e);
  if (Object.prototype.hasOwnProperty.call(e, 'msg') && typeof e.msg === 'string') ({ msg: message } = e);
  return message;
};

export const validateEmail = email => isEmail(email);
export const validateUrl = url => isURL(url);
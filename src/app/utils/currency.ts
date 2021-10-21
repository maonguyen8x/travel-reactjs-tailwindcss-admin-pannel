import { isNaN } from 'ramda-adjunct';
import { LANGUAGES } from '../constants';
// import I18n from '../commom/I18n';

interface IProps {
  value?: any;
  precision?: any;
  showCurrency?: boolean;
}

const getNumberOnly = (value: any) => {
  if (!value) {
    return '';
  }

  return value
    .toString()
    .replace(/,/g, '')
    .replace(/[^.\d]/g, '')
    .replace(/^(\d*\.?)|(\d*)\.?/g, '$1$2');
};

const toNumber = (value: any) => {
  const trimmedValue = getNumberOnly(value);
  const numberValue = parseFloat(trimmedValue);

  return isNaN(numberValue) ? 0 : numberValue;
};

const formatCurrency = ({ value }: IProps) => {
  const numberValue = typeof value === 'string' ? toNumber(value) : value;

  const formattedValue = toNumber(numberValue);

  return formattedValue;
};

const formatMoney = (currencies: string, format: number) =>
  Intl.NumberFormat(LANGUAGES.VN, {
    style: 'currency',
    currency: currencies
  }).format(format);

export { getNumberOnly, toNumber, formatCurrency, formatMoney };

import { chain, range } from 'lodash';
import { MaskSymbol, MaskPatterns } from './types';

const hiddenCharacter = '•';

export const maskPatterns: Readonly<MaskPatterns> = {
  A: /[A-Z]/,
  a: /[a-z]/,
  x: /[A-Za-z]/,
  '0': /[0-9]/,
  '*': /[A-Za-z0-9]/,
};

export const isCharSeparator = (character?: string): boolean => {
  return character
    ? !Object.values(maskPatterns).some(pattern => character?.match(pattern))
    : false;
};

export const getSeparatorsOffset = (cursorPosition: number, maskedValue = '') => {
  let currentCursorPosition = cursorPosition;
  let char = maskedValue.charAt(currentCursorPosition);
  let separatorsOffset = 0;

  while (isCharSeparator(char)) {
    char = maskedValue.charAt(++currentCursorPosition);
    separatorsOffset++;
  }

  return separatorsOffset;
};

export const getNewCursorPosition = (
  cursorPosition: number | null,
  maskedValue: string,
  prevMaskedValue: string,
  value = ''
) => {
  const position = cursorPosition || 0;

  if (
    maskedValue === prevMaskedValue ||
    (maskedValue.length < prevMaskedValue.length && value.length !== 1)
  ) {
    return position;
  }

  return position + getSeparatorsOffset(position - 1, maskedValue);
};

export const applyMask = (value = '', mask = ''): string => {
  if (!mask) {
    return value;
  }

  const validChars = [];
  const maskLength = mask.length;
  const valueLength = value.length;
  let maskIndex = 0;
  let valueIndex = 0;

  while (maskIndex < maskLength && valueIndex < valueLength) {
    const maskChar = mask.charAt(maskIndex);
    const valChar = value.charAt(valueIndex);
    const pattern = maskPatterns[maskChar as MaskSymbol];

    if (pattern) {
      if (valChar.match(pattern)) {
        validChars.push(valChar);
        maskIndex++;
      }
      valueIndex++;
    } else {
      validChars.push(maskChar);
      if (maskChar === valChar) {
        valueIndex++;
      }
      maskIndex++;
    }
  }

  return validChars.join('');
};

export const getPureValue = (maskedValue = '') => {
  const characters = maskedValue.split('').filter(item => item.trim() !== '');

  for (let index = 0; index < maskedValue.length; index++) {
    if (isCharSeparator(characters[index])) {
      characters.splice(index, 1);
    }
  }

  return characters.join('');
};

export const hideValue = (value = '', mask = '', showLastChar: boolean) => {
  if (!mask) {
    return range(value.length)
      .map(() => hiddenCharacter)
      .join('');
  }

  if (value.length <= 1 && showLastChar) {
    return value;
  }

  const hidden = chain(showLastChar ? value.slice(0, value.length - 1) : value)
    .map(character => (isCharSeparator(character) ? character : hiddenCharacter))
    .join('')
    .value();

  return showLastChar ? hidden + value[value.length - 1] : hidden;
};

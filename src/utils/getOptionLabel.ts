import {
  fieldOptions,
  careerOptions,
  topicOptions,
  regionOptions,
} from '../constants/selectOptions';

type Option = {
  value: string;
  label: string;
};

const getOptionLabel = (options: Option[], optionValue: string): string => {
  if (optionValue === '') {
    return '';
  }

  const option = options.find((option) => option.value === optionValue);

  if (option == null) {
    console.error(`optionValue: ${optionValue} - invalid option value`);
    return '';
  }

  return option.label;
};

export const getFieldLabel = (fieldValue: string): string => {
  return getOptionLabel(fieldOptions, fieldValue);
};

export const getCareerLabel = (careerValue: string): string => {
  return getOptionLabel(careerOptions, careerValue);
};

export const getTopicLabel = (topicValue: string): string => {
  return getOptionLabel(topicOptions, topicValue);
};

export const getRegionLabel = (regionValue: string): string => {
  return getOptionLabel(regionOptions, regionValue);
};

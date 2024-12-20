import { useState } from 'react';

export const useForm = (initialState = {}) => {
  const [formState, setFormState] = useState(initialState);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  const handleMultipleSelectChange = (event) => {
    const { name, options } = event.target;
    const selectedValues = Array.from(options)
      .filter((option) => option.selected)
      .map((option) => option.value);

    setFormState({
      ...formState,
      [name]: selectedValues,
    });
  };

  const handleResetForm = () => {
    setFormState(initialState);
  };

  return {
    ...formState,
    formState,
    setFormState,
    handleInputChange,
    handleMultipleSelectChange,
    handleResetForm,
  };
};

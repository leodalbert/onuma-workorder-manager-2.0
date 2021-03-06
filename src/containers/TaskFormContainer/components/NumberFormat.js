import React from 'react';
import NumberFormat from 'react-number-format';

const Formater = (props) => {
  const { inputRef, onChange, ...other } = props;

  return (
    <NumberFormat
      {...other}
      style={{ padding: '10.5px 14px' }}
      getInputRef={inputRef}
      onValueChange={(values) => {
        onChange({
          target: {
            name: props.name,
            value: values.value,
          },
        });
      }}
      thousandSeparator
      inputMode='decimal'
      isNumericString
      decimalScale='2'
    />
  );
};

export default Formater;

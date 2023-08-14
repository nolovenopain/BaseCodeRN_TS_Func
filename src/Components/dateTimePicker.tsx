import React, {forwardRef, useImperativeHandle, useState} from 'react';
import DateTimePicker, {
  DateTimePickerProps,
} from 'react-native-modal-datetime-picker';
import {translate} from '../Language';
import {store} from '../Redux';

export interface DateTimePickerModalProps extends DateTimePickerProps {
  confirmDate(date: Date): void;
}

export const DateTimePickerModal = forwardRef(
  ({confirmDate, ...props}: DateTimePickerModalProps, ref) => {
    const [isDatePickerVisible, setIsDatePickerVisible] =
      useState<boolean>(false);

    useImperativeHandle(ref, () => ({
      showDatePicker: () => {
        setIsDatePickerVisible(true);
      },
    }));

    const hideDatePicker = () => {
      setIsDatePickerVisible(false);
    };

    const handleDateConfirm = (date: Date) => {
      setIsDatePickerVisible(false);
      confirmDate(date);
    };

    return (
      <DateTimePicker
        {...props}
        isVisible={isDatePickerVisible}
        onConfirm={handleDateConfirm}
        onCancel={hideDatePicker}
        confirmTextIOS={translate(
          'confirm',
          store.getState().globalReducer.language,
        )}
        cancelTextIOS={translate(
          'cancel',
          store.getState().globalReducer.language,
        )}
      />
    );
  },
);

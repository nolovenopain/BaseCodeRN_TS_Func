import React, {forwardRef, useImperativeHandle, useState} from 'react';
import DateTimePicker, {
  DateTimePickerProps,
} from 'react-native-modal-datetime-picker';

export interface DateTimePickerModalProps extends DateTimePickerProps {
  date?: Date;
  confirmDate(date: Date): void;
}

export const DateTimePickerModal = forwardRef(
  (
    {
      mode,
      date,
      confirmDate,
      maximumDate,
      minimumDate,
      locale,
    }: DateTimePickerModalProps,
    ref,
  ) => {
    const [isDatePickerVisible, setIsDatePickerVisible] = useState(false);

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
        isVisible={isDatePickerVisible}
        mode={mode}
        date={date}
        onConfirm={handleDateConfirm}
        onCancel={hideDatePicker}
        maximumDate={maximumDate}
        minimumDate={minimumDate}
        locale={locale}
        confirmTextIOS="Xác nhận"
        cancelTextIOS="Huỷ"
        // display="spinner"
      />
    );
  },
);

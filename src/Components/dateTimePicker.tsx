import React, {forwardRef, useImperativeHandle, useState} from 'react';
import DateTimePicker from 'react-native-modal-datetime-picker';

type DateTimePickerModalProps = {
  mode: 'date' | 'time' | 'datetime';
  date?: Date;
  confirmDate(date: Date): void;
  maximumDate?: Date;
  minimumDate?: Date;
  locale?: string;
};

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
        date={date ? date : new Date()}
        onConfirm={handleDateConfirm}
        onCancel={hideDatePicker}
        maximumDate={maximumDate}
        minimumDate={minimumDate}
        locale={locale}
        confirmTextIOS="Xác nhận"
        cancelTextIOS="Huỷ"
        display="spinner"
      />
    );
  },
);

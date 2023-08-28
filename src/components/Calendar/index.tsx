import React from 'react';
import { StyleProp, View, ViewStyle } from 'react-native';
import { Calendar as ExtCalendar } from 'react-native-calendars';
import { FONT_FAMILY, FONT_SIZE } from '../../common/Text/Text';
import { useTheme } from '../../hooks';

type Props = {
  style?: StyleProp<ViewStyle>;
  onDayPress: (day: Date) => void;
  markedDates: Date[];
};

const Calendar = ({ style, onDayPress, markedDates }: Props) => {
  const { theme } = useTheme();
  return (
    <View style={{ alignItems: 'center' }}>
      <ExtCalendar
        style={style}
        theme={{
          calendarBackground: 'transparent',
          arrowColor: theme.base.medium,
          monthTextColor: theme.base.medium,
          textMonthFontFamily: FONT_FAMILY.medium,
          textMonthFontSize: FONT_SIZE.CAPTION,
          dayTextColor: theme.base.medium,
          textDisabledColor: theme.base.low,
          todayTextColor: theme.brand,
          selectedDayTextColor: theme.base.primary,
          selectedDayBackgroundColor: theme.brand,
          textDayFontFamily: FONT_FAMILY.regular,
          textDayHeaderFontFamily: FONT_FAMILY.medium,
          textDayHeaderFontSize: FONT_SIZE.SMALL,
        }}
        onDayPress={(day) => {
          onDayPress(new Date(day.dateString));
        }}
        markedDates={markedDates?.reduce((acc, item) => {
          if (item) {
            const date = item.toISOString().split('T')[0];

            acc[date] = { selected: true };
          }
          return acc;
        }, {})}
      />
    </View>
  );
};

export default Calendar;

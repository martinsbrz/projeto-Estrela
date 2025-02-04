'use client';

import { Calendar } from "@heroui/react";
import { I18nProvider } from "@react-aria/i18n";
import { useState } from "react";
import {today, getLocalTimeZone} from "@internationalized/date";
import ButtonMedium from '@/app/components/ButtonMedium';

export default function PageCalendar() {
  let defaultDate = today(getLocalTimeZone());
  let [value, setValue] = useState(defaultDate);

  return (
    <div className="flex flex-col justify-center items-center gap-8">
      <I18nProvider locale="pt-BR">
        <Calendar
          showMonthAndYearPickers
          aria-label="Date (Show Month and Year Picker)"
          focusedValue={value}
          nextButtonProps={{
            variant: "bordered",
          }}
          prevButtonProps={{
            variant: "bordered",
          }}
          value={value}
          onChange={setValue}
          onFocusChange={setValue}
          classNames={{
            base:"",
            nextButton:"bg-white w-20 h-10",
            prevButton:"bg-white w-20 h-10",
            headerWrapper:"bg-lightbrown",
            header:"bg-lightbrown text-white border-none",
            title:"text-white text-[1.1rem] relative title",
            gridWrapper:"",
            grid:"",
            gridHeader:"bg-lightbrown",
            gridHeaderRow:"text-white",
            gridHeaderCell:"w-[30px] h-[30px]",
            gridBody:"",
            gridBodyRow:"",
            cell:"w-[30px] h-[40px]",
            cellButton:"w-[40px] h-[40px]",
            pickerWrapper:"",
            pickerMonthList:"",
            pickerYearList:"",
            pickerHighlight:"",
            pickerItem:""
          }}
        />
      </I18nProvider>
      <ButtonMedium onClick={undefined} id={'buscar-turma'} content={'Buscar'} color={'lightbrown'} />
    </div>
  )
}
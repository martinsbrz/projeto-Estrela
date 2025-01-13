'use client';

import { Calendar } from "@nextui-org/calendar";
import { useEffect, useState } from "react";
import { I18nProvider } from "@react-aria/i18n";
import axios from "axios";

export default function Calendario() {
  const url = "https://vps55503.publiccloud.com.br/api/users";
  // const url = "http://localhost:5000/api/users";
  const [data, setData] = useState([]);

  const getUsers = async () => {
    await axios.get(url)
      .then((res) => setData(res.data.users));
  };

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <main className="flex flex-col gap-8">
      <I18nProvider locale="pt-BR">
        <Calendar 
          aria-label="Date (Controlled) (Show Month and Year Picker)" 
          showMonthAndYearPickers
        />
      </I18nProvider>
      <div>
        <ul>
          <li>{data.length}</li>
          {data.map(usuario => {
            return (
              <li>{usuario["name"]}</li>
            )
          })}
        </ul>
      </div>
    </main>
  );
}
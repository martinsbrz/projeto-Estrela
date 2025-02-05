'use client'

import PageCalendar from "@/app/components/PageCalendar";
import ButtonMedium from '@/app/components/ButtonMedium';
import { useEffect, useState } from "react";
import {today, getLocalTimeZone} from "@internationalized/date";
import axios from 'axios';
import ListaAulas from "@/app/components/ListaAulas";

// const url = "https://vps55503.publiccloud.com.br/api/users";
let url = 'http://localhost:5000/api';

export default function Page() {
  let defaultDate = today(getLocalTimeZone());
  let [value, setValue] = useState(defaultDate);
  let [data, setData] = useState([]);
  let [aulas, setAulas] = useState([]);
  
  async function getUsers() {
    await axios(`${url}/users`)
      .then((res) => setData(res.data.users));
  }

  async function getAulas() {
    await axios(`${url}/turmas/data/${value}`)
      .then((res) => setAulas(res.data.dia))
  }
  
  useEffect(() => {
    getUsers();
  }, []);

  return (
    <article className="w-full h-full flex flex-col justify-center items-center md:flex-row">
      <div className="flex flex-col gap-4 justify-center items-center">
        <PageCalendar value={value} setValue={setValue} />
        <ButtonMedium onClick={getAulas} id={'buscar-turma'} content={'Buscar'} color={'lightbrown'} />
      </div>
      <div className="flex-1 flex flex-col items-center justify-center bg-lightgray h-full w-full m-[10px] md:m-[30px] rounded-[20px] relative">
        <div className="absolute top-0 m-3">
          <p className="font-bold text-[1.2rem]">
            {`${value.day}/${value.month}/${value.year}`}
          </p>
        </div>
        <ListaAulas aulas={aulas} />
      </div>
    </article>
  )
}
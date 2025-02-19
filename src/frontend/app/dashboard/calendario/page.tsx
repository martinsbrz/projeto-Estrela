'use client'

import PageCalendar from "@/app/components/PageCalendar";
import { Suspense, useState } from "react";
import {today, getLocalTimeZone, getDayOfWeek, } from "@internationalized/date";
// import axios from 'axios';
import { Button } from "@heroui/react";
import ListaAlunosChamada from "@/app/components/ListaAlunosChamada";
import ListaAulas from "@/app/components/ListaAulas";

// const url = "https://vps55503.publiccloud.com.br/api/users";
// let url = 'http://localhost:5000/api';

export default function Page() {
  let defaultDate = today(getLocalTimeZone());
  let [data, setData] = useState(defaultDate);
  let [aulasDoDia, setAulasDoDia] = useState([]);
  let [alunosDaChamada, setAlunosDaChamada] = useState();

  function getDiaDaSemana() {
    let dia = getDayOfWeek(data, 'pt-BR');
    switch(dia) {
      case 0: return 'Dom'
      case 1: return 'Seg'
      case 2: return 'Ter'
      case 3: return 'Qua'
      case 4: return 'Qui'
      case 5: return 'Sex'
      case 6: return 'Sáb'
    }
  }

  async function getAulas(getDiaDaSemana:Function, setAulas:Function) {
    let turmas = sessionStorage.getItem('dbTurmas');
    if (!turmas) {
      turmas = [];
      sessionStorage.setItem('dbTurmas', '[]');
    } else {
      let turmasFiltradas = JSON.parse(turmas).filter(turma => {
        return turma.dia === getDiaDaSemana();
      })
      setAulasDoDia(turmasFiltradas);
    }
  }

  let dataFormatada = `${data.day}/${data.month}/${data.year}`;

  return (
    <article className="w-full h-full flex flex-col justify-center items-center sm:flex-row md:flex-row">
      <div className="flex flex-col gap-4 justify-center items-center">
        <Suspense>
          <PageCalendar data={data} setData={setData} setAulasDoDia={setAulasDoDia} />
        </Suspense>
        <Button className="bg-lightbrown w-[10rem] rounded-full text-white font-bold text-[1.1rem]" onPress={() => getAulas(getDiaDaSemana, setAulasDoDia)}>Buscar</Button>
      </div>
      <div className="flex-1 flex flex-col items-center justify-center bg-lightgray h-full w-full m-[10px] md:m-[30px] rounded-[20px] relative overflow-scroll">
        <Suspense>
          <ListaAulas aulasDoDia={aulasDoDia} dataFormatada={dataFormatada} setAlunosDaChamada={setAlunosDaChamada} />
        </Suspense>
      </div>
      {
        alunosDaChamada &&
        <div className="absolute bg-white h-[30rem] w-[22rem] md:w-[30rem] flex flex-col justify-between p-10 items-center border rounded-xl">
          <h3>{dataFormatada}</h3>
          <ListaAlunosChamada alunosDaChamada={alunosDaChamada} setAlunosDaChamada={setAlunosDaChamada} data={data} />
          <Button className="font-bold" onPress={() => setAlunosDaChamada(undefined)}>Sair</Button>
        </div>
      }
    </article>
  )
}
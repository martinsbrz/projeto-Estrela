'use client'

import PageCalendar from "@/app/components/PageCalendar";
import { useState } from "react";
import {today, getLocalTimeZone, getDayOfWeek, } from "@internationalized/date";
import axios from 'axios';
import { Button } from "@heroui/react";
import ListaAlunosChamada from "@/app/components/ListaAlunosChamada";
import ListaAulas from "@/app/components/ListaAulas";

// const url = "https://vps55503.publiccloud.com.br/api/users";
let url = 'http://localhost:5000/api';

async function getAulas(getDiaDaSemana:Function, setAulas:Function) {
  await axios(`${url}/aulas/dia/${getDiaDaSemana()}`)
  .then((res) => setAulas(res.data.dia))
}

async function getAlunos(turma:Number, setAlunos:Function) {
  await axios(`${url}/alunos/${turma}`)
    .then((res) => setAlunos(res.data.alunos));
}

async function enviarPresenca(idTurma, idAluno, status, data, inicio) {
  await axios.post(`${url}/turmas/registroaula`, {
    idTurma: idTurma,
    idAluno: idAluno,
    status: status,
    data: data,
    inicio: inicio
  }, {
    headers: {
      'Content-Type': 'application/json'
    }
  })
}

export default function Page() {
  let defaultDate = today(getLocalTimeZone());
  let [data, setData] = useState(defaultDate);
  let [aulas, setAulas] = useState([]);
  let [alunos, setAlunos] = useState();

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

  let dataFormatada = `${data.day}/${data.month}/${data.year}`;

  return (
    <article className="w-full h-full flex flex-col justify-center items-center md:flex-row">
      <div className="flex flex-col gap-4 justify-center items-center">
        <PageCalendar data={data} setData={setData} setAulas={setAulas} />
        <Button className="bg-lightbrown w-[10rem] rounded-full text-white font-bold text-[1.1rem]" onPress={() => getAulas(getDiaDaSemana, setAulas)}>Buscar</Button>
      </div>
      <div className="flex-1 flex flex-col items-center justify-center bg-lightgray h-full w-full m-[10px] md:m-[30px] rounded-[20px] relative overflow-scroll">
        <ListaAulas aulas={aulas} dataFormatada={dataFormatada} getAlunos={getAlunos} setAlunos={setAlunos} />
      </div>
      {
        alunos &&
        <div className="absolute bg-white h-[30rem] w-[22rem] md:w-[30rem] flex flex-col justify-between p-10 items-center border rounded-xl">
          <h3>{dataFormatada}</h3>
          <ListaAlunosChamada alunos={alunos} data={data} enviarPresenca={enviarPresenca} />
          <Button onPress={() => setAlunos(undefined)}>Sair</Button>
        </div>
      }
    </article>
  )
}
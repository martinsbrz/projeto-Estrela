'use client'

import FormularioBuscaAlunos from '@/app/components/FormularioBuscaAlunos';
import ListaAlunos from '@/app/components/ListaAlunos';
import TitleLarge from '@/app/components/TitleLarge';
import TitleMedium from '@/app/components/TitleMedium';
import axios from 'axios';
import { useEffect, useState } from 'react';

let url = 'http://localhost:5000/api';

export default function Page() {
  let [turmas, setTurmas] = useState([]);
  let [idadeTurma, setIdadeTurma] = useState<any>();
  let [alunos, setAlunos] = useState([]);

  async function getTurmas() {
    await axios(`${url}/turmas`)
      .then((res) => setTurmas(res.data.turmas));
  }

  async function getTurmaPorIdade() {
    await axios(`${url}/turmas/${idadeTurma}`)
      .then((res) => setAlunos(res.data.turma));
  }

  async function handleChange(event) {
    setIdadeTurma(event.target.value);
  }

  useEffect(() => {
    getTurmas();
  }, []);

  return (
    <div className="flex flex-col h-full w-full justify-start items-center gap-5">
      <header className='relative'>
        <TitleLarge content={'Turmas'} />
      </header>
      <TitleMedium content={'Selecionar idade da turma'} />
      <FormularioBuscaAlunos turmas={turmas} handleChange={handleChange} acao={getTurmaPorIdade} />
      <ListaAlunos alunos={alunos} />
    </div>
  );
}
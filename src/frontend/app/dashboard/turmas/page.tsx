'use client'

import TitleLarge from '@/app/components/TitleLarge';
import TitleMedium from '@/app/components/TitleMedium';
import { Button, Form, Input, Select, SelectItem, Textarea } from '@heroui/react';
import { useEffect, useState } from 'react';
import { IoIosAddCircle, IoMdClose } from "react-icons/io";

export default function Page() {
  let [turmas, setTurmas] = useState([]);
  let [turma, setTurma] = useState('');
  let [telaAdicionar, setTelaAdicionar] = useState(false);
  let [diaDaSemana, setdiaDaSemana] = useState('');
  let [nomeTurma, setNomeTurma] = useState('');
  let [idadeTurma, setIdadeTurma] = useState('');
  let [observacao, setObservacao] = useState('');
  let [alunos, setAlunos] = useState([]);
  let [telaAlunos, setTelaAlunos] = useState(false);
  let [inicio, setInicio] = useState('');

  let diasDaSemana = [
    {valor: 'Seg', descricao: 'Segunda'},
    {valor: 'Ter', descricao: 'Terça'},
    {valor: 'Qua', descricao: 'Quarta'},
    {valor: 'Qui', descricao: 'Quinta'},
    {valor: 'Sex', descricao: 'Sexta'},
    {valor: 'Sáb', descricao: 'Sábado'},
    {valor: 'Dom', descricao: 'Domingo'}
  ]

  async function getTurmas() {
    let dbConteudo = sessionStorage.getItem('dbTurmas');
    if (!dbConteudo) {
      sessionStorage.setItem('dbTurmas', '[]');
      setTurmas([]);
    } else {
      setTurmas(JSON.parse(dbConteudo));
    }
  }

  async function mostrarAlunos(turma) {
    let dbConteudo = sessionStorage.getItem('dbAlunos');
    if (!dbConteudo) {
      sessionStorage.setItem('dbAlunos', '[]');
      setAlunos([]);
    } else {
      let alunos = JSON.parse(dbConteudo).filter(aluno => {
        return aluno.turma === turma;
      });
      setAlunos(alunos);
    }
    setTelaAlunos(true);
  }

  async function criarTurma() {
    let novaTurma = {
      turma: nomeTurma,
      idade: idadeTurma,
      inicio: inicio,
      dia: diaDaSemana['anchorKey'],
      observacao: observacao
    };
    turmas.push(novaTurma);
    sessionStorage.setItem('dbTurmas', JSON.stringify(turmas));
    setNomeTurma('');
    setIdadeTurma('');
    setObservacao('');
    setTelaAdicionar(false);
  }

  useEffect(() => {
    getTurmas();
  }, []);

  return (
    <div className="flex flex-col h-full w-full justify-start items-center gap-5 relative">
      <header className='relative'>
        <TitleLarge content={'Turmas'} />
      </header>
      <div className='flex flex-col  justify-around w-full h-full relative gap-4'>
        <div className='flex flex-col justify-start items-center w-full'>
          <div className='flex w-[80%] justify-between items-center'>
            <TitleMedium content={'Turma'} />
            <Form className='w-[70%]'>
              <Select onSelectionChange={setTurma} label='Turmas'>
                {turmas && turmas.map(turma => (
                  <SelectItem key={turma['turma']}>{`Turma: ${turma['turma']}`}</SelectItem>
                ))}
              </Select>
            </Form>
          </div>
        </div>
        <div className='flex flex-col justify-start items-center h-full'>
          <ul>
            {turmas.map(item => {
              if (item['turma'] === turma.anchorKey) {
                return (
                  <li className='flex gap-4 justify-center items-center'>
                    <p className='text-[1.05rem]'>
                    {`Turma: ${item['turma']} - Idade: ${item['idade']} - Dia: ${item['dia']}`}
                    </p>
                    <Button className='h-[2rem] bg-lightbrown text-white font-bold text-[1.05rem]' onPress={() => mostrarAlunos(item['turma'])}>Alunos</Button>
                  </li>
                )
              }
            })}
          </ul>
        </div>
        <Button isIconOnly color='transparent' className='absolute right-0 bottom-0 w-[60px] h-[60px] m-4' onPress={() => setTelaAdicionar(true)}>
          <IoIosAddCircle className='w-[60px] h-[60px] text-lightbrown'/>
        </Button>
      </div>
      {
        telaAdicionar &&
        <div className='bg-white sm:h-full md:h-[90%] w-[80%] absolute border z-10 bottom-10 sm:bottom-0 md:bottom-12 p-8 flex flex-col justify-center items-center gap-4'>
          <Form className='w-[90%] flex flex-col gap-6' onSubmit={criarTurma} validationBehavior='native'>
            <Input 
              className='h-[30px]'
              type='text'
              isRequired
              label='Nome da turma'
              name='turma'
              onValueChange={setNomeTurma}
            />
            <div className='flex justify-between w-full gap-5'>
              <Input
                className='h-[30px]'
                type='number'
                isRequired
                label='Idade da turma'
                name='idade'
                onValueChange={setIdadeTurma}
              />
              <Input 
                className='h-[30px]'
                type='text'
                isRequired
                label="Horário de início"
                name='inicio'
                onValueChange={setInicio}
              />
            </div>
            <Select isRequired label={'Dia'} onSelectionChange={setdiaDaSemana} className='h-[40px]'>
              {diasDaSemana.map(item => (
                <SelectItem key={item.valor}>{item.descricao}</SelectItem>
              ))}
            </Select>
            <Textarea 
              label='Observação'
              onValueChange={setObservacao}
              className='overflow-scroll h-[6rem]'
            />
            <Button type="submit" className='bg-lightbrown text-white font-bold text-[1.1rem]'>Salvar</Button>
          </Form>
          <Button isIconOnly className='rounded-full relative bottom-0 right-0 absolute bottom-0 md:bottom-reset md:top-0 md:right-0 m-5' onPress={() => setTelaAdicionar(false)}>
            <IoMdClose className='h-[80%] w-[80%]' />
          </Button>
        </div>
      }
      {
        telaAlunos &&
        <div className='bg-white w-[70%] h-[80%] absolute border rounded-xl z-10 bottom-12 p-4 flex flex-col items-center'>
          <TitleMedium content={'Alunos'} />
          <ul className='flex flex-col justify-center items-center w-[70%]'>
            {alunos &&
            alunos.map(aluno => {
              return (
                <li className='text-[1.1rem]'>
                  <p>{`${aluno.nome} ${aluno.sobrenome}`}</p>
                </li>
              )
            })}
          </ul>
          <Button isIconOnly className='rounded-full relative bottom-0 right-0 absolute bottom-0 m-5 md:bottom-reset md:top-0 md:right-0' onPress={() => setTelaAlunos(false)}>
            <IoMdClose className='h-[80%] w-[80%]' />
          </Button>
        </div>
      }
    </div>
  );
}
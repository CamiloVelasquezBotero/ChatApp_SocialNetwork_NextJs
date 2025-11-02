import Link from 'next/link'
import React from 'react'

export default function Login() {
  return (
    <div className='grid grid-cols-2 justify-center items-center mt-20'>
      <p className="font-black text-4xl text-center mt-2 hover:text-slate-700 transition-all m-20 text-shadow-lg">
        Recupera tu {""}
        <span className="text-indigo-800 hover:text-indigo-700">Cuenta</span> {""}
        para empezar a {""}
        <span className="text-indigo-800 hover:text-indigo-700">Chatear con tus friends</span>
      </p>

      <div className='bg-white rounded-lg shadow-md hover:shadow-xl transition-all p-10 mr-10'>
        <p className="font-black text-5xl text-center text-indigo-700 text-shadow-lg">Recupera Tu Cuenta</p>
        <form
          action=""
          className='flex flex-col items-center mt-10 gap-5'
        >
          <div className='flex gap-5 items-center w-full justify-center'>
            <label htmlFor="email" className='font-black text-4xl ml-22 text-shadow-lg'>Email</label>
            <input
              id='email'
              type="email"
              className='outline-none shadow-xl border border-slate-200 transition-all p-2 rounded-lg w-100'
              placeholder='Write your E-mail'
            />
          </div>

          <input
            type="submit"
            className='w-fit p-2 mt-5 bg-indigo-500 hover:bg-indigo-600 hover:shadow-md rounded-lg font-black text-2xl text-white transition-all cursor-pointer'
            value={'Confirmar'}
          />

          <div>
            <p className="text-lg text-center transition-all">
              ¿Ya tienes una cuenta?
              <Link href={'/'}><span className="text-indigo-800 hover:text-indigo-900 transition-all font-bold"> Inicia Sesión</span></Link>
            </p>
            <p className="text-lg text-center transition-all">
              ¿No tienes una cuenta?
              <Link href={'/sign-up'}><span className="text-indigo-800 hover:text-indigo-900 font-bold"> Crea una cuenta</span></Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  )
}

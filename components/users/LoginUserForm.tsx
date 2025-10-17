'use client'
import Link from "next/link";
import { loginUser } from "@/actions/loginUserAction";
import { userLoginSchema } from "@/src/schema-zod";
import { toast } from "react-toastify";
import { useStore } from "@/src/store";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function LoginUserForm({ children }: { children: React.ReactNode }) {
   const setToken = useStore((state) => state.setToken)
   const token = useStore((state) => state.token)
   const router = useRouter()

   useEffect(() => {
      const existsToken = localStorage.getItem('token')
      if(existsToken) {
         router.push('/dashboard')
         setToken(existsToken)
      }
   }, [token])

   const handleSubmit = async (formData: FormData) => {
      const data = {
         email: formData.get('email'),
         password: formData.get('password'),
      }
      // Validate in the client
      const result = userLoginSchema.safeParse(data)
      if (!result.success) {
         result.error.issues.forEach(issue => (
            toast.error(issue.message)
         ))
         return
      }

      // validate in the server
      const response = await loginUser(result.data)
      if (response?.errors) {
         response.errors.forEach(issue => {
            toast.error(issue.message)
         })
      }
      // get the user and log in
      if (response?.token) {
         localStorage.setItem('token', token)
         setToken(response.token)
         router.push('/dashboard')
      }
   }

   return (
      <>
         <div className='grid grid-cols-2 justify-center items-center mt-20'>
            <p className="font-black text-4xl text-center mt-2 hover:text-slate-700 transition-all m-20 text-shadow-lg">
               Log in or create an  {""}
               <span className="text-indigo-800 hover:text-indigo-700">Account</span> {""}
               to start to {""}
               <span className="text-indigo-800 hover:text-indigo-700">Chatting with your friends</span>
            </p>

            <div className='bg-white rounded-lg shadow-md hover:shadow-xl transition-all p-10 mr-10'>
               <p className="font-black text-5xl text-center text-indigo-700 text-shadow-lg">Log In</p>
               <form
                  action={handleSubmit}
                  className='flex flex-col items-center mt-10 gap-5'
               >

                  {children}

                  <div>
                     <p className="text-lg text-center transition-all">
                        ¿Don't have an account?
                        <Link href={'/sign-up'}><span className="text-indigo-800 hover:text-indigo-900 font-bold"> Create one</span></Link>
                     </p>
                     <p className="text-lg text-center transition-all">
                        ¿Do you forget your password?
                        <Link href={'/recover-password'}><span className="text-indigo-800 hover:text-indigo-900 transition-all font-bold"> Recupera tu cuenta</span></Link>
                     </p>
                  </div>
               </form>
            </div>
         </div>
      </>
   )
}

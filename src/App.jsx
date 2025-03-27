
import React from 'react'
import { useForm } from "react-hook-form";
import {z} from "zod"
import { zodResolver } from '@hookform/resolvers/zod';

const SignUp = z.object({
  email : z.string().email({message: "please add valid email"}),
  password:z.string().min(10 ,{message : "password should be minimum 10 characters"}),
  confirmPassword:z.string().min(10 ,{message : "confirm password should be match with password"})
}).superRefine(({password ,confirmPassword} , ctx)=>{
  if(password !== confirmPassword){
    ctx.addIssue({
      message : "confirm password should be match with password",
    });
  }
});

const post =() => new Promise((resolve , reject) =>{
  setTimeout(() =>{
    resolve();
  }, 500);
})


function App() {

    const {
            register,
            handleSubmit,
            reset,
            watch,
            formState: { errors ,isSubmitting},
          } = useForm({
            resolver:zodResolver(SignUp),
          }
          );

  const onsubmit = (data)=>{
    console.log("data=>" ,data)
   
    post(data).then(()=>{ 
      console.log("form submitted successfully")
      reset();
    })
    
  }

  return (
    <div>
      <form onSubmit={handleSubmit(onsubmit)}>
        <div className='flex flex-col gap-4'>
          <input type="email" {...register("email")} placeholder='Email' className='border rounded-md border-black p-2' />
          {errors ["email"] ? (
            <span>{errors["email"].message}</span>
          ) : null}
          <input type="password" {...register("password" )} placeholder='password' className='border rounded-md border-black p-2' />
          {errors ["password"] ? (
            <span> {errors["password"].message}</span>
          ) : null}
          <input type="password" {...register("confirmPassword" )} placeholder='confirm password' className='border rounded-md border-black p-2' />
          {errors ["confirmPassword"] ? (
            <span> {errors["confirmPassword"].message}</span>
          ) : null}
          <input type="submit" value={isSubmitting ? "submitting...." : "submit"} placeholder='confirm password' className='border rounded-md border-black p-2 bg-blue-600 font-bold' />
        </div>
      </form>
    </div>
  )
}

export default App







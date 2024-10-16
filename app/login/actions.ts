"use server"

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createClient } from '../config/supabase/server'

export async function login(formData: FormData) {
  const supabase = createClient()

  // type-casting here for convenience
  // in practice, you should validate your inputs
  const data = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  }

  const { error } = await supabase.auth.signInWithPassword(data)

  if (error) {
     console.error("Login error:", error.message);

    redirect('/error')
  }

  revalidatePath('/', 'layout')
  redirect('/pokedex')
}

export async function signup(formData: FormData) {

      console.log("i have reacher here")
  const supabase = createClient()

  const data = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
    username: formData.get('username') as string,
    avatar: formData.get('avatar') as string,
    favoritePokemon: formData.get('favoritePokemon') as string,
    favoriteType: formData.get('favoriteType') as string,
  }

  const { data: signUpData, error } = await supabase.auth.signUp({
    email: data.email,
    password: data.password,
  })

  if (error) {
     console.error("Login error:", error.message);
    redirect('/error')
  }


  if (signUpData.user) {
    const { error: profileError } = await supabase
      .from('Users')  
      .insert({
        id: signUpData.user.id,
        username: data.username,
        avatar: data.avatar,
        favoriteType: data.favoriteType,  
        favoritePokemon: data.favoritePokemon,
      })

    if (profileError) {
         console.error("Login error:", profileError.message);
      redirect('/error')
    }
  }

  revalidatePath('/', 'layout')
  redirect('/pokedex')
}
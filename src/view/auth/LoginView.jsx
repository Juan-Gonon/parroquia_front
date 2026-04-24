import { LoginForm } from '../../features/auth/LoginForm'
import { Mail, Lock, Eye, EyeOff, Cross, Heart } from 'lucide-react'

export const LoginView = () => {
  return (
    <>
      <div className='min-h-screen bg-primary flex flex-col lg:flex-row'>
        <div className='lg:w-1/2 flex-col justify-center items-center p-12 relative overflow-hidden hidden lg:flex'>
          {/* Decorative background */}
          <div className='absolute inset-0 bg-primary/20'></div>
          <div className='absolute top-20 left-20 w-32 h-32 bg-secondary/10 rounded-full blur-xl'></div>
          <div className='absolute bottom-32 right-16 w-24 h-24 bg-muted-foreground/10 rounded-full blur-lg'></div>

          {/* Main content */}
          <div className='relative z-10 text-center space-y-8'>
            {/* Church logo */}
            <div className='flex justify-center items-center space-x-3 mb-8'>
              <div className='relative'>
                <Cross className='h-16 w-16 text-secondary' />
                <Heart className='h-6 w-6 text-secondary/70 absolute -bottom-2 -right-2' />
              </div>
            </div>

            {/* Church name */}
            <div>
              <h1 className='text-5xl font-bold text-primary-foreground mb-4 text-balance'>
                Iglesia de Zunilito
              </h1>
              <p className='text-xl text-primary-foreground/70 text-pretty'>
                Bienvenido a nuestra comunidad de fe
              </p>
            </div>

            {/* Large spiritual quote */}
            <div className='max-w-lg mx-auto'>
              <blockquote className='text-2xl text-primary-foreground font-light italic leading-relaxed text-pretty'>
                "Vengan a mí todos los que están cansados y agobiados, y yo les
                daré descanso."
              </blockquote>
              <footer className='text-lg mt-4 text-secondary font-medium'>
                — Mateo 11:28
              </footer>
            </div>
          </div>
        </div>

        <div className='w-full lg:w-1/2 flex items-center justify-center p-8'>
          <div className='w-full max-w-md'>
            {/* Mobile header (only visible on small screens) */}
            <div className='lg:hidden text-center space-y-4 mb-8'>
              <div className='flex justify-center items-center space-x-2 mb-4'>
                <div className='relative'>
                  <Cross className='h-8 w-8 text-secondary' />
                  <Heart className='h-3 w-3 text-secondary/70 absolute -bottom-1 -right-1' />
                </div>
              </div>
              <div>
                <h1 className='text-3xl font-bold text-primary-foreground text-balance'>
                  Parroquia San José
                </h1>
                <p className='text-primary-foreground/70 text-pretty'>
                  Bienvenido a nuestra comunidad de fe
                </p>
              </div>
            </div>
            {/* Login Form */}
            <LoginForm />

            {/* Mobile quote (only visible on small screens) */}
            <div className='lg:hidden text-center mt-8'>
              <blockquote className='text-sm text-primary-foreground/70 italic text-pretty'>
                "Vengan a mí todos los que están cansados y agobiados, y yo les
                daré descanso."
                <footer className='text-xs mt-1 text-secondary font-medium'>
                  — Mateo 11:28
                </footer>
              </blockquote>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

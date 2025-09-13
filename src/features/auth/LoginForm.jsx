/* eslint-disable prettier/prettier */

import { Mail, Lock, Eye, EyeOff, Cross, Heart, User } from 'lucide-react'
import { Button } from '../../components/Button'
import { useFormLogin } from '../../hook/userFormLogin'

export function LoginForm() {
  const {
    errors,
    formData,
    isLoading,
    showPassword,
    handleInputChange,
    handleShowPassword,
    handleSubmit,
  } = useFormLogin()

  return (
    <div className='bg-card text-card-foreground rounded-2xl shadow-2xl border border-border'>
      <div className='space-y-2 text-center p-8 pb-6'>
        <h2 className='text-3xl font-bold'>Iniciar Sesión</h2>
        <p className='text-muted-foreground'>
          Accede a tu cuenta para participar en nuestra comunidad
        </p>
      </div>

      <div className='px-8 pb-8'>
        <form onSubmit={handleSubmit} className='space-y-6'>
          {/* General Error */}
          {errors.general && (
            <div className='bg-destructive/10 border border-destructive/20 text-destructive-foreground/70 px-4 py-3 rounded-lg'>
              <p className='text-sm'>{errors.general}</p>
            </div>
          )}

          {/* user Field */}
          <div className='space-y-2'>
            <label
              htmlFor='user'
              className='text-foreground/90 font-semibold text-sm block'>
              Usuario
            </label>
            <div className='relative'>
              <User className='absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground' />
              <input
                id='user'
                type='text'
                placeholder='Tu usuario'
                value={formData.user}
                onChange={(e) => handleInputChange('user', e.target.value)}
                className={`w-full pl-12 pr-4 py-3 border rounded-xl bg-input focus:outline-none focus:ring-2 focus:ring-ring focus:border-border transition-all ${
                  errors.user
                    ? 'border-destructive focus:ring-destructive focus:border-destructive'
                    : 'border-border'
                }`}
              />
            </div>
            {errors.user && (
              <p className='text-sm text-destructive'>{errors.user}</p>
            )}
          </div>

          {/* Password Field */}
          <div className='space-y-2'>
            <label
              htmlFor='password'
              className='text-foreground/90 font-semibold text-sm block'>
              Contraseña
            </label>
            <div className='relative'>
              <Lock className='absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground' />
              <input
                id='password'
                type={showPassword ? 'text' : 'password'}
                placeholder='Tu contraseña segura'
                value={formData.password}
                onChange={(e) => handleInputChange('password', e.target.value)}
                className={`w-full pl-12 pr-12 py-3 border rounded-xl bg-input focus:outline-none focus:ring-2 focus:ring-ring focus:border-border transition-all ${
                  errors.password
                    ? 'border-destructive focus:ring-destructive focus:border-destructive'
                    : 'border-border'
                }`}
              />
              <button
                type='button'
                onClick={handleShowPassword}
                className='absolute right-4 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-accent-foreground transition-colors'>
                {showPassword ? (
                  <EyeOff className='h-5 w-5' />
                ) : (
                  <Eye className='h-5 w-5' />
                )}
              </button>
            </div>
            {errors.password && (
              <p className='text-sm text-destructive'>{errors.password}</p>
            )}
          </div>

          {/* Forgot Password Link */}
          <div className='text-right'>
            <button
              type='button'
              className='text-secondary-foreground hover:text-accent-foreground transition-colors font-semibold'>
              ¿Olvidaste tu contraseña?
            </button>
          </div>

          {/* Submit Button */}
          <Button isLoading={isLoading} loadingMessage='Iniciando sesión...'>
            Iniciar Sesión
          </Button>
        </form>

        {/* Footer */}
        <div className='mt-8 text-center'>
          <p className='text-muted-foreground'>
            ¿No tienes cuenta?{' '}
            <button className='text-secondary-foreground hover:text-accent-foreground font-semibold transition-colors'>
              Contacta al administrador
            </button>
          </p>
        </div>
      </div>
    </div>
  )
}

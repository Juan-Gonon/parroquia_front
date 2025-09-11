/* eslint-disable prettier/prettier */

import { useState } from 'react'
import { Mail, Lock, Eye, EyeOff, Cross, Heart } from 'lucide-react'
import { Button } from '../../components/Button'

export function LoginForm() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })
  const [errors, setErrors] = useState({})
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  // Regex patterns for validation
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/

  const validateForm = () => {
    const newErrors = {}

    // Email validation
    if (!formData.email) {
      newErrors.email = 'El correo electrónico es requerido'
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Por favor ingresa un correo electrónico válido'
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = 'La contraseña es requerida'
    } else if (!passwordRegex.test(formData.password)) {
      newErrors.password =
        'La contraseña debe tener al menos 8 caracteres, incluir mayúsculas, minúsculas, números y símbolos'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }))
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!validateForm()) return

    setIsLoading(true)
    setErrors({})

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000))

      // Here you would typically make an API call to authenticate
      console.log('Login attempt:', formData)

      // For demo purposes, show success
      alert('¡Bienvenido a la comunidad!')
    } catch (error) {
      setErrors({
        general: `Error al iniciar sesión. Por favor intenta nuevamente. ${error}`,
      })
    } finally {
      setIsLoading(false)
    }
  }

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

          {/* Email Field */}
          <div className='space-y-2'>
            <label
              htmlFor='email'
              className='text-foreground/90 font-semibold text-sm block'>
              Correo Electrónico
            </label>
            <div className='relative'>
              <Mail className='absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground' />
              <input
                id='email'
                type='email'
                placeholder='tu.email@ejemplo.com'
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                className={`w-full pl-12 pr-4 py-3 border rounded-xl bg-input focus:outline-none focus:ring-2 focus:ring-ring focus:border-border transition-all ${
                  errors.email
                    ? 'border-destructive focus:ring-destructive focus:border-destructive'
                    : 'border-border'
                }`}
              />
            </div>
            {errors.email && (
              <p className='text-sm text-destructive'>{errors.email}</p>
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
                onClick={() => setShowPassword(!showPassword)}
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

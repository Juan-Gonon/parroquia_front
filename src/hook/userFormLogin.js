import { useState } from 'react'
import { useAuthStore } from './useAuthStore'
// import { regularExps } from '../conf/regularExps'

export function useFormLogin() {
  const [formData, setFormData] = useState({
    user: '',
    password: '',
  })

  const [errors, setErrors] = useState({})
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const { starLogin } = useAuthStore()

  const validateForm = () => {
    const newErrors = {}

    // Email validation
    if (!formData.user) {
      newErrors.user = 'El usuario es incorrecto'
    }

    // else if (!regularExps.email.test(formData.email)) {
    //   newErrors.email = 'Por favor ingresa un correo electrónico válido'
    // }

    // Password validation
    if (!formData.password) {
      newErrors.password = 'La contraseña es requerida'
    }
    // else if (!regularExps.passwordRegex.test(formData.password)) {
    //   newErrors.password =
    //     'La contraseña debe tener al menos 8 caracteres, incluir mayúsculas, minúsculas, números y símbolos'
    // }

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
      await starLogin({ user: formData.user, pass: formData.password })
    } catch (error) {
      setErrors(error)
    } finally {
      setTimeout(() => {
        setIsLoading(false)
      }, 300)
    }
  }

  const handleShowPassword = () => {
    setShowPassword(!showPassword)
  }

  return {
    formData,
    errors,
    showPassword,
    isLoading,
    validateForm,
    handleInputChange,
    handleSubmit,
    handleShowPassword,
  }
}

import { useState } from 'react'
import { regularExps } from '../conf/regularExps'

export function useFormLogin() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })

  const [errors, setErrors] = useState({})
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const validateForm = () => {
    const newErrors = {}

    // Email validation
    if (!formData.email) {
      newErrors.email = 'El correo electrónico es requerido'
    } else if (!regularExps.email.test(formData.email)) {
      newErrors.email = 'Por favor ingresa un correo electrónico válido'
    }

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

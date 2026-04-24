import { useState } from 'react'

export function useForm(initialValues = {}, validateFn) {
  const [formData, setFormData] = useState(initialValues)
  const [errors, setErrors] = useState({})

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }))
    }
  }

  const validate = () => {
    if (typeof validateFn === 'function') {
      const newErrors = validateFn(formData)
      setErrors(newErrors)
      return Object.keys(newErrors).length === 0
    }
    return true
  }

  // 🔹 Resetear form
  const resetForm = () => {
    setFormData(initialValues)
    setErrors({})
  }

  return {
    formData,
    setFormData,
    errors,
    handleChange,
    validate,
    resetForm,
  }
}

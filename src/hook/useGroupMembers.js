import { useState } from 'react'
import {
  createMemberGroupService,
  getMiembrosByGrupoService,
} from '../service/groupMemberService'

export const useGroupMembers = () => {
  const [members, setMembers] = useState([])

  const getByIdMembersGrupoS = async ({ id }) => {
    try {
      if (!id) throw new Error('Se requiere el id del grupo')

      const res = await getMiembrosByGrupoService({ id })

      setMembers(res?.data)
      return res
    } catch (error) {
      throw error || { message: 'Error al encontrar grupo' }
    }
  }

  const createMemberS = async ({ data }) => {
    const { fechaFin, ...restMembers } = data
    const newData = restMembers

    if (fechaFin?.length) newData.fechaFin = fechaFin
    try {
      const res = await createMemberGroupService({ data: newData })
      return res
    } catch (error) {
      throw error || { message: 'Error inesperado' }
    }
  }
  return {
    members,
    getByIdMembersGrupoS,
    createMemberS,
  }
}

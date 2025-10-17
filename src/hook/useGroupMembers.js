import { useState } from 'react'
import { getMiembrosByGrupoService } from '../service/groupMemberService'

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
  return {
    members,
    getByIdMembersGrupoS,
  }
}

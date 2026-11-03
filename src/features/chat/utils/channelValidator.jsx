    
export const validate = (list, data) => {
    const { cData: { name } } = data
    if (list.some(c => c.name === name)) {
        return 'Имя канала должно быть уникальным'
    }
    if (name === '') {
        return 'Имя канала не должно быть пустым'
    }
    return null
}

export const isRemovable = (channel) => {
    const {isRemovable } = channel
    return isRemovable ? null : 'Этот канал нельзя удалить'
}
    

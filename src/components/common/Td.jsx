import React from 'react'

const Td = ({ children, className = "" }) => {
    return (
        <td className={`py-2 px-2 border-b border-gray-300 ${className}`}>
            {children}
        </td>
    )
}

export default Td
import { Icon } from '@iconify/react'
import { Avatar, Box,  Stack, Typography } from '@mui/material'
import React from 'react'

const TableInfo = ({icon,title,subtitle}) => {
  return (
    <Box padding={1} margin={1} >
    <Stack direction="row" spacing={2}>
        <Box>
            {icon && <Icon icon={icon.name} height={48} />}
        </Box>
        <Box>
            <Typography variant='h6'>{title}</Typography>
            <Typography variant='caption'>{subtitle}</Typography>
        </Box>
    </Stack>
    </Box>
  )
}

export default TableInfo

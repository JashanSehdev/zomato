import SearchIcon from '@mui/icons-material/Search';
import { Avatar, Box, Typography } from '@mui/material';
import styles from './search.module.css'
import { useAppDispatch } from '@/app/hooks';
import { ChangeEvent, ChangeEventHandler } from 'react';
import { setSearch } from '@/features/search/search.slice';
export default function SearchBar () {
      const dispatch = useAppDispatch();
  const handleChange = (event : ChangeEvent<HTMLInputElement, HTMLInputElement>) => {
    const {value} = event.target;
    dispatch(setSearch(value))
  } 
    return (
        <Box className={styles.container}>
            <SearchIcon fontSize='large'/>
            <input
            className={styles.input}
                type='text'
                placeholder='What do you want to eat today?'
                onChange={handleChange}
            />
            
        </Box>
    )
}
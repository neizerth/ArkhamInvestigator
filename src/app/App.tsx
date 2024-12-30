import { useEffect } from 'react'
import './App.global.scss'
import { AppIcons } from './AppIcons/AppIcons'
import { AppRouter } from './AppRouter/AppRouter';
import { loadAppData } from '@/store/features/app/app';
import { useAppDispatch } from '@/hooks/useAppDispatch';

function App() {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(loadAppData());
  }, []);

  return (
    <>
      <AppIcons/>
      <AppRouter/>
    </>
  )
}

export default App

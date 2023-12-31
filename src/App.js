import { Route, Routes } from 'react-router-dom';
import styles from './App.module.css';
import SignUp from './Components/Pages/SignUp';
import SignIn from './Components/Pages/SignIn';
import { useSelector } from 'react-redux';
import SideMenu from './Components/UI/SideMenu';
import LogoHeader from './Components/UI/LogoHeader';
import Inbox from './Components/Pages/Inbox';
import Sent from './Components/Pages/Sent';
import Draft from './Components/Pages/Draft';
import Compose from './Components/Pages/Compose';
import EmailBody from './Components/Pages/EmailBody';
import EmailBodySent from './Components/Pages/EmailBodySent';

function App() {
  const isComposeOpen = useSelector(state => state.mail.isComposeOpen)
  const auth = useSelector(state => state.auth)

  const mail = useSelector(state => state.mail)

  return (<>
    <Routes>
      {!auth.isLogin && <Route path={'/sign-up'} element={<SignUp />} />}
      {!auth.isLogin && <Route path={'/'} element={<SignIn />} />}
    </Routes>
    {auth.isLogin && <div className={styles.container}>
      <LogoHeader />
      <div className={styles['container-body']}>
        <div className={styles['left-container']}>
          <SideMenu />
        </div>
        <div className={styles['right-container']}>
          <Routes>
            <Route path={'/'} element={<Inbox />} />
            <Route path={'/sent'} element={<Sent />} />
            <Route path={'/drafts'} element={<Draft />} />
            <Route path={'/emails/:id'} element={<EmailBody />} />
            <Route path={'/sent/:id'} element={<EmailBodySent />} />
          </Routes>
        </div>
      </div>
      {isComposeOpen && <Compose />}
    </div>}
  </>
  );
}

export default App;

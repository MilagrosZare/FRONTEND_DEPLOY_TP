import React from 'react'
import { Route, Routes } from 'react-router-dom'
import LoginScreen from './Screens/LoginScreen/LoginScreen'
import RegisterScreen from './Screens/RegisterScreen/RegisterScreen'
import RewritePasswordScreen from './Screens/RewritePassword/RewritePasswordScreen'
import ResetPasswordScreen from './Screens/ResetPassword/ResetPasswordScreen'
import WorkspacesList from './Screens/WorkspacesList/WorkspacesList'
import ChannelsList from './Screens/ChannelsList/ChannelsList'
import ProtectedRoute from './Components/ProtectedRoute'
import WorkspaceView from './Screens/WorkspaceView/WorkspaceView'


function App() {
  return (
    <div>
      <Routes>
        <Route path='/login' element={<LoginScreen />} />
        <Route path="/register" element={<RegisterScreen />} />
        <Route path='/' element={<LoginScreen />} />
        <Route element={<ProtectedRoute />}>
          <Route path='/reset-password' element={<ResetPasswordScreen/>} />
        </Route>
        <Route path='/rewrite-password' element={<RewritePasswordScreen />}
        />
        <Route path='/workspaces' element={<WorkspacesList/>} />
        <Route path='/workspaces/:userId' element={<WorkspaceView/>}/>
        <Route path='/channels/:workspace_id/:channel_id' element={<ChannelsList/>} />
      </Routes>
    </div>
  )
}

export default App

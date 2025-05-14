import { BrowserRouter, Routes, Route } from 'react-router-dom'
import DefaultLayout from "./pages/DefaultLayout.jsx";
import TaskListPage from './pages/TaskListPage.jsx';
import AddTaskPage from './pages/AddTaskPage.jsx'

function App() {

  return (
    <>

      <BrowserRouter>
        <Routes>

          <Route element={<DefaultLayout />}>
            <Route path="/" element={<TaskListPage />} />
            <Route path="/AddTask" element={<AddTaskPage />} />

          </Route>

        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App

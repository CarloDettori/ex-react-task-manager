import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { GlobalProvider } from './context/GlobalContext.jsx';
import { useState, useEffect } from 'react';
import DefaultLayout from "./pages/DefaultLayout.jsx";
import TaskListPage from './pages/TaskListPage.jsx';
import AddTaskPage from './pages/AddTaskPage.jsx'
import TaskDetailPage from './pages/TaskDetailPage.jsx';

function App() {





  return (
    <>
      <GlobalProvider>
        <BrowserRouter>
          <Routes>

            <Route element={<DefaultLayout />}>
              <Route path="/" element={<TaskListPage />} />
              <Route path="/AddTask" element={<AddTaskPage />} />
              <Route path="/:id" element={<TaskDetailPage />} />

            </Route>

          </Routes>
        </BrowserRouter>
      </GlobalProvider>
    </>
  )
}

export default App

import React from 'react';
import Home from './page/Home.jsx';
import TaskList from './component/TaskList'
// import ParentComponent from './component/ParentComponent.jsx';
import Footer from "./component/Footer.jsx"
const App = () => {
  

  return (
    <div className="App">
      <Home/>
      <TaskList/>
      <Footer/>
    </div>
  );
};

export default App;

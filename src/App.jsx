import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Route, Routes, Outlet, useParams, Link } from "react-router-dom";
import Create from './routes/Create';
import Delete from './routes/Delete';
import Forms from './components/Forms';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://orsdgqfqbphouqsnsymn.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9yc2RncWZxYnBob3Vxc25zeW1uIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTY5ODU2Mjg1NSwiZXhwIjoyMDE0MTM4ODU1fQ.4TbD26Pc2o64D4DcrPt6vhXk_oHwRtnvEBnf-sMU-Gc';

const supabase = createClient(supabaseUrl, supabaseKey)



function App() {
  let params = useParams();

  const Cr = () => {
    return (
      <Create />
    )
  }


  const De = () => {
    params = useParams();
    return (
      <Delete  id ={params.id2} />
    )

  }

  const Home = () => {

    const [crewData, setCrewData] = useState([]);
    
    useEffect(() => {
    const readAllData = async () => {
      const { data, error } = await supabase.from("AmongUs").select('*');
      console.log('data: ', data);
      for (let i = 0; i < data.length; i++) {
        console.log(`Name: ${data[i].name}, Speed: ${data[i].speed}`);
      }
      setCrewData(data);
    }
      readAllData(); 
    }, []);
    return (
    <div>
    <div className="Top">
    <header className="p-3 text-bg-dark">
<div className="container">
  <div className="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
    <a href="/" className="d-flex align-items-center mb-2 mb-lg-0 text-white text-decoration-none">
      <svg className="bi me-2" width="40" height="32" role="img" aria-label="Bootstrap"><use xlink:href="#bootstrap"></use></svg>
    </a>

    <ul className="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0">
      <li><Link to="/" className="nav-link px-6 text-white">AskMe!</Link></li>
    </ul>

    <form className="col-12 col-lg-auto mb-3 mb-lg-0 me-lg-3" role="search">
      <input type="search" className="form-control form-control-dark text-bg-white" placeholder="Search..." aria-label="Search" spellcheck="false" data-ms-editor="true"></input>
    </form>

    <div className="text-end">
      <button type="button" className="btn btn-outline-light me-2"><Link to="/" className="btn btn-outline-light me-3">Home</Link></button>
      <button type="button" className="btn btn-warning" ><Link to="/Create" className="btn btn-warning" >Create New Post</Link></button>
    </div>
  </div>
</div>
</header>
    </div>

    <div className="container col">
      <div className='sp'>Order by:  </div>
      <div className="btn-group" role="group" aria-label="Basic example">
        <button type="button" className="btn btn-secondary">Alphabet</button>
        <button type="button" className="btn btn-secondary">Vote</button>
    </div>
    </div>

    {/* <div className="container col box"> */}
    
       {crewData.map((crewMate, index) => (
        <Forms key={index} id={crewMate.id} name={crewMate.name} speed={crewMate.speed} />
      ))}
      
    {/* </div> */}

    
  </div>
    )

  }

  const CrewMates = () => {
   
    const [crewData, setCrewData] = useState([]);
    
    useEffect(() => {
    const readAllData = async () => {
      const { data, error } = await supabase.from("AmongUs").select('*');
      console.log('data: ', data);
      for (let i = 0; i < data.length; i++) {
        console.log(`Name: ${data[i].name}, Speed: ${data[i].speed}`);
      }
      setCrewData(data);
    }
      readAllData(); 
    }, []);

    return (
      <div className='fl'>
        <div className='dis '>
              <h2><Link className="dis" to="/">🏠 Home</Link></h2>
              <h><Link className="dis" to="/create">Create a Crewmate!</Link> </h>
              <h2><Link className="dis" to="/CrewMates">List Crewmates  🖼️</Link> </h2>
              <img src="../peeking.png" className='last' alt='crewmate peeking' />
          </div>
      <div>
       {crewData.map((crewMate, index) => (
        <Forms key={index} id={crewMate.id} name={crewMate.name} speed={crewMate.speed} />
      ))}
      </div>
      </div>
      
    )

  }

  const NoMatch = () => ( <h1>No Match</h1>)
  return (
    <>
     <BrowserRouter>
     <Routes>
     <Route path="/" caseSensitive={true} element={<Home />}/>
     <Route path="/create" element={<Cr />}/>
     <Route path="/delete" element={<De />}/>
        <Route path="/delete/:id2" Component={De}>
        </Route>
      <Route path="*" element={<NoMatch />} />
     </Routes>

     </BrowserRouter>
    </>
  )
}

export default App

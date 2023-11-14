import { useState } from 'react'
import { Link } from "react-router-dom";
import { createClient } from '@supabase/supabase-js';
import '../App.css'







function Create() {
  const supabaseUrl = 'https://orsdgqfqbphouqsnsymn.supabase.co'
  const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9yc2RncWZxYnBob3Vxc25zeW1uIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTY5ODU2Mjg1NSwiZXhwIjoyMDE0MTM4ODU1fQ.4TbD26Pc2o64D4DcrPt6vhXk_oHwRtnvEBnf-sMU-Gc';
  
  const supabase = createClient(supabaseUrl, supabaseKey)

  const [crewmate, setCrewmate] = useState({ name: "", speed : 0 })

  const handleChange = (event) => {
    const {name, value} = event.target;
    console.log("Name: ", name, " value: ", value);
    setCrewmate( (prev) => {
        return {
            ...prev,
            [name]:value,
        }
    })
}

  const createCrewmate = async () => {
    
    console.log("CrewMate: ", crewmate);
    console.log('Name: ', crewmate.name, " Speed: ", crewmate.speed);
    const { data, error } = await supabase.from("AmongUs").insert([{ name: crewmate.name, speed: crewmate.speed }]);
    console.log('data: ', data);
    console.log('error: ', error);
    alert('Post Created!')
  }


  
  return (
    <div className='fl'>
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
        <div className='Side mid'>
          <h1>Create a New Post</h1>
          
          
          <div className='card'>
          <div className='cards'>
          <h2></h2><textarea className="mid1" type="text" name="name" placeholder='Title' onChange={handleChange}  />
          </div>
          <br></br>
          <div className='cards'>
          <h2></h2><textarea className="mids"   type="numbers" name="speed" placeholder='Content'onChange={handleChange}/>
          </div>
          <br></br>
          <button className="hover1" onClick={createCrewmate} >Create Post</button>
          </div>
        </div>
  </div>
  );
}

export default Create;
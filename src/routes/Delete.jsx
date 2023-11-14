import { useEffect, useState } from 'react'
import React from "react";
import {Link } from "react-router-dom";
import { createClient } from '@supabase/supabase-js';
import crewMates from '../App.jsx';
import Forms from '../components/Forms';






function Delete(props) {

  const id = props.id;

  console.log('id: ', id);

  const supabaseUrl = 'https://orsdgqfqbphouqsnsymn.supabase.co'
  const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9yc2RncWZxYnBob3Vxc25zeW1uIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTY5ODU2Mjg1NSwiZXhwIjoyMDE0MTM4ODU1fQ.4TbD26Pc2o64D4DcrPt6vhXk_oHwRtnvEBnf-sMU-Gc';
  
  const supabase = createClient(supabaseUrl, supabaseKey)

  const [crewMates, setCrewmates] = useState({ id: ""})

  const handleChange = (event) => {
    const {name, value} = event.target;
    setCrewmates( (prev) => {
        return {
            ...prev,
            [name]:value,
        }
    })
}

  const deleteCrewMate = async () => {
    console.log('id: ', id);
    const { data, error } = await supabase.from("AmongUs").delete().eq("id", id);
    console.log('data: ', data);
    console.log('error: ', error);
    alert('Crewmate Deleted!');

  }

  useEffect(() => {
    deleteCrewMate();
  }, []);
  
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
              <h2><Link className="dis" to="/Crewmates">Crewmate Gallery 🖼️</Link> </h2>
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

export default Delete;
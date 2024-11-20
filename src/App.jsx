import { useCallback, useEffect, useRef, useState } from 'react'
import './App.css'

function App() {
  const [length, setLength] = useState(8);
  const [password, setPassword] = useState('');
  const [numAllowed, setNumAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);

  const passRef = useRef(null);

  const generatePassword = useCallback(()=>{
    let pass ='';
    let str = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';

    if(numAllowed) str += '0123456789';

    if(charAllowed) str += '!@#$%^&*-+/';

    for(let i=0; i< length; i++){
      pass += str.charAt(Math.floor(Math.random() * str.length));
    }

    setPassword(pass);
  }, [length, numAllowed, charAllowed]);

  useEffect(()=>{
    generatePassword();
  },[length, numAllowed, charAllowed]);


  const copyPassword = ()=>{
    window.navigator.clipboard.writeText(password);
    passRef.current?.select();
  }

  return (
    <div className='w-full bg-gray-800 max-w-md mx-auto shadow-md px-4 py-1 rounded-lg text-orange-500'>
      <h1 className='text-white text-center'>Password Generator</h1>
      <div className='flex shadow rounded-lg mt-5 px-4'>
        <input 
          type="text"
          value={password}
          className='w-full text-xl ouline-none'
          readOnly
          ref={passRef}
       />
       <button
       onClick={copyPassword}
        className='bg-blue-800 text-white px-2'
       >copy</button>
      </div>
      <div className='flex justify-center items-center gap-x-3 pt-4 pb-3'>
        <input 
        type="range" 
        value={length}
        min={6}
        max={50}
        className='cursor-pointer'
        onChange={(e)=> setLength(e.target.value)}
        name="" 
        id="range" />
        <label htmlFor="range">Length: { length }</label>
        <div>
          <input 
          type="checkbox" 
          defaultChecked={numAllowed}
          onChange={()=>{
            setNumAllowed((prev)=> !prev);
          }}
          name="" 
          id="numbers" />
          <label htmlFor="numbers"> Numbers</label>
        </div>
        <div>
          <input 
          type="checkbox" 
          defaultChecked={charAllowed}
          onChange={()=>{
            setCharAllowed((prev)=> !prev);
          }}
          name="" 
          id="characters" />
          <label htmlFor="characters"> Characters</label>
        </div>
      </div>
    </div>
  )
}

export default App

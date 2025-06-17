
import { useState } from 'react';
import ReactLifecycle from './components/react-lifecyle';
import Vanilla from './components/vanilla';

import './App.css'

const exampleTabs = ['react', 'vanilla'] as const;

function App() {
  const [tabs, setTabs] = useState<typeof exampleTabs[number]>('vanilla');
  
  return (
      <div>
        {exampleTabs.map(tab => (
          <button 
            key={tab} 
            onClick={() => setTabs(tab)} 
            style={{ 
              margin: '0 10px', 
              padding: '5px 10px', 
              border: '1px solid #ccc', 
              borderRadius: '5px', 
              cursor: 'pointer', 
              backgroundColor: tabs === tab ? '#ccc' : 'transparent', 
              color: tabs === tab ? '#fff' : '#000', 
              fontWeight: tabs === tab ? 'bold' : 'normal', 
              transition: 'all 0.2s ease-in-out' 
            }}>
            {tab}
          </button>
        ))}
        {tabs === 'react' ? (
          <div>
            <h1>{tabs}</h1>
            <ReactLifecycle />
          </div>
        ) : (
          <div>
            <h1>{tabs}</h1>
            <Vanilla />
          </div>
        )}
        
      </div>
  )
}

export default App

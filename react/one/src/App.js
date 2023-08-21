import React from 'react';
import Child1 from './child1';
import Child2 from './child2';
import AppState from './context/AppState';

function App() {
  return (
    <AppState>
      <h1>Parent Component</h1>
      <Child1/>
      <Child2/>
    </AppState>
  );
}

export default App;

import { useState, useEffect } from "react";

function App(){
  const [data, setData] = useState(null);
  useEffect(() => {
    async function load() {
      try {
        const response = await fetch("http://127.0.0.1:8000/health/");
        const post = await response.json();
        setData(post);

      }
      catch(err){
        console.log("There has been an error")
      }
    };
    load();
  }, []);
  
  if (!data) return <div>Loading...</div>;
  return <pre>{JSON.stringify(data, null, 2)}</pre>;
}

export default App;
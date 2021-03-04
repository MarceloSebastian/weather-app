import { useState, useEffect } from 'react';
import Error from './components/Error';
import Form from "./components/Form";
import Header from "./components/Header";
import Weather from './components/Weather';

function App() {

  const [ search, setSearch ] = useState({
    city: '',
    country: ''
  })

  const [ consult, setConsult ] = useState(false);
  const [ result, setResult ] = useState({});
  const [ error, setError ] = useState(false);

  const { city, country } = search;

  useEffect(() => {
    const hitAPI = async () => {
      if (consult) {
        const appId = 'df107def316489744a41fb0632acddb2';
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${appId}`;

        const response = await fetch(url);
        const result = await response.json();

        setResult(result);
        setConsult(false);

        if (result.cod === '404') {
          setError(true);
        } else {
          setError(false);
        }
      }
    }

    hitAPI()
  }, [consult, city, country]);

  let component;

  if ( error ) {
    component = <Error message="There's no Results" />
  } else {
    component = <Weather result={result} />
  }


  return (
    <>
      <Header title={'React Weather App'} />

      <div className="contenedor-form">
        <div className="container">
          <div className="row">
            <div className="col m6 s12">
              <Form 
                search={search}
                setSearch={setSearch}
                setConsult={setConsult}
              />
            </div>
            <div className="col m6 s12">
              { component }
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;

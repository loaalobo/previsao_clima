import './App.css';
import { useState } from 'react'

function App() {
  const [city, setCity] = useState("");
  const [weatherForecast, setWeatherForecast] = useState(null)

  const handleChange = (event) => {
    setCity(event.target.value)
  }

  const handleSearch = () => {
    fetch(`https://api.weatherapi.com/v1/current.json?key=c842534d1a99451db47184851222906&q=${city}&lang=pt`) //fetch corresponde ao axios, mas é nativo do JS | endereço da api + ? + Parâmetros: chave & cidade & língua
    .then((response) => {
      if(response.status === 200) {
        return response.json()
      }
    })
    .then((data) => {
      setWeatherForecast(data)
    });
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1 className='pt-4 pb-4'>Como está o clima?</h1>
      </header>

      <main className='container'>
        <div className='jumbotron'>     
            <p className='lead'>Para verificar o clima da sua cidade em tempo real, digite o nome dela e clique em pesquisar!</p>
            <div className='pb-4'>
              <input onChange={handleChange} className='form-control input-city' value={city}/>
            </div>
            <button className='btn btn-primary btn-lg' onClick={handleSearch}>Pesquisar</button>

            { weatherForecast ? (
                <div>
                  <div className='pt-2'>
                    <div>
                      <img src={weatherForecast.current.condition.icon}></img>
                    </div>
                    <div>
                      <p>{weatherForecast.location.name} - {weatherForecast.location.region}, {weatherForecast.location.localtime.substring(8,10)}/{weatherForecast.location.localtime.substring(5,7)}/{weatherForecast.location.localtime.substring(0,4)}, às {weatherForecast.location.localtime.substring(11,16)}</p>
                      <p>Tempo: {weatherForecast.current.condition.text} | Temperatura: {weatherForecast.current.temp_c}° C | Sensação térmica: {weatherForecast.current.feelslike_c}° C | Umidade relativa: {weatherForecast.current.humidity}%</p>
                    </div>
                  </div>
                </div>
              ) : null }
        </div>
      </main>
      <footer>
        <p><small>Desenvolvido por <a href="https://github.com/loaalobo" target="_blank" title='clique aqui para acessar meu github'>Lorena Lobo</a>.</small></p>
      </footer>
    </div>
  );
}

export default App;
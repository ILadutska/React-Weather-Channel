import logo from './logo.png';
import kramer from './kramer-worship.gif'
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <div className="image-container">
          <img src={logo} className="cw-logo" alt="logo" />
          <img src={logo} className="fast-ccw-logo" alt="logo" />
          <img src={logo} className="fast-cw-logo" alt="logo" />
          <img src={logo} className="ccw-logo" alt="logo" />
        </div>
        <p>
          Cool Stuff
        </p>
        <a
          className="App-link"
          href="https://www.weather.gov/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <img src={kramer} className="App-kramer" alt="kramer" />
      </header>
    </div>
  );
}

export default App;

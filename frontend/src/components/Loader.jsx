import "./Loader.css";

function Loader() {
  return (
    <div className="loader-overlay">
      <div className="circle-loader">
        <span></span><span></span><span></span><span></span>
        <span></span><span></span><span></span><span></span>
        <span></span><span></span><span></span><span></span>
      </div>
      <p className="loading-text">LOADING...</p>
    </div>
  );
}

export default Loader;
// import "./App.css";

// const navigate = (url) => {
//   window.location.href = url;
// };

// async function auth() {
//   const response = await fetch("http://127.0.0.1:3000/request", {
//     method: "post",
//   });
//   const data = await response.json();
//   navigate(data.url);
// }
// function App() {
//   return (
//     <>
//       <h1>Welcome to my site</h1>
//       <h3>Google OAuth</h3>
//       <button type="button" onClick={() => auth()}>
//         Google
//       </button>
//     </>
//   );
// }

// export default App;

import "./App.css";

const navigate = (url) => {
  window.location.href = url;
};

async function auth() {
  try {
    const response = await fetch("http://127.0.0.1:3000/request", {
      method: "POST",
    });
    const data = await response.json();
    if (data.url) {
      navigate(data.url);
    } else {
      console.error("Failed to get OAuth URL");
    }
  } catch (error) {
    console.error("Error during authentication:", error.message);
  }
}

function App() {
  return (
    <div className="App">
      <h1>Welcome to my site</h1>
      <h3>Google OAuth</h3>
      <button type="button" onClick={auth}>
        Sign in with Google
      </button>
      <img
        src="https://lh3.googleusercontent.com/a/ACg8ocIkiHlV84Vl-ay-I8FoCHMXyTx80y9dWOYDLeZnPYFllVjciOQ=s96-c"
        alt=""
      />
    </div>
  );
}

export default App;

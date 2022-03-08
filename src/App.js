import React, {Component} from 'react';
import FaceRecognition from './components/FaceRecognition/FaceRecognition'
import SignIn from './components/Signin/Signin';
import Navigation from './components/Navigation/Navigation';
import Particles from 'react-tsparticles';
import Logo from './components/Logo/Logo';
import Register from './components/Register/Register'
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Rank from './components/Rank/Rank';
import './App.css';

const particlesOptions = {

    fpsLimit: 25,
    interactivity: {
      events: {
        onClick: {
          enable: true,
          mode: "push",
        },
        onHover: {
          enable: true,
          mode: "repulse",
        },
        resize: true,
      },
      modes: {
        bubble: {
          distance: 400,
          duration: 2,
          opacity: 0.8,
          size: 40,
        },
        push: {
          quantity: 4,
        },
        repulse: {
          distance: 200,
          duration: 0.4,
        },
      },
    },
    particles: {
      color: {
        value: "#ffffff",
      },
      links: {
        color: "#ffffff",
        distance: 150,
        enable: true,
        opacity: 0.5,
        width: 1,
      },
      collisions: {
        enable: true,
      },
      move: {
        direction: "none",
        enable: true,
        outMode: "bounce",
        random: false,
        speed: 2.5,
        straight: false,
      },
      number: {
        density: {
          enable: true,
          area: 800,
        },
        value: 130,
      },
      opacity: {
        value: 0.5,
      },
      shape: {
        type: "circle",
      },
      size: {
        random: true,
        value: 5,
      },
    },
    detectRetina: true,

}

const initialState = {
    input: '',
    imageUrl: '',
    box: {},
    isSignedIn: false,
    user: {
          id: '',
          name: '',
          email: '',
          password: '',
          entries: 0,
          joined: ''
    }
}

class App extends Component {
  
  constructor() {
    super();
    this.state = {
      input: '',
      imageUrl: '',
      box: {},
      isSignedIn: false,
      user: {
          id: '',
          name: '',
          email: '',
          password: '',
          entries: 0,
          joined: ''
      },
      route: 'signin'
    }
  }
  
  

  componentDidMount() {
    fetch("http://localhost:3001")
      .then(response => response.json())
      .then(console.log)
  }

  loadUser =  (data) => {
    this.setState({user: {
      id: data.id,
      name: data.name,
      email: data.email,
      entries: data.entries,
      joined: data.jonied
  }})
  }

  onInputChange = (event) => {

    this.setState({input: event.target.value})
 //   console.log(this.state.input)
  }
  
  calculateFaceLocation = (data) => {
    const clarifaiFace = data.regions[0].region_info.bounding_box;

  //  console.log(clarifaiFace)

    const image = document.getElementById('inputimage');
    const width = Number(image.width);
    const height = Number(image.height);

   // console.log(width, height)

    return {
        leftCol: clarifaiFace.left_col * width,
        topRow: clarifaiFace.top_row * height,
        rightCol: width - (clarifaiFace.right_col * width),
        bottomRow: height - (clarifaiFace.right_col * height)
    }

  }


/*  https://img.grouponcdn.com/deal/j57dEv5HEmhj1nMY11Uf/no-2048x1229/v1/t600x362.jpg */
  
  displayFaceBox = (box) => {
//    console.log(box)
    this.setState({box: box});
  }

  onButtonSubmit = () => {
  //  console.log('Yeaaah');

  
  const USER_ID = "bb4ogee5rwfm";

const APP_ID = "brain";

const MODEL_ID = "f76196b43bbd45c99b4f3cd8e8b40a8a"
// "45fb9a671625463fa646c3523a3087d5"

const PERSONAL_TOKEN = "9f3bdf8b7fef476c9e8fdbd18eb33025";

const raw = JSON.stringify({
    "user_app_id": {
      "user_id": `${USER_ID}`,
      "app_id": `${APP_ID}`
    },
    "inputs": [
      {
        "data": {
          "image": {
            "url": this.state.input
          }
        }
      }
    ]
  });
  
  

  const requestOptions = {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Authorization': `Key ${PERSONAL_TOKEN}`
    },
    body: raw
  };  

  fetch(`https://api.clarifai.com/v2/models/${MODEL_ID}/outputs`, requestOptions)
  .then(response => response.text()
  )
  .then(result => {
    if (result) {
      this.displayFaceBox(this.calculateFaceLocation(JSON.parse(result, null, 2).outputs[0].data));
      fetch('http://localhost:3001/image', {
        method: 'put',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            id: this.state.user.id
        }
        )
        
        
      })
        .then (resp => resp.json())
        .then (count => {
          this.setState(Object.assign(this.state.user, {entries: count}))
        })
        .catch(error => console.log(error));
    }
   }
   )

  .catch(console.log);



  // const MODEL_VERSION_ID = "621d74074a5443d7ad9dc1503fba9ff0";

  this.setState({imageUrl: this.state.input})






  /*
  const requestOptions = {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Authorization': `Key ${PERSONAL_TOKEN}`
    }
  };
  
  fetch(`https://api.clarifai.com/v2/users/me/apps/${APP_ID}/models`, requestOptions)
    .then(response => response.text())
    .then(result => console.log(result))
    .catch(error => console.log('error', error));

    */

/*

  //  INFO

    const requestOptions = {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Authorization': `Key ${PERSONAL_TOKEN}`
    }
  };
  
  fetch(`https://api.clarifai.com/v2/users/me/apps/${APP_ID}/models/${MODEL_ID}/output_info`, requestOptions)
    .then(response => response.text())
    .then(result => console.log(JSON.parse(result)))
    .catch(error => console.log('error', error))

*/

  



// console.log(JSON.parse(result).outputs[0].data.regions[0].region_info.bounding_box)  

  // "45fb9a671625463fa646c3523a3087d5"// "45fb9a671625463fa646c3523a3087d5"// "45fb9a671625463fa646c3523a3087d5"

 

  }


  onRouteChange = (route) => {

    if (route === 'signin') {

      this.setState(initialState)

    } else if (route === 'home') {

      this.setState({isSignedIn: true})
    
    }


    this.setState({route: route})


  }


  
  /*  
      https://img.grouponcdn.com/deal/j57dEv5HEmhj1nMY11Uf/no-2048x1229/v1/t600x362.jpg
  
    Add sessions

    Add cookies

    Add profile

      */

  render () {

    const userName = this.state.user.name;
    const userEntries =  this.state.user.entries;

    return (
    <div className="App">
      <Particles
        id="tsparticles"
        options={particlesOptions}
        className = "particles"
        />

      <Navigation onRouteChange = {this.onRouteChange} isSignedIn = {this.state.isSignedIn} />
      { this.state.route === 'home'
          ? <div>
          <Logo />
          <Rank userName = { userName }  userEntries = { userEntries } />
          <ImageLinkForm onInputChange = {this.onInputChange} onButtonSubmit = {this.onButtonSubmit} />
          <FaceRecognition imageUrl = {this.state.imageUrl} box = {this.state.box} />
      </div>
         : (
           this.state.route === 'signin'
           
           ? <SignIn onRouteChange={this.onRouteChange} loadUser = { this.loadUser } />
           : <Register onRouteChange={this.onRouteChange} loadUser = { this.loadUser } />
         )
      }
      </div>
  );
  }
}

export default App;



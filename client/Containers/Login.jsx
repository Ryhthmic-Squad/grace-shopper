import React, { Component } from 'react';

class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }
  onChange({ target: { name, value } }) {
    this.setState({ [name]: value });
  }
  onSubmit(event) {
    event.preventDefault();
    const { email, password } = this.state;
    this.props.signIn({
      email,
      password,
    });
  }

  render() {
    const { onChange, onSubmit } = this;
    const { email, password } = this.state;
    return (
      <form onSubmit={onSubmit}>
        <label>email:</label>
        <input value={email} onChange={onChange} name="email" />
        <br />
        <label>Password:</label>
        <input
          value={password}
          onChange={onChange}
          type="password"
          name="password"
        />
        <br />
        <button>Sign In</button>
      </form>
    );
  }
}

export default Login;

// constructor() {
//     super();
//     this.state = {
//       email: '',
//       password: '',
//     };
//   }

//   //componentDidUpdate
//   //perform axios call to authenticate user

//   async handleSubmit = (e) => {
//     e.preventDefault();
//     console.log(this.state);
//     const credentials = {email: this.state.email, password: this.state.password};
//     const {token} = (await axios.post('/api/auth', credential)).data;
//     window.localStorage.setIten('token', token);
//     this.setState({ email: '', password: '' });
//   };

//   handleChange = ({ target: { name, value } }) => {
//     this.setState({ ...this.state, [name]: [value] });
//   };

//   render() {
//     const { handleSubmit, handleChange } = this;
//     console.log('render():', this.state);
//     return (
//       <div>
//         <div>Login</div>
//         <form onSubmit={handleSubmit}>
//           <label htmlFor="email">email:</label>
//           <input
//             type="text"
//             name="email"
//             value={this.state.email}
//             onChange={handleChange}
//           />
//           <label htmlFor="password">Password:</label>
//           <input
//             type="password"
//             name="password"
//             value={this.state.password}
//             onChange={handleChange}
//           />
//           <button type="submit">Submit</button>
//         </form>
//       </div>
//     );
//   }
// }

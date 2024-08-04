import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from 'axios';
import toast from 'react-hot-toast';
import { url } from "../ip";

const Signup = () => {

  const [username, setUsername]  = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {

    e.preventDefault();

    const payload = {
      name: username,
      password,
      email
    };

    console.log(payload);

    try{

      const response = await axios.post(`${url}/users/signup`, payload);
      console.log('Response: ', response.data);

      toast.success('User Created, Sign in again to proceed');
      

    } catch(e){

      console.log(e);

    }

  };



  const redirect = useNavigate();

  return (
        <main class="container mx-auto py-8">
        <div className="text-2xl font-bold">
            प्रश्नोत्तर मञ
        </div>
        <div class="bg-white rounded-md shadow-md p-4">
          <h2 class="text-2xl text-center font-bold mb-4">Signup</h2>
          <form onSubmit={handleSubmit}>
            <div class="mb-4">
              <label
                class="text-sm font-medium  peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                for="username"
              >
               Username 
              </label>
              <input
                class="flex h-10 border border-input ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 w-full rounded-md bg-muted/50 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                id="username"
                type="text"
                placeholder="Enter your username"
                value={username}
                onChange={(e) => {setUsername(e.target.value); console.log(username)}}
              />
            </div>
            <div class="mb-4">
              <label
                class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                for="email"
              >
                Email
              </label>
              <input
                class="flex h-10 border border-input ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 w-full rounded-md bg-muted/50 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                id="email"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => {setEmail(e.target.value); console.log(email)}}
              />
            </div>
            <div class="mb-4">
              <label
                class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                for="password"
              >
                Password
              </label>
              <input
                class="flex h-10 border border-input ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 w-full rounded-md bg-muted/50 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                id="password"
                placeholder="Enter your password"
                type="password"
                value={password}
                onChange={(e) => {setPassword(e.target.value); console.log(password)}}
              />
    
              <button className="w-full py-3 bg-black my-3 rounded rounded-lg text-white">Signin</button>
              Already have an account? <span className="hover:underline cursor-pointer" onClick={()=>{redirect('/signin')}}>Signin</span>
            </div>
          </form>
        </div>
        </main>
    );
}

export default Signup;
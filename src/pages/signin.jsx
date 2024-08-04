import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { url } from "../ip";


const Signin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try{
      const payload = {
        email,
        password,
      };
      
      const response = await axios.post(`${url}/users/signin`, payload);
      const token = response.data.Token;

      localStorage.setItem('qna-token', token);

      localStorage.setItem('qna-data', {
        username: response.data.Data.name,
        email: response.data.Data.email,
        password: response.data.Data.password
      });

      console.log(response);
      toast.success('Access granted');
      redirect('/');
    } catch(e){
      if(e.response.status == 404)  toast.error("Invalid Credentials, Access Denied");
      console.log(e);
    }
  };
  
  const redirect = useNavigate();

  return (
    <main className="container mx-auto py-8">
    <div className="text-2xl font-bold">
        प्रश्नोत्तर मञ
    </div>
    <div className="bg-white rounded-md shadow-md p-4">
      <h2 className="text-2xl text-center font-bold mb-4">Sign In</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            htmlFor="email"
          >
            Email
          </label>
          <input
            className="flex h-10 border border-input ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 w-full rounded-md bg-muted/50 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            id="email"
            type="email"
            placeholder="Enter your email"
            value = {email}
            onChange={(e) => {setEmail(e.target.value);console.log(email)}}
          />
        </div>
        <div className="mb-4">
          <label
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            htmlFor="password"
          >
            Password
          </label>
          <input
            className="flex h-10 border border-input ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 w-full rounded-md bg-muted/50 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            id="password"
            placeholder="Enter your password"
            type="password"
            value = {password}
            onChange={(e) => {setPassword(e.target.value);console.log(password)}}
          />
          <button className="w-full py-3 bg-black my-3 rounded rounded-lg text-white" type="submit">Signin</button>
          New? <span className="hover:underline cursor-pointer" onClick={()=> {redirect('/signup')}}>Create an account</span>
        </div>
      </form>
    </div>
    </main>
    );
}


export default Signin;
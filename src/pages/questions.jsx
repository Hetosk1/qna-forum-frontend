import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { url } from '../ip';
import {toast} from 'react-hot-toast';

const Questions = () => {
  const redirect = useNavigate();

  console.log(url)

  const isAuthenticated = () => {

    const token = localStorage.getItem('qna-token');
    if(token && token != 'undefined'){
      return true;
    } else {
      return false;
      redirect('/signin');
    }

  }

  const handleSignout = () => {
    localStorage.removeItem('qna-token');
    redirect('/');
  }

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({});


  const [question, setQuestion] = useState('');

  useEffect(() => {

    const fetchData = async () => {

      setLoading(true);
      
      try {
        const response = await fetch(`${url}/question/`, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('qna-token')
          }
        });
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const result = await response.json();
        setData(result.questions);


      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  for(let key in data){
    console.log('massi no piko')
    console.log(data[key])
  }

  const redirectToQuestion = () => {
      redirect('/question');
  }

  const addQuestion = async (e) => {
    e.preventDefault();
    console.log('button press detected');

    try{
      console.log(localStorage.getItem('qna-token'));
      const response = await axios.post(`${url}/question`,{question}, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + localStorage.getItem('qna-token')
        }},
      );

      
      window.location.reload();
      console.log('avv');
      toast.success('Question Added Successfully');
    } catch(e){
      console.log(e)
    }


  }

  return (

      <div>
      {
        isAuthenticated() == true
        ? 
        <div class="flex flex-col min-h-screen">
          <header class="bg-primary text-primary-foreground py-4 px-6 flex items-center justify-between">
            <h1 class="text-2xl font-bold cursor-pointer" onClick={() => {redirect('/')}} >प्रश्नोत्तर मञ्चः</h1>
            <div class="flex items-center cursor-pointer" >
              <span className="text-sm m-4" onClick={handleSignout}>Signout</span>
              {/*<button class="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2 mr-4">
                Ask a Question
              </button>*/}
              <div class="relative flex-1 max-w-md">
                <input
                  class="flex h-10 border border-input px-3 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 w-full rounded-md pl-8 pr-4 py-2 bg-primary/20 focus:bg-primary/30 focus:outline-none"
                  placeholder="Search questions..."
                  type="search"
                />
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  class="absolute left-2 top-1/2 -translate-y-1/2 w-4 h-4 text-primary-foreground/70"
                >
                  <circle cx="11" cy="11" r="8"></circle>
                  <path d="m21 21-4.3-4.3"></path>
                </svg>
              </div>
            </div>
          </header>
          <main class="flex-1 p-6">
            <div class="space-y-6">
              <form action="" onSubmit={addQuestion}>
                <input
                  class="flex h-10 border border-input px-3 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 w-full rounded-md pl-3 pr-4 py-2 bg-primary/20 focus:bg-primary/30 focus:outline-none"
                  placeholder="Type your question here"
                  type="text"
                  value = {question}
                  onChange={(e) => {setQuestion(e.target.value); console.log(question)}}
                />
                <button className="bg-black text-white p-2 mt-2 rounded rounded-lg" type="submit">Add Question</button>
              </form>
              <div class="flex items-center justify-between">
                <h2 class="text-2xl font-bold">Recent Questions</h2>
              </div>
              <div class="space-y-4">
              {/*<div class="bg-background rounded-md shadow p-4 flex items-start">
                  <div class="flex-1">
                    <h3 class="text-lg font-semibold">
                      <a class="hover:underline" href="#" onClick={redirectToQuestion}>
                        How do I create a responsive layout with Tailwind CSS?
                      </a>
                    </h3>
                    <p class="text-muted-foreground line-clamp-2">
                      I'm trying to create a responsive layout for my website using Tailwind CSS, but I'm having trouble
                      getting the layout to adjust properly on different screen sizes. Any tips or examples would be really
                      helpful.
                    </p>
                  </div>
                  <div class="ml-4 flex flex-col items-end text-muted-foreground">
                    <div class="flex items-center gap-2">
                      <button class="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 w-4 h-4 hover:bg-transparent text-stone-400 hover:text-stone-900">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          stroke-width="2"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          class="w-4 h-4"
                        >
                          <path d="M7 10v12"></path>
                          <path d="M15 5.88 14 10h5.83a2 2 0 0 1 1.92 2.56l-2.33 8A2 2 0 0 1 17.5 22H4a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h2.76a2 2 0 0 0 1.79-1.11L12 2h0a3.13 3.13 0 0 1 3 3.88Z"></path>
                        </svg>
                        <span class="sr-only">Upvote</span>
                      </button>
                      <span>2</span>
                      <button class="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 w-4 h-4 hover:bg-transparent text-stone-400 hover:text-stone-900">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          stroke-width="2"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          class="w-4 h-4"
                        >
                          <path d="M17 14V2"></path>
                          <path d="M9 18.12 10 14H4.17a2 2 0 0 1-1.92-2.56l2.33-8A2 2 0 0 1 6.5 2H20a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2h-2.76a2 2 0 0 0-1.79 1.11L12 22h0a3.13 3.13 0 0 1-3-3.88Z"></path>
                        </svg>
                        <span class="sr-only">Downvote</span>
                      </button>
                      <span>2</span>
                    </div>
                    <span>2 answers</span>
                    <span class="text-sm">
                      Asked by{" "}
                      <a class="hover:underline" href="#">
                        JohnDoe
                      </a>
                    </span>
                  </div>
                </div>*/}
               {data.map(dataItem => (
              <div class="bg-background rounded-md shadow p-4 flex items-start">
              <div class="flex-1">
                <h3 class="text-lg font-semibold">
                  <a class="hover:underline" href="#" onClick={() => {
                    localStorage.setItem('question-page-data', dataItem._id );
                    redirect('/question')
                  }}>
                   {dataItem.question} 
                  </a>
                </h3>
                {/*<p class="text-muted-foreground line-clamp-2">
                  I'm trying to create a responsive layout for my website using Tailwind CSS, but I'm having trouble
                  getting the layout to adjust properly on different screen sizes. Any tips or examples would be really
                  helpful.
                </p>*/}
              </div>
              <div class="ml-4 flex flex-col items-end text-muted-foreground">
                <div class="flex items-center gap-2">
                  <button class="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 w-4 h-4 hover:bg-transparent text-stone-400 hover:text-stone-900">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      class="w-4 h-4"
                    >
                      <path d="M7 10v12"></path>
                      <path d="M15 5.88 14 10h5.83a2 2 0 0 1 1.92 2.56l-2.33 8A2 2 0 0 1 17.5 22H4a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h2.76a2 2 0 0 0 1.79-1.11L12 2h0a3.13 3.13 0 0 1 3 3.88Z"></path>
                    </svg>
                    <span class="sr-only">Upvote</span>
                  </button>
                  <span>{dataItem.upvotes}</span>
                  <button class="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 w-4 h-4 hover:bg-transparent text-stone-400 hover:text-stone-900">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      class="w-4 h-4"
                    >
                      <path d="M17 14V2"></path>
                      <path d="M9 18.12 10 14H4.17a2 2 0 0 1-1.92-2.56l2.33-8A2 2 0 0 1 6.5 2H20a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2h-2.76a2 2 0 0 0-1.79 1.11L12 22h0a3.13 3.13 0 0 1-3-3.88Z"></path>
                    </svg>
                    <span class="sr-only">Downvote</span>
                  </button>
                  <span>{dataItem.downvotes}</span>
                </div>
                <span>2 answers</span>
                <span class="text-sm">
                  Asked by{" "}
                  <a class="hover:underline" href="#">
                    {dataItem.authorId}
                  </a>
                </span>
              </div>
            </div>
               ))

               } 
              </div>
            </div>
          </main>
        </div> 
      : 
      <div className="flex flex-col h-screen items-center text-center justify-center">
      <div className="text-4xl font-bold mb-4  transition duration-700 hover:underline hover:duration-700">प्रश्नोत्तर मञ</div>
        <div className="w-2/4 text-xl ">
              A uncensored question and answer forum where people can discuss any sort of issues and problems with a large userbase. Signin or Create a account for the<span className="font-bold underline"> श्रेष्ठः प्रश्नोत्तर </span>experience
        </div>
        <div>
          <button className="text-black border border-black rounded rounded-lg p-2 m-2 hover:bg-black hover:text-white" onClick={() =>{redirect('/signin')}}>Signin</button>
          <button className="text-white bg-black border border-black rounded rounded-lg p-2 m-2 hover:bg-white hover:text-black" onClick={() => {redirect('/signup')}}>Singup</button>
        </div>
      </div>
      }
      </div>
    );
};

export default Questions;
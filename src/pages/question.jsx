import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import {toast} from 'react-hot-toast';
import { url } from '../ip';



const Question = () => {
  const redirect = useNavigate();

  const [data, setData] = useState({
    question:{
      question: ''
    },
    responses: []
  });
  const [question, setQuestion] = useState([]);
  const [addResponse, setAddResponse] = useState('')
  const [responses, setResponses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({})
  
  const _id = localStorage.getItem('question-page-data');
  const token = localStorage.getItem('qna-token');
  console.log(`id : ${_id} & ${localStorage.getItem('qna-token')}`);

  useEffect(() => {

    const fetchData = async () => {
      try {

        const response = await axios.post(`${url}/question/qna`, {_id}, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('qna-token')
          }
        });

        console.log(response.data)

        await setData(response.data);

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        setQuestion(response.data.question);
        setResponses(response.data.responses)


      } catch (error) {
        console.log(error)
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [question, responses]);


  const addResponseHandler = async (e) => {
    e.preventDefault();
    console.log('button press detected');

    try{
      console.log(localStorage.getItem('qna-token'));
      const response = await axios.post(`${url}/answer`,{
        response: addResponse,
        questionId: _id
      }, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + localStorage.getItem('qna-token')
        }},
      );

      console.log(response);
      window.location.reload();
      toast.success('Response added');
    } catch(e){
      console.log(e)
    }
  }


  console.log('avv loda')
  console.log(data.question.question)



    return (
        <div class="flex flex-col min-h-screen">
        <header class="bg-primary text-primary-foreground py-4 px-6 flex items-center justify-between">
          <h1 class="text-2xl font-bold cursor-pointer" onClick={() => {redirect('/')}}>प्रश्नोत्तर मञ्चः</h1>
          <div class="flex items-center">
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
          <div class="space-y-6 pb-5">
            <div class="flex items-center justify-between">
              <h2 class="text-2xl font-bold">{data.question.question}</h2>
              <div className="text-gray-500">Asked by {data.question.authorId}</div>
            </div>

            <form action="" onSubmit={addResponseHandler}>            
                <input type="text" 
                       className="w-full m-2 h-10 border border-input px-3 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 rounded-md pl-4 pr-4 py-2 bg-primary/20 focus:bg-primary/30 focus:outline-none" 
                       placeholder="Add a answer" 
                       value={addResponse}
                       onChange={(e)=>{setAddResponse(e.target.value); console.log(addResponse)}}/>
                <button className="ml-2 px-3 py-2 bg-black text-white rounded rounded-lg">Add</button>
            </form>


            <div class="space-y-4">
             {/* <div class="bg-background rounded-md shadow p-4 flex items-center">
                <div class="flex-1">
                <div className="text-gray-500 pb-2">Answered by Hetoski</div>
                  <h3 class="text-lg ">
                    <a class="cursor-pointer" href="#" onClick={() => {redirect('/answer')}}>
                        Creating a responsive webpage involves designing it to automatically adjust its layout and content to fit different screen sizes and devices. The key is to use a combination of flexible grid layouts, media queries, and fluid images. Begin by adopting a mobile-first approach, designing for the smallest screens first and then using CSS media queries to adjust the layout for larger screens. Utilize flexible grid systems like those provided by frameworks such as Bootstrap or Tailwind CSS, which offer pre-defined classes to handle various screen sizes. Ensure images and media are fluid, meaning they resize within their containing elements, maintaining their aspect ratio. Testing the design across multiple devices and screen sizes is crucial to identify and fix any layout issues, ensuring a seamless user experience on all devices.
                    </a>
                  </h3>
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
                  <span>2 comments</span>
                  <span class="text-sm">
                    Answered by{" "}
                    <a class="hover:underline" href="#">
                      JohnDoe
                    </a>
                  </span>
                </div>
              </div>*/}
              {data.responses.map(response => (
              <div class="bg-background rounded-md shadow p-4 flex items-center">
              <div class="flex-1">
              <div className="text-gray-500 pb-2">Answered by {response.authorId}</div>
                <h3 class="text-lg ">
                  <a class="cursor-pointer" href="#" onClick={() => {
                    localStorage.setItem('answer-page-data', response._id );
                    redirect('/answer')
                    }
                    }>
                      {response.response}
                  </a>
                </h3>
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
                <span>2 comments</span>
              </div>
            </div>
              ))

              }
            </div>
          </div>

          <hr className="pt-5"/>



        </main>
      </div> 
    );
}

export default Question;
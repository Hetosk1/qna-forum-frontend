import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { url } from '../ip';
import {toast} from 'react-hot-toast';

const Answer = () => {

  const [data, setData] = useState({
    answer: {
      response: '' 
    },
    comments: []
  });

  const _id = localStorage.getItem('answer-page-data');

  useEffect(()=>{
    const fetchData = async () => {
      try{
        const response = await axios.post(`${url}/answer/aac`, {_id}, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('qna-token')
          }
        });

        console.log(response);
        setData(response.data);
      } catch(e){
        console.log(e);
      } finally{
        setLoading(false);
      }
    }


    fetchData();
  }, []);

  const addCommentHandler = async (e) => {
    e.preventDefault();
    console.log('button press detected');

    try{
      console.log(localStorage.getItem('qna-token'));
      const response = await axios.post(`${url}/comment`,{
        comment: addComment,
        responseId: _id
      }, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + localStorage.getItem('qna-token')
        }},
      );

      console.log(response);
      window.location.reload();
      toast.success('Comment added');
    } catch(e){
      console.log(e)
    }
  }

  const [addComment, setAddComment] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({});

  const redirect = useNavigate();
  return (
        <div className="flex flex-col min-h-screen">
        <header className="bg-primary text-primary-foreground py-4 px-6 flex items-center justify-between">
          <h1 className="text-2xl font-bold cursor-pointer" onClick={() => {redirect('/')}}>प्रश्नोत्तर मञ्चः</h1>
          <div className="flex items-center">
            <button className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2 mr-4">
              Ask a Question
            </button>
            <div className="relative flex-1 max-w-md">
              <input
                className="flex h-10 border border-input px-3 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 w-full rounded-md pl-8 pr-4 py-2 bg-primary/20 focus:bg-primary/30 focus:outline-none"
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
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="absolute left-2 top-1/2 -translate-y-1/2 w-4 h-4 text-primary-foreground/70"
              >
                <circle cx="11" cy="11" r="8"></circle>
                <path d="m21 21-4.3-4.3"></path>
              </svg>
            </div>
          </div>
        </header>

        <main className="flex-1 p-6">
          <div className="space-y-6 pb-5">
            <div className="flex flex-col justify-between">
              <div className="cursor-pointer font-bold" onClick={() => {redirect('/question')}}>Question here</div>
              <div className="py-3">{data.answer.response}</div>
              <div className="text-gray-500">Answered by {data.answer.authorId}</div>
            </div>

            <form action="" onSubmit={addCommentHandler}>            
                <input 
                  type="text" 
                  className=" h-10 border border-input px-3 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 rounded-md pl-4 pr-4 py-2 bg-primary/20 focus:bg-primary/30 focus:outline-none" 
                  placeholder="Add a comment" 
                  value={addComment}
                  onChange={(e)=>{setAddComment(e.target.value)}}
                />
                <button type="submit" className="ml-2 px-3 py-2 bg-black text-white rounded rounded-lg">Add</button>
            </form>


            <div className="space-y-4">

              {data.comments.map(comment => (
              <div className="bg-background rounded-md shadow p-4 flex items-center">
              <div className="flex-1">
              <div className="text-gray-500 pb-2">Comment by {comment.authorId}</div>
                <h3 className="text-lg ">
                  <a className="cursor-pointer" href="#" onClick={() => {alert('hello world')}}>
                      {comment.comment}
                  </a>
                </h3>
              </div>
              <div className="ml-4 flex flex-col items-end text-muted-foreground">
                <div className="flex items-center gap-2">
                  <button className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 w-4 h-4 hover:bg-transparent text-stone-400 hover:text-stone-900">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="w-4 h-4"
                    >
                      <path d="M7 10v12"></path>
                      <path d="M15 5.88 14 10h5.83a2 2 0 0 1 1.92 2.56l-2.33 8A2 2 0 0 1 17.5 22H4a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h2.76a2 2 0 0 0 1.79-1.11L12 2h0a3.13 3.13 0 0 1 3 3.88Z"></path>
                    </svg>
                    <span className="sr-only">Upvote</span>
                  </button>
                  <span>2</span>
                  <button className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 w-4 h-4 hover:bg-transparent text-stone-400 hover:text-stone-900">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="w-4 h-4"
                    >
                      <path d="M17 14V2"></path>
                      <path d="M9 18.12 10 14H4.17a2 2 0 0 1-1.92-2.56l2.33-8A2 2 0 0 1 6.5 2H20a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2h-2.76a2 2 0 0 0-1.79 1.11L12 22h0a3.13 3.13 0 0 1-3-3.88Z"></path>
                    </svg>
                    <span className="sr-only">Downvote</span>
                  </button>
                  <span>2</span>
                </div>

              </div>
            </div>
              ))
              }
            </div>
          </div>

          <hr className="pt-5"/>



        </main>
      </div>      
    )
};

export default Answer;
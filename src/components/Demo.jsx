import { useState ,useEffect} from 'react';
import {copy,linkIcon,loader,tick}from '../assets';
import {useLazyGetSummaryQuery} from '../services/article';
const Demo = () => {
  const[article,setArticle]=useState({
    url:'',
    summary:'',
  });
  //we want to show history of last 5 urls that we have searched for
  const[allArticles,setAllArticles]=useState([]);
  const[copied,setCopied]=useState("");
  const[getSummary,{error,isFetching}]=
  useLazyGetSummaryQuery();
  // using useEffect() hook,we are retrieving the history from the local storage and setting it to the allArticles state i.e we are storing the history in the allArticles state
  useEffect(()=>{
    const articlesFromLocalStorage=JSON.parse(localStorage.getItem('articles'))
    if(articlesFromLocalStorage){
      setAllArticles(articlesFromLocalStorage)
    }
  },[]);
  const handleSubmit=async(e)=>{
    e.preventDefault();
// e.preventDefault() prevents the default behaviour of the browser i.e it prevents the browser from reloading and refreshing the page


    // alert('Submitted');
    //data will get fetched from the api i.e it is the summary of the article
    const {data}=await getSummary({articleUrl:article.url});
    // if(data?.summary) means if data.summary is not null then create a new article object with the summary of the article and set the article to the new article
    if(data?.summary){
      const newArticle={...article,summary:data.summary};
      const updatedAllArticles=[newArticle,... allArticles];
      setArticle(newArticle);
      setAllArticles(updatedAllArticles);
      // console.log(newArticle);
      localStorage.setItem('articles',JSON.stringify(updatedAllArticles));
    }
  }
  
  // making the copy button work in history
  const handleCopy=(copyUrl)=>{
    setCopied(copyUrl);
    navigator.clipboard.writeText(copyUrl);
    setTimeout(()=>setCopied(false),3000);
  }
  
  return (
    <section className='mt-16 w-full max-w-xl'>
      {/* Search bar */}
      <div className='flex flex-col w-full gap-2'>
        <form className='relative flex justify-center items-center'
        onSubmit={handleSubmit}
        >
          <img
          src={linkIcon}
          alt='link_icon'
          className='absolute left-0 my-2 ml-3 w-5'
          />
          <input
          type="url"
          placeholder='Enter a URL'
          value={article.url}
          onChange={(e)=>setArticle({...article,url:e.target.value})}
          required
          className='url_input peer'
          />
          
          <button
          type='submit'
          className='submit_btn
          peer-focus:border-white
          peer-focus:white
          '>
            Go ➤
            {/* if we focus i.e click on enter url form, submit button will also be focussed (black border seen) */}
          </button>
        </form>
        {/* Browse URL History */}
        <div className='flex flex-col gap-1 max-h-60 overflow-y-auto'>
          {allArticles.map((item,index)=>(
            <div
            key={`link-${index}`}
            onClick={()=>setArticle(item)}
            className="link_card"
            >
            <div className='copy_btn'
            onClick={()=>handleCopy(item.url)}>
              {/* if copied to clipboard ,then show tick icon (that will be changed to copy icon after 3 seconds as we have set the timeout) else show the copy icon */}
              <img
                src={copied===item.url ? tick:copy}
                alt="copy_icon"
                className='w-[40%] h-[40%] object-contain'
              />

            </div>
            <p className='flex-1 font-satoshi text-blue-700 font-medium text-sm truncate'>
              {item.url}
            </p>
            </div>
          ))}
          
           </div>
      </div>
      {/* Display Results */}
      <div className='my-10 max-w-full flex justify-center items-center'>
        {isFetching ? (
          // loader image will be shown when the data is being fetched from the api
          <img src={loader} alt="loader" className='w-20 h-20 object-contain'/>)
          // else if error
          :error?(
            <p className='font-inter font-bold text-black text-center'>
              Well,that was not supposed to happen...
              <br/>
              <span className='font-satoshi font-normal text-gray-700'>
                {/* actual error that can be seen by a developer */}
                {error?.data?.error}</span>
              </p>
          )
          :(article.summary && (
            <div className='flex flex-col gap-3'>
              <h2 className='font-satoshi font-bold text-gray-600 text-xl'>Article
                <span className='blue_gradient'> Summary</span>
              </h2>
              <div className='summary_box'>
                <p className='font-inter font-medium text-sm text-gray-700'>{article.summary}</p>

              </div>
            </div>
          )
        )}

      </div>
    </section>

  )
}

export default Demo
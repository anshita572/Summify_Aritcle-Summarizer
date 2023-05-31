import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const rapidApiKey = import.meta.env.VITE_RAPID_API_ARTICLE_KEY;

export const articleApi = createApi({
    reducerPath: 'articleApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://article-extractor-and-summarizer.p.rapidapi.com/',
        prepareHeaders: (headers) => {
            headers.set('X-RapidAPI-Key', rapidApiKey);
            headers.set('X-RapidAPI-Host', 'article-extractor-and-summarizer.p.rapidapi.com');

            return headers;
        },
    }),
    endpoints:(builder)=>({
        getSummary:builder.query({
            //see from rapid api get/summarize.The required parameter is url and optional parameters is length (=3) (we can change it in ra) get/summarize)
            query:(params)=>`/summarize?url=${encodeURIComponent(params.articleUrl)}&length=3`,
        })
    })
    //encodeURIcomponent is used to encode the url so that it can be used in the url i.e. if there are any special characters, it will be encoded and we will have no problem in using it in the url

});
export const {useLazyGetSummaryQuery}=articleApi;
// using LazyQuery because we don't want to fetch the data until the user clicks the button.Without using LazyQuery , the data will be fetched as soon as the component is rendered i.e. when the user enters the url and didn't click the submit button but summary would have been displayed.
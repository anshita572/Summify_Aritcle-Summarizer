// store is a global state that stores enitre information of the application but in most cases we don't need the entire state , we only need to reduce it to a specific slice of the pie and in this ,it is going to be the article api
import {configureStore} from '@reduxjs/toolkit';
import {articleApi}from './article';
export const store=configureStore({
    reducer:{
        [articleApi.reducerPath]:articleApi.reducer
    },
    middleware:(getDefaultMiddleware)=>
    getDefaultMiddleware().concat(articleApi.middleware)
});
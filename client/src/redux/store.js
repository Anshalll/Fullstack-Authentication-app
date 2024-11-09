import {configureStore} from '@reduxjs/toolkit'
import { AccessData } from './Apis/Apis'
import AuthSlice from '../redux/AuthSlice/slice.js'




export const store = configureStore({

    reducer: {
       
        [AccessData.reducerPath]: AccessData.reducer,
       [AuthSlice.name]: AuthSlice.reducer

      },
     
      middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(AccessData.middleware),


})
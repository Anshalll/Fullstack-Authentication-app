import {configureStore} from '@reduxjs/toolkit'
import { AccessData } from './Apis/Apis'



export const store = configureStore({

    reducer: {
       
        [AccessData.reducerPath]: AccessData.reducer,

      },
     
      middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(AccessData.middleware),


})
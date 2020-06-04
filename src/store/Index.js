import { createStore, compose, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import { persistStore, persistReducer } from 'redux-persist'
import { AsyncStorage } from 'react-native'

import reducers from '../reducers/Index' 

const persistConfig  = {
    key:'root',
    storage : AsyncStorage,
    whitelist : ['likedJobs']
}
const persistedReducer  = persistReducer(persistConfig, reducers)
const store = createStore( persistedReducer, compose(applyMiddleware(thunk)) )
const persistStorage = persistStore(store)
export default { store , persistStorage }
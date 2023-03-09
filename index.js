const Withdrow = "WITHDRAW_MONEY" ;
const Deposite = "DEPOSITE_MONEY" ;
const AddProdct = "AddProdct_MONEY" ;
const removeProuct = "removeProuct_MONEY" ;
let balance = 1000;
let products = ["dudernet","baby gel"];
let productsView = document.querySelector('.productsView');
let amount  = document.querySelector('#amount');
productsView.innerHTML = products;
amount.innerHTML = balance;   
// const getData = async (URL)=>{
//     const res = await fetch(URL);
//     const data = await res.json();
//     data.map(ele=>{
//         products.push(ele.name);
//     })
// }
    
//     getData("https://api.github.com/users/Andrew-Doghry/repos");
    
const withdrawAction = (amount)=>{
return {
    type : Withdrow,
    payload : amount,
}
}
const depositeAction = (amount)=>{
return {
    type : Deposite,
    payload : amount,
}
}
const addProductAction = (element)=>{
return {
    type : AddProdct,
    payload : element,
}
}
const removeProductAction = (element)=>{
return {
    type : removeProuct,
    payload : element,
}
}
const filterElement = (arr , key)=>{
    let count = 0 ;
let newArray = arr.filter(ele=> 
{
if(ele != key){
return true;
}else{
count++;
return false;
}

});
if(count>1){
for(let i = 0 ; i<count-1;i++){
    newArray.push(key);
}
return newArray; 
}
    return newArray
}
//the reducers 
const productsReducer = (state=products, action)=>{
switch (action.type){
    case AddProdct:
    return [...state,action.payload]
    case removeProuct:
    return filterElement(state,action.payload)
    default:
    return state;
}


}
const BalnaceReducer = (state = balance,action)=>{
switch(action.type){
    case Withdrow:
    return state - action.payload;
    case Deposite:
        return state + action.payload;
        default:
            return state;
}
}
const rootReducers = Redux.combineReducers({
balance:BalnaceReducer
,products:productsReducer
});
//creating store
const store = Redux.createStore(rootReducers);

//buttons functionality
document.querySelector('#deposite').addEventListener('click',()=>{
store.dispatch(depositeAction(+(document.querySelector('.amountInput').value)))
})
document.querySelector('#withdraw').addEventListener('click',()=>{
    store.dispatch(withdrawAction(+(document.querySelector('.amountInput').value)))
})
document.querySelector('#addProduct').addEventListener('click',()=>{
    store.dispatch(addProductAction(document.querySelector('.productsInput').value))
})
document.querySelector('#removeProduct').addEventListener('click',()=>{
    store.dispatch(removeProductAction(document.querySelector('.productsInput').value))
})


//CHANGE RENDERED ELEMENTS WHEN STATE CHNAGES
store.subscribe  (()=>{
    amount.innerHTML = store.getState().balance;
    productsView.innerHTML = store.getState().products
})

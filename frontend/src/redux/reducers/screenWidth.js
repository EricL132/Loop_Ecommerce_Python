const screenWidth = (state="1000px",action)=>{ 
    switch(action.type){
        case 'CHANGE_WIDTH':
            return action.payload
        default:
            return state
    }
}
export default screenWidth
export const validate=(input,filter)=>{
    const error={}
    if(!input.name){
    error.name="Username is required"    
    }
    if(!/^[A-Za-z\s]+$/.test(input.name)){
        error.name="Username is invalid"
    }
    if(input.name && filter.length>0){
        error.name="Username already exists"

    }
     if(!input.weightmin){
        error.weightmin="Weight is required"
    } 
    if(!/^[0-9]+$/.test(input.weightmin)){
        error.weightmin="Weight is invalid"
    }
     if(!input.weightmax){
        error.weightmax="Weight is required"
    } 
    if(!/^[0-9]+$/.test(input.weightmax)){
        error.weightmax="Weight is invalid"
    }
    if(!input.heightmin){
        error.heightmin="Weight is required"
    } 
    if(!/^[0-9]+$/.test(input.heightmin)){
        error.heightmin="Weight is invalid"
    }
     if(!input.heightmax){
        error.heightmax="Weight is required"
    } 
    if(!/^[0-9]+$/.test(input.heightmax)){
        error.heightmax="Weight is invalid"
    }
    if(input.weightmin && input.weightmax && parseInt(input.weightmin) > parseInt(input.weightmax)){
        error.weightmin="Weight is invalid"
    }
    if(input.heightmin && input.heightmax && parseInt(input.heightmin) > parseInt(input.heightmax)){
        error.heightmin="Height is invalid"
    }
    return error

}
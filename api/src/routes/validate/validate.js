
 module.exports={
    validate:(el)=>{
        
        if(el.metric==="NaN"){
            el.metric="14 - 16" 
            return el
        }
        else if(el.metric.includes("NaN")){
            let split=el.metric.split("-")
            if(split[0]==="NaN "){
                el.metric=split[1]
                return el
            }
            else if(split[1]==="NaN "){
                el.metric=split[0]
                return el
            }
           
        }
    
    return el 
 
    }} 
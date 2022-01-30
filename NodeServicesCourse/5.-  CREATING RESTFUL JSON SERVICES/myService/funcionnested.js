function algo(){

    function otroAlgo(){
        console.log('otro algo')
        return algo2;
    }

    
    function algo2(){
        console.log('algo2')
    }
    return otroAlgo();
}

algo()()
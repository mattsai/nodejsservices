const myController = {};
myController.salute = (req,res)=>{
    res.writeHead(200, {'Content-Type': 'application/json'})
    res.end('Soy otro tú')
}

module.exports = myController;
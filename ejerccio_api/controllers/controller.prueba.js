
export const devolverJson = async(req,res)=> {
    

    const {numero1, numero2, metodo} = req.body;

let resultado;


    if (metodo == 'suma') {
        resultado = numero1 + numero2
    }

    if (metodo == 'resta') {
        resultado = numero1 - numero2
    }

    if (metodo == 'multiplicacion') {
        resultado = numero1 * numero2
    }

    if (metodo == 'division') {
        resultado = numero1 / numero2
    }


    return res.status(200).json({"mensaje" : "resultado suma", resultado,"status": 200})


}
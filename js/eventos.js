const listadocuentas = [7030806,7030811,7030812,7030704,7030707]
class registracion {
    constructor(cuenta,servicio,importe){
        this.cuenta = cuenta
        this.servicio = servicio
        this.importe = importe
    }
}
const listadoasientos = []

const submitcuenta = (id) =>{
    let formcuenta = document.getElementById(id);
    formcuenta.addEventListener('submit',(event)=>{
        event.preventDefault();
        let cuenta = formcuenta.children[0].value
        if (listadocuentas.includes(parseInt(cuenta)) == false && cuenta.length == 7 && cuenta > 0){
            listadocuentas.push(parseInt(cuenta))
            let cuentasdiv = document.getElementById('cuentasdiv')
            const elemento = document.createElement('div')
            elemento.innerHTML = `
            <div>${cuenta}</div>
            `
            cuentasdiv.append(elemento)
        }
        else{alert('Esa cuenta ya se encuentra incluida, no tiene 7 caracteres o ingresó valores negativos.')}
        formcuenta.children[0].value = ''
        console.log(listadocuentas)
        })
}
const mostrarcuentas = () =>{
        let cuentasdiv = document.getElementById('cuentasdiv')
        for (let index = 0; index < listadocuentas.length; index++) {
            const cuenta = listadocuentas[index];
            const elemento = document.createElement('div')
            elemento.innerHTML = `
            <div>${cuenta}</div>
            `
           cuentasdiv.append(elemento)
        }
    }

const submitasiento = (id) =>{
        let formasiento = document.getElementById(id);
        formasiento.addEventListener('submit',(event)=>{
            event.preventDefault();
            let cuenta = formasiento.children[0].value
            let servicio = formasiento.children[1].value
            let importe = formasiento.children[2].value
            if((listadocuentas.includes(parseInt(cuenta))) == false || servicio == ''){
                alert('La cuenta ingresada no está en el listado o el servicio se encuentra vacío.')
            }
            else{
            let asiento = new registracion (parseInt(cuenta),servicio,parseInt(importe))
            listadoasientos.push(asiento)
            botonasientos.click()
            console.log(listadoasientos)

            }
            formasiento.children[0].value = ''
            formasiento.children[1].value = ''
            formasiento.children[2].value = ''
        })
    }
const eliminarasiento = (id) => {
    let asientoeliminado = document.getElementById(id);
        asientoeliminado.addEventListener('submit',(event)=>{
            event.preventDefault();
            let asientonroelim = parseInt(asientoeliminado.children[0].value)-1
            if(asientonroelim <= listadoasientos.length && asientonroelim >= 0){
            listadoasientos.splice(asientonroelim,1)
            botonasientos.click()
            console.log(listadoasientos)}
            else{
                alert('El asiento a eliminar no existe')
            }
            asientoeliminado.children[0].value = ''
        })}
const mostrarasientos = (id) =>{
        let asientosdiv = document.getElementById('asientosdiv')
        let botonasientos = document.getElementById(id)
        botonasientos.addEventListener('click',(event) =>{
        event.preventDefault();
        asientosdiv.innerHTML = '';
        let total = 0
        for (let index = 0; index < listadoasientos.length; index++) {
            const asientonro = listadoasientos[index];
            const elemento = document.createElement('div')
            total = total + asientonro.importe
            elemento.innerHTML = `
            <div>Asiento N: ${index+1}, cuenta: ${asientonro.cuenta}, servicio: ${asientonro.servicio}, importe: ${asientonro.importe}.</div>
            `
           asientosdiv.append(elemento)
        }
        const sumatotal = document.createElement('div')
        if(listadoasientos.length > 0){sumatotal.textContent = "Total = $ "+total
        asientosdiv.append(sumatotal)}
        else{}
    })
}


mostrarcuentas()
submitcuenta('formcuenta')
submitasiento('formasiento')
mostrarasientos('botonasientos')
eliminarasiento('elimasiento')
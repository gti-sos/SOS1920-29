async function create_xData(){
    let data = [];

    const BASE_API_URL = "/api/v1";

    const res_emp = await fetch("/api/v2/emp-stats");
    const res_edq = await fetch(BASE_API_URL+"/edq-stats");
    const res_woman = await fetch("/api/v2/womanresearchers-stats");

    if(res_edq.ok && res_emp.ok && res_woman.ok){
        let json = await res_emp.json();
        let data_emp = json;

        json = await res_edq.json();
        let data_edq = json;

        json = await res_woman.json();
        let data_woman = json;

        //Hacemos una lista en la que tendremos todas las combinaciones de país y año que aparezca en alguna de las APIs
        for(let i = 0; i < data_emp.length; i++){
            //Si no encontramos la combinación en el array data la añadimos.
            if(data.filter(dato => (dato.country == data_emp[i].country) && (dato.year == data_emp[i].year) ).length <= 0){
                data.push({country: data_emp[i].country, year: data_emp[i].year});
            }
        }

        //Repetimos para todas las APIs.
        for(let i = 0; i < data_edq.length; i++){
            if(data.filter(dato => (dato.country == data_edq[i].country) && (dato.year == data_edq[i].year) ).length <= 0){
                data.push({country: data_edq[i].country, year: data_edq[i].year});
            }
        }

        //Repetimos para todas las APIs.
        for(let i = 0; i < data_woman.length; i++){
            if(data.filter(dato => (dato.country == data_woman[i].country) && (dato.year == data_woman[i].year) ).length <= 0){
                data.push({country: data_woman[i].country, year: data_woman[i].year});
            }
        }

        //Ordenamos el array por año y en caso de empate orden alfabético.
        data.sort(function (a,b){
            if (a.year > b.year) return 1;
            if (a.year < b.year) return -1;
            if(a.country.localeCompare(b.country) < 0) return -1;
            if(a.country.localeCompare(b.country) > 0) return 1;
        });

 
    }
    else{
        console.log("Error receiving data.");
    }

    console.log(data);

    return data;

}

//En xData: [] guardamos un array de todos los valores del eje X, tenemos que comprobar que todos coinciden.
//1. Meter en xData todas las combinaciones de País/Año entre las 3 APIs.
//2. Por cada valor País/Año que tenga en xData llamo a la API para ver si tengo dato para esa combinación.

//1. Realizo filtrado por cada posición de xData, si lo encuentro guardo en un array los valores de los 3 datos,
//si no lo encuentro guardo tres 0 en el array.

async function loadDataset_sg(){
    let dataset = {};
}

async function loadDataset_gee(){

}

async function loadDataset_ptr(){

}

export {create_xData,loadDataset_sg, loadDataset_gee, loadDataset_ptr};
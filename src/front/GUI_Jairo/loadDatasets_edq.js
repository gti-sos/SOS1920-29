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


    return data;

}

//1. Realizo filtrado por cada posición de xData, si lo encuentro guardo en un array los valores de los 3 datos,
//si no lo encuentro guardo tres 0 en el array.

async function devuelve_edqStats(xData){
    let data = [];


    //Para cada posición de xData hago un filter para ver si tengo el dato en mi API.
    const BASE_API_URL = "/api/v1";

    const res_edq = await fetch(BASE_API_URL+"/edq-stats");

    if(res_edq.ok){
        let json = await res_edq.json();
        let data_edq = json;


        for(let i = 0; i < xData.length; i++){

            if(data_edq.filter(dato => (dato.country == xData[i].country) && (dato.year == xData[i].year) ).length > 0){
                data.push([data_edq.filter(dato => (dato.country == xData[i].country) && (dato.year == xData[i].year))[0].edq_sg, data_edq.filter(dato => (dato.country == xData[i].country) && (dato.year == xData[i].year))[0].edq_gee, data_edq.filter(dato => (dato.country == xData[i].country) && (dato.year == xData[i].year))[0].edq_ptr]);
            }
            else{
                data.push([0,0,0]);
            }
        }


    }
    else{
        console.log("Error receiving data from edq-stats.");
    }

    return data;

}


export {create_xData, devuelve_edqStats};
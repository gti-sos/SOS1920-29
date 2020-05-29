async function devuelve_WomanStats(xData){
    let data = [];

    const res_womanresearchers = await fetch("/api/v2/womanresearchers-stats");

    if(res_womanresearchers.ok){
        let json = await res_womanresearchers.json();
        let data_womanresearchers = json;


        for(let i = 0; i < xData.length; i++){

            if(data_womanresearchers.filter(dato => (dato.country == xData[i].country) && (dato.year == xData[i].year) ).length > 0){
                data.push([data_womanresearchers.filter(dato =>
                     (dato.country == xData[i].country) 
                     && (dato.year == xData[i].year))[0].womanresearchers_he, data_womanresearchers.filter(dato => 
                        (dato.country == xData[i].country) && (dato.year == xData[i].year))[0].womanresearchers_gov, data_womanresearchers.filter(dato => 
                            (dato.country == xData[i].country) && (dato.year == xData[i].year))[0].womanresearchers_bent]);
            }
            else{
                data.push([0,0,0]);
            }
        }


    }
    else{
        console.log("Error receiving data from womanresearchers-stats.");
    }

    return data;

}


export {devuelve_WomanStats};
async function devuelve_empStats(xData){
    
    let data = [];
    const res_emp = await fetch("/api/v2/emp-stats");

    if(res_emp.ok){
        
        //console.log("Ok res_emp:");
        const json = await res_emp.json();
        let emp_data = json;

        //console.log(xData);

        for(let indice_array = 0; indice_array < xData.length; indice_array++){
            let cont = 0;
            let pos_dato = 0;

            for(let indice_emp = 0; indice_emp < emp_data.length; indice_emp++){

                if(emp_data[indice_emp].country == xData[indice_array].country && emp_data[indice_emp].year == xData[indice_array].year){              
                    //He encontrado mi dato en el array conjunto
                    cont += 1;
                    pos_dato = indice_emp;
                }
            }
            if(cont == 0){
                data.push([0,0,0,0]);
            }else{

                data.push([emp_data[pos_dato].emp_female_age15_24, emp_data[pos_dato].emp_male_age15_24, emp_data[pos_dato].emp_vuln_female, emp_data[pos_dato].emp_vuln_male]);
            }

        }
    }
    else{
        console.log("Error receiving data from emp-stats.");
    }

    return data;

}
export {devuelve_empStats};


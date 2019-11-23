var filas = [];

function AgFila(name, country, technical_director, captain, league, tBody){
    var newRow = document.createElement("tr");
    filas.push({
        "id":0,
        "name": name,
        "country": country,
        "technical_director": technical_director,
        "captain": captain,
        "league": league
    });

    newRow.innerHTML = `<td><b>${name}</b></td> 
    <td>${country}</td> 
    <td>${technical_director}</td>
    <td>${captain}</td>
    <td>${league}</td>`;

    var Contenedor= document.createElement("td");
    var deleteButton= document.createElement("button");
    var checkInput= document.createElement("input");

    deleteButton.classList.add("btn");
    deleteButton.classList.add("btn-danger");

    deleteButton.innerText= "Eliminar";
    deleteButton.value= contador;
    var name = document.querySelector("#carnet_field");

    checkInput.addEventListener("keyup", function(event){
        var name= name   .value;
        var idEvent= event.srcElement.value;
        if(carnet==idEvent){
            deleteButton.addEventListener("click", function(event){
                var idElement = event.srcElement.value;
                var trToDelete = document.querySelector(`button[value='${idElement}']`).parentElement.parentElement;
                
        
                tBody.removeChild(trToDelete);
                filas.forEach((item, index)=>{
                    if(item.id==idElement){
                        filas.splice(index, 1);
                    }
                });
            });
            
        }
  

    });

    Contenedor.appendChild(deleteButton);
    newRow.appendChild(Contenedor);

    Contenedor.appendChild(checkInput);
    newRow.appendChild(checkInput);


    tBody.appendChild(newRow);
    contador++;

};

//Onload
window.onload = function()
{
    var submit_btn = document.querySelector("#submit_btn");
    var Tname = document.querySelector("#Tname");
    var country = document.querySelector("#country");
    var technical_director = document.querySelector("#technical_director");
    var captain = document.querySelector("#captain");
    var league = document.querySelector("#league");
    var tBody = document.querySelector("#table_body");
    
    submit_btn.addEventListener("click", ()=>{
        var name = Tname.value;
        var country = country.value;
        var technical_director = technical_director.value;
        var captain = captain.value;
        var league = league.value;
    });

    carnet_field.addEventListener("keyup", (event)=> {
        var carnet = carnet_field.value;
        if (carnetRegex.test(carnet)){
            submit_btn.disabled = false;
        }
        else{
            submit_btn.disabled = true;
        }

    });
}
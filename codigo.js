function agregarTarea(){
    var title = document.getElementById("tx-titulo").value;
    var desc = document.getElementById("tx-descripcion").value;
    
    if(title == "" && desc == ""){
        alert("Debe agregar título y descripción para el POST")
    }
    else{
        var importante = document.getElementById("ch-importante").checked;
        var pos = [];
        pos = JSON.parse(localStorage.getItem("posts"));

        if(!pos){
            pos = [];
            pos.push({title,desc,importante});
        }
        else{
            var i = pos.findIndex(r => r.title == title);
            if(i == -1){
                pos.push({title,desc,importante});
            }
            else{
                pos[i] = {title,desc,importante};
            }
        }
        localStorage.setItem("posts", JSON.stringify(pos));
        limpiarForm();
    }

}

function limpiarForm(){
    verPosts();
    document.getElementById("tx-titulo").value = "";
    document.getElementById("tx-descripcion").value = "";
    document.getElementById("ch-importante").checked = false;
}

function verPosts(){
    var pos=[];
    pos = JSON.parse(localStorage.getItem("posts"));

    var contenedor = document.getElementById("contenedor");
    var postHtml = "";
    var panelCSS = "";

    pos.forEach(e => {
        if(e.importante){
            panelCSS = "panel2";
        }
        else{
            panelCSS = "panel1";
        }
        postHtml += `<div class="col-md-3 col-sm-6">
                        <div class="panel panel-default ${panelCSS}">
                            <div class="panel-heading">
                                <div class="row">
                                    <div class ="col md-8">
                                    ${e.title}
                                    </div>
                                    <div class="col md-2">
                                    </div>
                                    <div class="col md-2">
                                        <span onClick="eliminarPost('${e.title}');" class="fa fa-trash coloricon"></span>
                                    </div>
                                </div>
                            </div>
                            <div class="panel-body">${e.desc}</div>
                        </div>
                    </div>        
        `});
    document.getElementById("contenedor").innerHTML = postHtml;

}

function eliminarPost(titu){
    var pos = [];
    pos = JSON.parse(localStorage.getItem("posts"));
    var i = pos.findIndex(r => r.title == titu);
    alert("El Elemento se ha eliminado");
    pos.splice(i,1);
    localStorage.setItem("posts", JSON.stringify(pos));
    verPosts();

}
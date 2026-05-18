let transacoes = [];

const menu = document.getElementById("menu");
const tema = document.getElementById("tema");

menu.addEventListener("change", trocarTela);
tema.addEventListener("change", trocarTema);

function trocarTela(){

    document.querySelectorAll(".screen").forEach(tela=>{
        tela.style.display="none";
    });

    if(menu.value==="dashboard"){
        document.getElementById("dashboardScreen").style.display="block";
        atualizarDashboard();
    }

    if(menu.value==="add"){
        document.getElementById("addScreen").style.display="block";
    }

    if(menu.value==="view"){
        document.getElementById("viewScreen").style.display="block";
        atualizarTabela();
    }
}

function trocarTema(){

    if(tema.value==="escuro"){
        document.body.classList.add("dark");
    }else{
        document.body.classList.remove("dark");
    }
}

function salvarTransacao(){

    const tipo=document.getElementById("tipo").value;
    const categoria=document.getElementById("categoria").value;
    const valor=parseFloat(document.getElementById("valor").value);
    const descricao=document.getElementById("descricao").value;

    transacoes.push({
        tipo,
        categoria,
        valor,
        descricao
    });

    alert("Transação salva!");

    atualizarDashboard();
    atualizarTabela();
}

function atualizarTabela(){

    const tabela=document.getElementById("tabelaBody");

    tabela.innerHTML="";

    transacoes.forEach(t=>{

        tabela.innerHTML+=`
        <tr>
            <td>${t.tipo}</td>
            <td>${t.categoria}</td>
            <td>R$ ${t.valor.toFixed(2)}</td>
            <td>${t.descricao}</td>
        </tr>
        `;
    });
}

function atualizarDashboard(){

    let receitas=0;
    let despesas=0;

    transacoes.forEach(t=>{

        if(t.tipo==="Receita"){
            receitas+=t.valor;
        }else{
            despesas+=t.valor;
        }
    });

    const saldo=receitas-despesas;

    document.getElementById("Receitas").innerText = "R$ " + receitas.toFixed(2);
    document.getElementById("Despesas").innerText=
        "R$ " + despesas.toFixed(2);

    document.getElementById("Saldo").innerText=
        "R$ " + saldo.toFixed(2);

    gerarGrafico();
}

let chart;

function gerarGrafico(){

    const categorias={};

    transacoes.forEach(t=>{

        if(t.tipo==="Despesa"){

            if(!categorias[t.categoria]){
                categorias[t.categoria]=0;
            }

            categorias[t.categoria]+=t.valor;
        }
    });

    const ctx=document.getElementById("grafico");

    if(chart){
        chart.destroy();
    }

    chart=new Chart(ctx,{
        type:"pie",
        data:{
            labels:Object.keys(categorias),
            datasets:[{
                data:Object.values(categorias)
            }]
        }
    });
}

trocarTela();
trocarTema();
gerarGrafico();
atualizarDashboard();
atualizarTabela();
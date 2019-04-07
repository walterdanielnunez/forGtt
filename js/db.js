var db = openDatabase("myDB", "1.0", "dataBase", 4048);
		db.transaction(function(criarTB){
			criarTB.executeSql("CREATE TABLE usuarios (id INTEGER PRIMARY KEY, nome VARCHAR(30), sobrenome VARCHAR(30), dataNasc DATE, cpf VARCHAR(14), cnh VARCHAR(16), endereco VARCHAR(60), email VARCHAR(50), celular VARCHAR(16))");

			criarTB.executeSql("CREATE TABLE veiculos (id INTEGER PRIMARY KEY, placa VARCHAR(10), renavam VARCHAR(20), anoFab INTEGER, anoComp INTEGER, cargaMax INTEGER, eixos INTEGER, cumprimento DECIMAL(3,1))");

			criarTB.executeSql("CREATE TABLE agenda (id INTEGER PRIMARY KEY, motorista VARCHAR(60), veiculo VARCHAR(10), entrada DATE, saida DATE, operacao VARCHAR(8))");

		});

function addUsuario(){
	var data = {};
	$.each($('#addUser').serializeArray(), function() {
    data[this.name] = this.value;
});

	db.transaction(function(salvar){
				salvar.executeSql("INSERT INTO usuarios (nome, sobrenome, dataNasc, cpf, cnh, endereco, email, celular) VALUES (?,?,?,?,?,?,?,?)", [data.nome, data.sobrenome, data.dataNasc, data.cpf, data.cnh, data.endereco, data.email, data.celular]);
			});
	go('usuarios');
}

function addVeiculo(){
	var data = {};
	$.each($('#addVeiculo').serializeArray(), function() {
    data[this.name] = this.value;
});

	db.transaction(function(salvar){
				salvar.executeSql("INSERT INTO veiculos (placa, renavam, anoFab, anoComp, cargaMax, eixos, cumprimento) VALUES (?,?,?,?,?,?,?)", [data.placa.toUpperCase(), data.renavam, data.anoFab, data.anoComp, data.cargaMax, data.eixos, data.cumprimento]);
			});
	go('veiculos');
}

function addAgenda(){
	var data = {};
	$.each($('#addAgenda').serializeArray(), function() {
    data[this.name] = this.value;
});

	db.transaction(function(salvar){
				salvar.executeSql("INSERT INTO agenda (motorista, veiculo, entrada, saida, operacao) VALUES (?,?,?,?,?)", [data.motorista, data.veiculo, data.entrada, data.saida, data.operacao]);
			});
	go('agendamentos');
}

function listarUsuarios(){
	db.transaction(function(sel){
			sel.executeSql("SELECT * FROM usuarios", [], function(sel, resultado){
				var rows = resultado.rows;
				var tr = '';
				for (var i = 0; i < rows.length; i++){
					tr += "<tr>";
					tr += "<td align='center'>" + rows[i].nome + "</td>";
					tr += "<td align='center'>" + rows[i].sobrenome + "</td>";
					tr += "<td align='center'>" + dataBr(rows[i].dataNasc) + "</td>";
					tr += "<td align='center'>" + rows[i].cpf + "</td>";
					tr += "<td align='center'>" + rows[i].cnh + "</td>";
					tr += "<td align='center'>" + rows[i].endereco.substring(0, 20) + "...</td>";
					tr += "<td align='center'>" + rows[i].email + "</td>";
					tr += "<td align='center'>" + rows[i].celular + "</td>";
					tr += "</tr>" 
				}
				document.getElementById('tableUsuarios').innerHTML = tr;
			});
		});
}
var res = str.substring(0, 4);

function listarVeiculos(){
	db.transaction(function(sel){
			sel.executeSql("SELECT * FROM veiculos", [], function(sel, resultado){
				var rows = resultado.rows;
				var tr = '';
				for (var i = 0; i < rows.length; i++){
					tr += "<tr>";
					tr += "<td align='center'>" + rows[i].placa + "</td>";
					tr += "<td align='center'>" + rows[i].renavam + "</td>";
					tr += "<td align='center'>" + rows[i].anoFab + "</td>";
					tr += "<td align='center'>" + rows[i].anoComp + "</td>";
					tr += "<td align='center'>" + rows[i].cargaMax + " Kg</td>";
					tr += "<td align='center'>" + rows[i].eixos + "</td>";
					tr += "<td align='center'>" + rows[i].cumprimento + " m</td>";
					tr += '</tr>' 
				}
				document.getElementById('tableVeiculos').innerHTML = tr;
			});
		});
}

function listarAgenda(){
	db.transaction(function(sel){
			sel.executeSql("SELECT * FROM agenda", [], function(sel, resultado){
				var rows = resultado.rows;
				var tr = '';
				for (var i = 0; i < rows.length; i++){
					tr += "<tr>";
					tr += "<td align='center'>" + rows[i].motorista + "</td>";
					tr += "<td align='center'>" + rows[i].veiculo + "</td>";
					tr += "<td align='center'>" + dataBr(rows[i].entrada) + "</td>";
					tr += "<td align='center'>" + dataBr(rows[i].saida) + "</td>";
					tr += "<td align='center'>" + rows[i].operacao + " Kg</td>";
					tr += '</tr>' 
				}
				document.getElementById('tableAgenda').innerHTML = tr;
			});
		});
}

function selMotorista(){
	db.transaction(function(sel){
			sel.executeSql("SELECT nome, sobrenome FROM usuarios", [], function(sel, resultado){
				var rows = resultado.rows;
				var opt = "<option value=''>Selecione um Motorista</option>";
				for (var i = 0; i < rows.length; i++){
					opt += "<option value='" + rows[i].nome + " " + rows[i].sobrenome + "'>" + rows[i].nome + " " +rows[i].sobrenome+ "</td>";
				}
				document.getElementById('selMotorista').innerHTML = opt;
			});
		});
}

function selVeiculos(){
	db.transaction(function(sel){
			sel.executeSql("SELECT placa FROM veiculos", [], function(sel, resultado){
				var rows = resultado.rows;
				var opt = "<option value=''>Selecione um Veículo</option>";
				for (var i = 0; i < rows.length; i++){
					opt += "<option value='" + rows[i].placa + "'>" + rows[i].placa + "</td>";
				}
				document.getElementById('selVeiculo').innerHTML = opt;
			});
		});
}

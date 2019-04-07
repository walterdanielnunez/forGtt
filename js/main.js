function loadPg(ref){
	var p = encodeURIComponent(ref);
	$('#pg').load('views/'+p+'.html');
}

window.onhashchange = function() {
var hash = window.location.hash.substr(1);
  loadPg(hash);
}

window.onload = function() {
var hash = window.location.hash.substr(1);
if(hash.length > 2){
	loadPg(hash);
}
  }

function go(p){
	location.hash = p;
}

function reload(){
var hash = window.location.hash.substr(1);
  loadPg(hash);
}

function dataBr(data){
		var d = data.toString();
		var p = d.split("-");
		return p[2]+"/"+p[1]+"/"+p[0];
	}

function CPF(obj){
	var cpf = obj.value;
	cpf=cpf.replace(/\D/g,"");
	cpf=cpf.replace(/(\d{3})(\d)/,"$1.$2");
	cpf=cpf.replace(/(\d{3})(\d)/,"$1.$2");
	cpf=cpf.replace(/(\d{3})(\d{1,2})$/,"$1-$2");
	obj.value = cpf;
}

function TEL(obj) {
	var tel = obj.value;
	tel=tel.replace(/\D/g,"");
	tel=tel.replace(/^(\d)/,"($1");
	tel=tel.replace(/(.{3})(\d)/,"$1)$2");
	tel=tel.replace(/(.{4})(\d)/,"$1 $2");
	if(tel.length == 9) {
		tel=tel.replace(/(.{1})$/,"-$1");
	} else if (tel.length == 10) {
		tel=tel.replace(/(.{2})$/,"-$1");
	} else if (tel.length == 11) {
			tel=tel.replace(/(.{3})$/,"-$1");
	} else if (tel.length == 12) {
			tel=tel.replace(/(.{4})$/,"-$1");
	} else if (tel.length > 12) {
			tel=tel.replace(/(.{4})$/,"-$1");
	}
				obj.value = tel;
}
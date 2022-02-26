var cpf = "000.000.00000";

console.log(formataCPF(cpf));

function formataCPF(cpf){
  //retira os caracteres indesejados...
  cpf = cpf.replace(/[^\d]/g, "");
  
  //realizar a formatação...
    return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
}
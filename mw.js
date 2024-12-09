
const time_array= ()=>{
  const d = new Date();
  return [d.getHours(), d.getMinutes(), d.getDate(), d.getMonth(), d.getFullYear()];
},
month_array= ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre", "Numa"],
zero_index_month_array= [0, ...month_array],
month_name= (m, bias=false)=>bias ? zero_index_month_array[m] : month_array[m],
time_string= (r)=>{
  const d = time_array();
  return `Esta es la ruta #${r}. Accediste el día ${d[2]} de ${month_name(d[3])} del ${d[4]}, a las ${d[0]}:${d[1]}`;
},
log_time=(r)=>{
  const d = time_array();
  return `Ruta #${r}, todo correcto @ ${d[4]}-${d[3]}-${d[2]}T${d[0]}:${d[1]} @ off${(new Date()).getTimezoneOffset()}`;
};

module.exports = {
  time_array, month_array, zero_index_month_array, month_name, time_string, log_time
};

module.exports = {
  time_array: ()=>{
    const d = new Date();
    return [d.getHours(), d.getMinutes(), d.getDate(), d.getMonth(), d.getYear()];
  },
  month_array: ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre", "Numa"],
  zero_index_month_array: [0, ...this.month_array],
  month_name: (m, bias=false)=>bias ? this.zero_index_month_array[m] : this.month_array[m],
  time_string: (r)=>{
    const d = this.time_array();
    return `Esta es la ruta #${r}. Accediste el día ${d[2]} de ${month_name(d[3])} del ${d[4]}, a las ${d[0]}:${d[1]}`;
  }
};
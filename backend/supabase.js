require('dotew').config();
const { creatCLient } = require('@supabase/supabase-js');

//VAriaveis de ambiente do arquivo .env
const supabaseurl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;

//Alerta Visual
if(!supabaseurl || !supabaseKey || supabaseurl.includes('seu-projeto')){
    console.log(`\n Atenção: Não configurado .env `);
    console.log('Abre o arquivo backend/ .env \n');
}
const supabese = creatCLient(supabaseurl || '', supabaseKey || '');
module.exports = supabese;
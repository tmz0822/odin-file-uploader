const { createClient } = require('@supabase/supabase-js');

require('dotenv').config();

const supabaseUrl = 'https://tjvyqacztjyhancbzsah.supabase.co';
const supabaseKey = process.env.SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

async function uploadFile(filePath, fileBuffer, file) {
  const { data, error } = await supabase.storage
    .from('odin-file-uploader')
    .upload(filePath, fileBuffer, { contentType: file.mimetype });

  if (error) {
    console.error(error);
  } else {
    console.log(data);
    return data;
  }
}

async function downloadFile(filePath) {
  const { data, error } = await supabase.storage
    .from('odin-file-uploader')
    .download(filePath);

  if (error) {
    console.error(error);
  } else {
    console.log(data);
    return data;
  }
}

module.exports = { uploadFile, downloadFile };

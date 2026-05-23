import { createClient } from "@supabase/supabase-js";

const secretkey="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlnbXd0ZmZsaHVyc3dvam1jZGJnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzk0MjY0NDQsImV4cCI6MjA5NTAwMjQ0NH0.9lERaO_BpjVGKijS6ooeo3yHZ5kbZK9H3rUpxfozhSM"
const url="https://igmwtfflhurswojmcdbg.supabase.co"

const supabase = createClient(url, secretkey)

export default function fileUpload(file){
    return new Promise((resolve,reject) => {
        if(file == null){
            reject("No file provided")
        }
        else{
            const timestamp=new Date().getTime()
            const filename=timestamp+"_"+file.name
            supabase.storage.from("pc-parts").upload(filename, file).then(
                () => {
                    const publicUrl = supabase.storage.from("pc-parts").getPublicUrl(filename).data.publicUrl
                    resolve(publicUrl)
                }
            ).catch((error) => {
                reject(error.message)
            })

        }
    })
}
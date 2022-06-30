const express=require('express')
const uploader=require('express-fileupload')
const app=express()
const {resolve,extname}=require('path')
const {
  promises:{
    writeFile,
    appendFile
  },existsSync
}=require('fs')
const port=3000
app.use('/',express.static('public'))
app.use('/',express.static('static'))
app.use(express.json())
app.use(express.urlencoded({urlencoded:true}))
app.use(uploader())

app.post('/api/upload', async (req, res) => {
  const {name, type, size, offset, hash,index} = req.body
  console.log(name, type, size, offset,index)
  const {file} = req.files
  const ext = extname(name)
  const filename = resolve(__dirname, `./static/${hash}${ext}`)
  if (offset > 0) {
    if (!existsSync(filename)) { // 如果文件意外不存在了，报错
      res.status(400)
        .send({message: '文件不存在'})
      return
    }
    /*
     * 先执行这里的，写入文件
     */
    await appendFile(filename, file.data)
    res.send({data: 'append'})
    return



  }
  await writeFile(filename, file.data)
  res.send({
    data: 'created',
  })
}
)

app.listen(port,()=>{
  console.log('servie running at',port)
})

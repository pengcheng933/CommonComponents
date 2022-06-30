const uploader=document.getElementById('uploader')
const output=document.getElementById('output')
const progress=document.getElementById('progress')


function read(file){

  const reader=new FileReader()
  return new Promise(((resolve, reject) => {
    reader.onload=function (){ // 读取成功返回
      resolve(reader.result)
    }
    reader.onerror=reject // 失败返回
    reader.readAsBinaryString(file) // 返回读取的字符串
  }))
}
/**
 * 最大请求限制
 * 多个网络请求并发执行
 * */
let  isDoneArr=[];
function multiRequest(uls,maxNum){
  const urlsClone=[...uls]
  let  isDoneArr=new Array(uls.length).fill(0) // 用于判断请求是否全部完成
  const  queueLimit=Math.min(maxNum,uls.length) // 计算最大限制数目
  const queue=[]
  /*初始化队列请求，并在此处限制长度*/
  while(enqueue(queue,uls.shift()) < queueLimit){}
  function request(queue,formData){
    console.log(formData.get('size'))
    return new Promise((async (resolve, reject) => {
      try {
        const result=await axios.post('/api/upload',formData)
        const i=urlsClone.indexOf(formData) // 上传的是哪个文件
        const hash=formData.get('hash') // 拿到hash标识
        localStorage.setItem(hash,i)// 保存上传的状态
        result[i]=formData
        isDoneArr[i]=1 // 修改状态数据为完成
        dequeue(queue,formData)
        resolve()
      }catch (err){
        console.warn("上传中遇到了问题")
        dequeue(queue,formData)
      }


    }))
  }
  /*
   * 移除，判定是否上传完成
   */
  function dequeue(queue=[],formData){
    progress.value += 1 // 当前上传到哪了
    queue.splice(queue.indexOf(formData),1) // 从queue中移除已完成请求
    if(uls.length){ // 如果还有未上传文件，继续上传
      enqueue(queue,uls.shift())
    }else { // 上传完成给出提示
      if(isDoneArr.indexOf(0)===-1){
        output.innerText='上传成功'
        progress.value=urlsClone.length
        localStorage.removeItem(formData.get('hash'))
      }
    }
  }
  /*
   * 请求入队的数据请求
   */
  function enqueue(queue=[],url){
    const len=queue.push(url) // 加入队列中
    request(queue,url) // 请求开始
    return len
  }
}

/*
 * 请求上传
 */

uploader.addEventListener('change',async (e)=>{
  output.innerText='上传中'
  const {files}=e.target
  const [file]=files
  if(!file){
    return
  }
  uploader.value=null // 上传提示为空
  const content=await read(file)
  const hash=CryptoJS.MD5(content)
  const {size,name,type}=file
  const chunkSize=64*1024
  let uploaded=0
  let index=0
  const axiosArr=[]
  while (uploaded<size){
    const chunk=file.slice(uploaded,uploaded+chunkSize,type) // file继承自blod,blod有方法slice,可对文件进行切片处理
    const formData=new FormData()
    formData.append('name',name)
    formData.append('type',type)
    formData.append('size',size)
    formData.append('hash',hash)
    formData.append('file',chunk)
    formData.append('offset',uploaded)
    formData.append('index',index)
    axiosArr.push(formData)
    index+=1
    uploaded +=chunk.size


  }
  const local=localStorage.getItem(hash)
  if(local){ // 如果存在说明有未上传成功的文件，找到失败文件继续上传
    const newDoneArr=[]
    isDoneArr.map((item,index)=>{
      if(item===0){
        newDoneArr.push(axiosArr[index])
      }
    })
    progress.max=newDoneArr.length-1
    progress.value=0
    multiRequest(newDoneArr,1)
  }else {
    progress.max=axiosArr.length-1
    progress.value=0
    multiRequest(axiosArr,1)
  }



})

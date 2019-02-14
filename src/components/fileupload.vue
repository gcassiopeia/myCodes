<template>
<form class="form-horizontal">
  <div class="form-group" style="margin-left: 25px">
    <label for="filesUpload" class="col-sm-1 control-label">文件夹上传</label>
    <div class="col-sm-2">
      <input type="file" id="filesUpload" ref="filesUpload" webkitdirectory=""  name="files">
    </div>
    <div class="col-sm-2">
      <button @click="filesUpload" class="">上传文件夹</button>
    </div>
  </div>
  <div class="form-group" style="margin-left: 25px">
    <label for="fileUpload" class="col-sm-1 control-label">文件上传</label>
    <div class="col-sm-2">
      <input type="file" id="fileUpload" ref="fileUpload" name="files">
    </div>
    <div class="col-sm-2">
      <button @click="fileUpload" class="">上传文件</button>
    </div>
  </div>
</form>
</template>
<script>
    export default{
      data: function () {
        return {
          server:this.GLOBAL.serverSrc,
        }
      }
      ,
      methods:{
        filesUpload: function () {
          let formData=new FormData();
          formData.append('files',this.$refs.filesUpload.value);
          this.$ajax.post('http://'+this.server +':8084/file/batchUpload',formData).then(res =>{
            console.log(res)

          }).catch(error => {
            console.log(error)
          })
//          this.instance.post('/file/batchUpload',formData).then(res => {
//              console.log(res)
//    }).catch(error => {
//              console.log(error)
//    })

        },
        fileUpload: function () {
          let formData=new FormData();
          formData.append('files',this.$refs.fileUpload.value);
          console.log(this.$refs.fileUpload.value)
          this.$ajax.post('http://'+this.server +':8084/file/singleUpload',formData).then(res =>{
            console.log(res)

          }).catch(error => {
            console.log(error)
          })
        }
      }
    }
</script>
<style scoped>

</style>

<template>
  <div>
    <div class="uploadBox">
      <h3>上传文件夹</h3>
      <div class="fileBox">
        <input type="file" id="myFiles" class="inputfile" webkitdirectory="" @change="filesUpload($event)">
        <label for="myFiles">
          点击上传本地文件夹
        </label>
      </div>
      <ul class="files">
        <li v-for="(file, index) in files">
          <div class="fileInfo">

            <div class="fileName filePart">
              {{ file.name }}
            </div>
            <div class="fileSize filePart ml10">
              {{file.size}}
            </div>
            <!--进度条-->
            <div class="progress">
              <span :style="{width:file.uploadPercentage,backgroundColor:file.uploadStatus==1 ||file.uploadStatus==2?'':'red'}"></span>
            </div>
            <div class="fileStatus">
              <span v-if="file.uploadStatus == -1" class="uploadFail">出错啦，请重新上传或者删除</span>
              <span v-if="file.uploadStatus == 2" class="uploadSuccess"> 已上传</span>
              <span v-if="file.uploadStatus == 1" class="uploadSuccess"> 上传中...</span>
              <span v-if="file.uploadStatus == -2" class="uploadFail">出错啦，文件类型不符合要求</span>
              <span v-if="file.uploadStatus == -3" class="uploadFail">出错啦，文件大小超出限制</span>
            </div>
          </div>
        </li>
      </ul>
    </div>
    <div class="uploadBox">
      <h3>上传文件</h3>
      <div class="fileBox">
        <input type="file" id="myFile" class="inputfile" @change="fileUpload($event)">
        <label for="myFile">
          点击上传本地文件
        </label>
      </div>
      <ul class="file">
        <li v-for="(file, index) in file">
          <div class="fileInfo">

            <div class="fileName filePart">
              {{ file.name }}
            </div>
            <div class="fileSize filePart ml10">
              {{file.size}}
            </div>
            <!--进度条-->
            <div class="progress">
              <span :style="{width:file.uploadPercentage,backgroundColor:file.uploadStatus==1 ||file.uploadStatus==2?'':'red'}"></span>
            </div>
            <div class="fileStatus">
              <span v-if="file.uploadStatus == -1" class="uploadFail">出错啦，请重新上传或者删除</span>
              <span v-if="file.uploadStatus == 2" class="uploadSuccess"> 已上传</span>
              <span v-if="file.uploadStatus == 1" class="uploadSuccess"> 上传中...</span>
              <span v-if="file.uploadStatus == -2" class="uploadFail">出错啦，文件类型不符合要求</span>
              <span v-if="file.uploadStatus == -3" class="uploadFail">出错啦，文件大小超出限制</span>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
  <!--<div>-->
    <!--<form class="form-horizontal">-->
      <!--<div class="form-group" style="margin-left: 25px">-->
        <!--<label for="filesUpload" class="col-sm-1 control-label">上传文件夹</label>-->
        <!--<div class="col-sm-2">-->
          <!--<input type="file" id="filesUpload" webkitdirectory=""  name="files" @change="filesUpload($event)">-->
        <!--</div>-->
        <!--<ul>-->
          <!--<li v-for="(file, index) in files">-->
            <!--<div>-->
              <!--{{file.name}}-->
            <!--</div>-->
            <!--<div>-->
              <!--{{file.size}}-->
            <!--</div>-->
            <!--&lt;!&ndash; 进度条&ndash;&gt;-->
            <!--<div class="progress">-->
              <!--<span :style="{width:file.uploadPercentage,backgroundColor:file.uploadStatus==1 ||file.uploadStatus==2?'':'red'}"></span>-->
            <!--</div>-->
            <!--<div class="fileStatus">-->
              <!--<span v-if="file.uploadStatus == -1" class="uploadFail">出错啦，请重新上传或者删除</span>-->
              <!--<span v-if="file.uploadStatus == 2" class="uploadSuccess"> 已上传</span>-->
              <!--<span v-if="file.uploadStatus == 1" class="uploadSuccess"> 上传中...</span>-->
              <!--<span v-if="file.uploadStatus == -2" class="uploadFail">出错啦，文件类型不符合要求</span>-->
              <!--<span v-if="file.uploadStatus == -3" class="uploadFail">出错啦，文件大小超出限制</span>-->
            <!--</div>-->
          <!--</li>-->
        <!--</ul>-->
      <!--</div>-->
    <!--</form>-->
  <!--</div>-->
</template>
<script>
    export default{
      data: function () {
        return {
          server:this.GLOBAL.serverSrc,
          files:[],
          file:[]
        }
      },
      methods:{
        filesUpload: function (e) {
          let tFiles = e.target.files;
          let len = tFiles.length;
          for(var i = 0; i < len; i ++){
            var item = {
              name: tFiles[i].name,
              uploadPercentage: 1,
              size : this.formatFileSize(tFiles[i].size, 0),
              uploadStatus : 0
            }
            this.files.push(item)

            let files = new FormData();
            files.append("name","tcc");
            files.append("files",tFiles[i])
            if( !this.checkFileSize(tFiles[i].size)){
              item.uploadStatus = -3;
              return false;
            }
//            if (!this.checkFileType(tFiles[i].name.split('.')[1])) {
//              item.uploadStatus = -2;
//              return false;
//            }

            //axios上传
            let config = {
              //添加请求头
              headers: {
                "Content-Type": "multipart/form-data"
              },
              //添加上传进度监听事件
              onUploadProgress: e => {
              var completeProgress = ((e.loaded / e.total * 100) | 0) + "%";
              console.log(this.files)
              item.uploadPercentage = completeProgress;
            }
          };
          this.$ajax.post('http://'+this.server +':8084/file/batchUpload', files, config).then(function (
            response) {
            console.log(response);
            item.uploadStatus = 2;
          }).catch(function (error) {
            console.log(error);
            item.uploadStatus = -1;
          });
          }
        },
        fileUpload: function (e) {
          let tFile = e.target.files[0];
          var item = {
              name: tFile.name,
              uploadPercentage: 1,
              size : this.formatFileSize(tFile.size, 0),
              uploadStatus : 0
          }
          this.file.push(item)

            let files = new FormData();
            files.append("name","tcc");
            files.append("files",tFile)
            if( !this.checkFileSize(tFile.size)){
              item.uploadStatus = -3;
              return false;
            }
//            if (!this.checkFileType(tFiles[i].name.split('.')[1])) {
//              item.uploadStatus = -2;
//              return false;
//            }

            //axios上传
            let config = {
              //添加请求头
              headers: {
                "Content-Type": "multipart/form-data"
              },
              //添加上传进度监听事件
              onUploadProgress: e => {
                var completeProgress = ((e.loaded / e.total * 100) | 0) + "%";
                console.log(this.files)
                item.uploadPercentage = completeProgress;
              }
            };
            this.$ajax.post('http://'+this.server +':8084/file/singleUpload', files, config).then(function (
              response) {
              console.log(response);
              item.uploadStatus = 2;
            }).catch(function (error) {
              console.log(error);
              item.uploadStatus = -1;
            });

        },
      formatFileSize: function (fileSize, idx) {
        var units = ["B", "KB", "MB", "GB"];
        idx = idx || 0;
        if (fileSize < 1024 || idx === units.length - 1) {
          return fileSize.toFixed(1) +
            units[idx];
        }
        return this.formatFileSize(fileSize / 1024, ++idx);
      },
//      checkFileType: function (fileType) {
//        const acceptTypes = ['xls', 'doc', 'jpg'];
//        for (var i = 0; i < acceptTypes.length; i++) {
//          if (fileType === acceptTypes[i]) {
//            return true;
//          }
//        }
//        return false;
//      },
      checkFileSize: function (fileSize) {
        //2M
        const MAX_SIZE = 20 * 1024 * 1024;
        if (fileSize > MAX_SIZE) {
          return false;
        }
        return true;
      }
      },
      components:{
      }
    }
</script>
<style scoped>
  li {
    list-style: none;
  }

  .uploadBox {
    width: 400px;
    border: 1px solid #ccc;
    margin: 100px auto;
  }

  .fileBox,
  .fileInfo {
    margin: 16px;
    height: 60px;
    line-height: 60px;
    border: 1px solid #ccc;
    padding-left: 16px;
    font-size: 16px;
  }

  .inputfile {
    width: 0.1px;
    height: 0.1px;
    opacity: 0;
    overflow: hidden;
    position: absolute;
    z-index: -1;
  }

  /*E + F 毗邻元素选择器，匹配所有紧随E元素之后的同级元素F*/

  .inputfile+label {
    color: #3e97df;
    display: inline-block;
  }

  .inputfile:focus+label,
  .inputfile+label:hover {
    color: #0c89f0;
  }

  h3 {
    padding: 10px 0 0 16px;
    font-weight: normal;
    font-size: 18px;
    color: #666;
  }

  .filePart {
    line-height: 30px;
    overflow: hidden;
    float: left;
    text-overflow: ellipsis;
    white-space: nowrap;
    font-size: 12px;
    height: 30px;
  }

  .fileStatus {
    overflow: hidden;
    float: left;
    height: 20px;
    font-size: 10px;
    line-height: 20px;
  }

  .ml10 {
    margin-left: 10px;
  }

  .fileName {
    width: 200px;
  }

  .fileSize {
    width: 120px;
    text-align: center;
  }

  .uploadFail {
    color: #ff0800d3;
  }

  .uploadSuccess {
    color: #2c832c;
  }

  /*对应CSS*/

  .progress {
    position: relative;
    width: 80%;
    height: 8px;
    border: 1px solid #ccc;
    border-radius: 5px;
    overflow: hidden;
    /*注意这里*/
    box-shadow: 0 0 1px 0px #ddd inset;
  }

  .progress span {
    position: absolute;
    display: inline-block;
    width: 10%;
    height: 100%;
    background-color: #3e97df;
    margin-left: -140px;
  }

</style>

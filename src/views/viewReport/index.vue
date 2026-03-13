<template>
  <div class="viewReport">
    <!-- <iframe
      ref="pdfCotainer"
      :src="pdfUrl"
      width="100%"
      class="pdfCotainer"
    ></iframe> -->
    <!-- <div class="mask" v-if="isWeiXin && isAndroidPhone">
      <div class="tips">1、点击右上角图标 ···</div>
      <div class="tips">2、选择 "在浏览器中" 打开</div>
    </div> -->
    <div class="big">
      <div class="btn_box">
        <el-button
          type="success"
          size="mini"
          plain
          v-if="$route.name == 'viewReport'"
          @click="handleDownloadNamePdf"
          >下载PDF</el-button
        >
      </div>
      <div id="demo" ref="demo"></div>
    </div>
    <div class="loading" v-if="loading">
      <el-table
        class="loadingone"
        v-loading="loading"
        element-loading-text="拼命加载报告中"
        element-loading-spinner="el-icon-loading"
        element-loading-background="rgba(0, 0, 0, 0.8)"
        style="width: 100%"
      >
      </el-table>
    </div>
  </div>
</template>
  
  <script>
import api from "@/api/index";
import Pdfh5 from "pdfh5";

export default {
  data() {
    return {
      pdfUrl: "",
      numPages: null, // pdf 总页数
      loading: true,
      pdfh5: null,
      isWeiXin: true,
      isAndroidPhone: false,
      isiOSPhone: false,
      downloadName: "",
      downloadUrl: "",
      currentPerson: null,
      customercode: "",
      fileonlineurl: "",
      pdfBase64Data: null, // 保存PDF的base64数据用于下载
      pdfBlobData: null, // 保存PDF的Blob数据用于下载
    };
  },

  created() {
    // 在created中检测设备类型，确保计算属性能正确显示
    this.getIsWxClient();
    this.isAndroidPhone = this.isAndroid();
    this.isiOSPhone = this.isiOS();
  },
  computed: {
    // 动态计算下载按钮文字
    
  },
  async mounted() {
    let printFlag = this.$route.query && this.$route.query.printFlag;
    let regid = this.$route.query && this.$route.query.regid;
    this.customercode = this.$route.query && this.$route.query.customercode;
    let res = await api.home.getPersonalDetail({
      regid,
      customercode: this.customercode,
    });
    // 设备检测已在created中完成
    if (!res.data.result) {
      this.$toast.fail(res.data.message || "获取个人信息失败");
      return;
    }
    this.currentPerson = res.data.result;
    if (!printFlag) {
      this.$router.go(-1);
    }
    if (printFlag == "体格检查表") {
      this.handleViewGuideSingGyey(); // 广医二院
      // this.handleViewGuideSingYzzyy(); // 宜章中医院
      return;
    } else if (printFlag == "个人报告书") {
      this.handleViewReportGyey(); // 广医二院
      // this.handleViewReportYzzyy(); // 宜章中医院
      return;
    }
  },
  methods: {
    gopfg() {
      let temApp = this.$refs.demo;
      html2canvas(temApp).then((canvas) => {
        // 生成 PDF
        const doc = new jsPDF("p", "pt", [canvas.width, canvas.height]);
        console.log(doc);
        const imgData = canvas.toDataURL("image/jpeg", 1.0);
        doc.addImage(imgData, "JPEG", 0, 0, canvas.width, canvas.height);
        doc.save("example.pdf");
      });
    },
    getIsWxClient() {
      const ua = navigator.userAgent.toLowerCase();

      if (ua.match(/MicroMessenger/i) == "micromessenger") {
        this.isWeiXin = true;
      } else {
        this.isWeiXin = false;
      }
    },
    // 判断当前设备是否为Android手机
    isAndroid() {
      return /Android/i.test(navigator.userAgent);
    },

    // 判断当前设备是否为iOS（苹果）手机
    isiOS() {
      return /(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent);
    },
    // base64转Blob
    base64ToBlob(base64, type = "application/pdf") {
      const binary = atob(base64.replace(/[\n\r]/g, ""));
      const len = binary.length;
      const buffer = new ArrayBuffer(len);
      const view = new Uint8Array(buffer);
      for (let i = 0; i < len; i++) {
        view[i] = binary.charCodeAt(i);
      }
      return new Blob([view], { type: type });
    },
    async handleDownloadNamePdf() {
      // 检查PDF数据是否准备好
      if (!this.pdfBase64Data && !this.downloadUrl) {
        this.$toast.fail("PDF数据未准备好，请稍后重试");
        console.error("PDF数据为空");
        return;
      }

      console.log("开始下载，文件名:", this.downloadName);
      console.log("是否微信:", this.isWeiXin, "是否安卓:", this.isAndroidPhone);

      try {
        let blob;

        // 优先使用已保存的base64数据创建Blob
        if (this.pdfBase64Data) {
          blob = this.base64ToBlob(this.pdfBase64Data);
          console.log("使用base64数据创建Blob");
        } else if (this.pdfBlobData) {
          blob = this.pdfBlobData;
          console.log("使用已保存的Blob数据");
        } else {
          // 降级：从URL获取
          const response = await fetch(this.downloadUrl);
          blob = await response.blob();
          console.log("从URL获取Blob");
        }

        // 安卓微信端特殊处理
        if (this.isWeiXin && this.isAndroidPhone) {
          await this.downloadPdfForAndroidWechat(blob);
          return;
        }

        // iOS或其他浏览器标准下载方式
        this.downloadPdfStandard(blob);
      } catch (err) {
        console.error("下载失败:", err);
        this.$toast.fail("下载失败，请重试");
      }
    },
    // 标准下载方式（iOS、非微信浏览器）
    downloadPdfStandard(blob) {
      // 创建Blob URL
      const blobUrl = window.URL.createObjectURL(blob);

      // 创建下载链接
      const a = document.createElement("a");
      a.href = blobUrl;
      a.download = this.downloadName || "体检报告.pdf";
      a.style.display = "none";
      document.body.appendChild(a);

      // 触发点击
      a.click();

      // 延迟清理
      setTimeout(() => {
        document.body.removeChild(a);
        window.URL.revokeObjectURL(blobUrl);
      }, 100);

      this.$toast.success("开始下载...");
      console.log("标准下载触发成功");
    },
    // 安卓微信端PDF下载处理 - 自动跳转浏览器下载
    async downloadPdfForAndroidWechat(blob) {
      // 方案1：如果有在线文件URL，直接跳转浏览器下载（最自然）
      if (this.fileonlineurl) {
        this.$toast.success("正在跳转浏览器下载...");
        // 延迟跳转，让用户看到提示
        setTimeout(() => {
          // 使用 location.href 跳转，安卓会自动选择浏览器打开
          window.location.href = this.fileonlineurl;
        }, 500);
        return;
      }

      // 方案2：使用 Blob URL 跳转（如果上面的URL不可用）
      try {
        this.$toast.success("正在准备下载...");
        const blobUrl = window.URL.createObjectURL(blob);

        // 创建临时 a 标签触发下载
        const a = document.createElement("a");
        a.href = blobUrl;
        a.download = this.downloadName || "体检报告.pdf";
        a.style.display = "none";
        document.body.appendChild(a);
        a.click();

        // 清理
        setTimeout(() => {
          document.body.removeChild(a);
          window.URL.revokeObjectURL(blobUrl);
          this.$toast.clear();
          this.$toast.success("已开始下载");
        }, 1000);
      } catch (err) {
        this.$toast.clear();
        console.error("下载失败:", err);
        // 最终降级：提示用户
        this.showOpenInBrowserTip();
      }
    },
    // 显示在浏览器中打开的提示
    showOpenInBrowserTip() {
      this.$dialog
        .confirm({
          title: "下载提示",
          message: '微信内无法直接下载PDF，请点击右上角菜单，选择"在浏览器中打开"进行下载',
          confirmButtonText: "知道了",
          showCancelButton: false,
          confirmButtonColor: "#1989fa",
        })
        .then(() => {})
        .catch(() => {});
    },
    // // 查看报告的点击事件
    async handleViewReportGyey() {
      let CurrentPerson = this.currentPerson;
      // let CurrentPerson = JSON.parse(localStorage.getItem("currentData")) || "";
      console.log(CurrentPerson);
      if (!CurrentPerson) return;
      const { data } = await api.home.View_report({
        fingercode: "",
        codes: [CurrentPerson.regid],
        repname: "1、F报告书",
        // designtype: "fast",
        // filetype: "pdf",
        // outtype: "url",
        usesysrepname: true,
        whereitems: [],
        customercode: this.customercode,
      });

      this.loading = false;
      let downloadName = `${this.GLOBAL.codes}-${this.GLOBAL.names}`;
      this.downloadName = `${CurrentPerson.regid}-${CurrentPerson.name}`;
      // let url = data.data[0].fileurl;
      let code = data.data[0].base64String.replace(/[\n\r]/g, "");
      // 保存base64数据用于下载
      this.pdfBase64Data = data.data[0].base64String;
      let raw = window.atob(code);
      let rawLength = raw.length; //转换成pdf.js能直接解析的Uint8Array类型
      let uInt8Array = new Uint8Array(rawLength);
      for (let i = 0; i < rawLength; ++i) {
        uInt8Array[i] = raw.charCodeAt(i);
      }
      // 保存Blob数据用于下载
      this.pdfBlobData = new Blob([uInt8Array], { type: "application/pdf" });
      let url = window.URL.createObjectURL(this.pdfBlobData);
      this.downloadUrl = url;
      this.fileonlineurl = data.data[0].fileonlineurl;
      // let result = await api.home.getFiles({
      //   ic: "48b1ab26-1314-4c1f-b357-5d8c263a902f",
      // });
      // let result = await api.home.getFiles({ic:data.data[0].fileid});
      // console.log(result);
      //实例化
      this.pdfh5 = new Pdfh5("#demo", {
        data: uInt8Array,
        pdfurl: url,
      });
      // this.pdfh5 = new Pdfh5("#demo", {
      //   data: uInt8Array,
      // });
      //   this.pdfh5.download(downloadName, () => {});
      //监听完成事件
      this.pdfh5.on("complete", function (status, msg, time) {
        console.log(
          "状态：" +
            status +
            "，信息：" +
            msg +
            "，耗时：" +
            time +
            "毫秒，总页数：" +
            this.totalNum
        );
      });
      localStorage.setItem(
        "dlMessage",
        JSON.stringify({
          regid: CurrentPerson.regid,
          name: CurrentPerson.name,
          repname: "1、报告书",
        })
      );
      localStorage.setItem("fileurl", data.data[0].fileurl);
      //   this.pdfUrl = data.data[0].fileurl;
      //   const url = data.data[0].fileurl;
      //   const link = document.createElement("a");
      //   link.href = url;
      //   link.download = `${this.GLOBAL.codes}-${this.GLOBAL.names}`; //下载文件regid以及文件名字
      //   document.body.appendChild(link);
      //   link.click();
      //   document.body.removeChild(link);
    },
    // // 查看体格检查表的点击事件
    async handleViewGuideSingGyey() {
      // let CurrentPerson = JSON.parse(localStorage.getItem("currentData")) || "";
      let CurrentPerson = this.currentPerson;
      if (!CurrentPerson) return;
      let repname = "1、体格检查表";
      if (CurrentPerson.meccode == "0" || CurrentPerson.checktype == "2") {
        repname = "1、体格检查表H5";
      }
      const { data } = await api.home.View_report({
        fingercode: "",
        codes: [CurrentPerson.regid],
        repname,
        // filetype: "pdf",
        // outtype: "url",
        whereitems: [
          {
            key: "regid",
            value: CurrentPerson.regid,
          },
        ],
        customercode: this.customercode,
      });

      this.loading = false;
      let downloadName = `${this.GLOBAL.codes}-${this.GLOBAL.names}`;
      this.downloadName = `${CurrentPerson.regid}-${CurrentPerson.name}`;
      let code = data.data[0].base64String.replace(/[\n\r]/g, "");
      // 保存base64数据用于下载
      this.pdfBase64Data = data.data[0].base64String;
      let raw = window.atob(code);
      let rawLength = raw.length; //转换成pdf.js能直接解析的Uint8Array类型
      let uInt8Array = new Uint8Array(rawLength);
      for (let i = 0; i < rawLength; ++i) {
        uInt8Array[i] = raw.charCodeAt(i);
      }
      // 保存Blob数据用于下载
      this.pdfBlobData = new Blob([uInt8Array], { type: "application/pdf" });
      let url = window.URL.createObjectURL(this.pdfBlobData);
      //实例化
      this.pdfh5 = new Pdfh5("#demo", {
        data: uInt8Array,
        pdfurl: url,
      });
      //   this.pdfh5.download(downloadName, () => {});
      //监听完成事件
      this.pdfh5.on("complete", function (status, msg, time) {
        console.log(
          "状态：" +
            status +
            "，信息：" +
            msg +
            "，耗时：" +
            time +
            "毫秒，总页数：" +
            this.totalNum
        );
      });
      localStorage.setItem("fileurl", data.data[0].fileurl);
      //   this.pdfUrl = data.data[0].fileurl;
      //   const url = data.data[0].fileurl;
      //   const link = document.createElement("a");
      //   link.href = url;
      //   link.download = `${this.GLOBAL.codes}-${this.GLOBAL.names}`; //下载文件regid以及文件名字
      //   document.body.appendChild(link);
      //   link.click();
      //   document.body.removeChild(link);
    },
    async handleViewGuideSingYzzyy() {
      let CurrentPerson = JSON.parse(localStorage.getItem("currentData")) || "";
      if (!CurrentPerson) return;
      let repname = "1、体格检查表";
      if (CurrentPerson.meccode == "0" || CurrentPerson.checktype == "2") {
        repname = "1、体格检查表H5";
      }
      const { data } = await api.home.View_report({
        fingercode: "",
        codes: [CurrentPerson.regid],
        repname: "1、梅州检查表",
        // repname,
        // filetype: "pdf",
        // outtype: "url",
        whereitems: [
          {
            key: "regid",
            value: CurrentPerson.regid,
          },
        ],
        customercode: this.customercode,
      });

      this.loading = false;
      let downloadName = `${this.GLOBAL.codes}-${this.GLOBAL.names}`;
      let code = data.data[0].base64String.replace(/[\n\r]/g, "");
      // 保存base64数据用于下载
      this.pdfBase64Data = data.data[0].base64String;
      let raw = window.atob(code);
      let rawLength = raw.length; //转换成pdf.js能直接解析的Uint8Array类型
      let uInt8Array = new Uint8Array(rawLength);
      for (let i = 0; i < rawLength; ++i) {
        uInt8Array[i] = raw.charCodeAt(i);
      }
      // 保存Blob数据用于下载
      this.pdfBlobData = new Blob([uInt8Array], { type: "application/pdf" });
      //实例化
      this.pdfh5 = new Pdfh5("#demo", {
        data: uInt8Array,
      });
      //   this.pdfh5.download(downloadName, () => {});
      //监听完成事件
      this.pdfh5.on("complete", function (status, msg, time) {
        console.log(
          "状态：" +
            status +
            "，信息：" +
            msg +
            "，耗时：" +
            time +
            "毫秒，总页数：" +
            this.totalNum
        );
      });
      localStorage.setItem("fileurl", data.data[0].fileurl);
      //   this.pdfUrl = data.data[0].fileurl;
      //   const url = data.data[0].fileurl;
      //   const link = document.createElement("a");
      //   link.href = url;
      //   link.download = `${this.GLOBAL.codes}-${this.GLOBAL.names}`; //下载文件regid以及文件名字
      //   document.body.appendChild(link);
      //   link.click();
      //   document.body.removeChild(link);
    },
    async handleViewReportYzzyy() {
      let CurrentPerson = JSON.parse(localStorage.getItem("currentData")) || "";
      if (!CurrentPerson) return;
      let repname = "";
      if (CurrentPerson.checktype == 1) {
        repname = `1、F报告书`;
      } else if (CurrentPerson.checktype == 2) {
        repname = `1、F报告书`;
      } else if (CurrentPerson.checktype == 3) {
        repname = `1、民兵体格检查表`;
      } else if (CurrentPerson.checktype == 4) {
        repname = `1、教师体格检查表`;
      } else if (CurrentPerson.checktype == 5) {
        repname = `1、F团体报告书`;
      } else if (CurrentPerson.checktype == 6) {
        repname = `1、体格检查表`;
      } else if (CurrentPerson.checktype == 7) {
        repname = `1、乡村健康体检表`;
      } else if (CurrentPerson.checktype == 8) {
        repname = `1、入学体检表`;
      } else {
        repname = `1、F报告书`;
      }
      const { data } = await api.home.View_report({
        fingercode: "",
        codes: [CurrentPerson.regid],
        repname: "1、梅州报告书",
        // repname,
        designtype:
          repname.split("、")[1].substr(0, 1) === "F" ? "fast" : "dev",
        // filetype: "pdf",
        // outtype: "url",
        whereitems: [],
        customercode: this.customercode,
      });

      this.loading = false;
      let downloadName = `${this.GLOBAL.codes}-${this.GLOBAL.names}`;
      let code = data.data[0].base64String.replace(/[\n\r]/g, "");
      // 保存base64数据用于下载
      this.pdfBase64Data = data.data[0].base64String;
      let raw = window.atob(code);
      let rawLength = raw.length; //转换成pdf.js能直接解析的Uint8Array类型
      let uInt8Array = new Uint8Array(rawLength);
      for (let i = 0; i < rawLength; ++i) {
        uInt8Array[i] = raw.charCodeAt(i);
      }
      // 保存Blob数据用于下载
      this.pdfBlobData = new Blob([uInt8Array], { type: "application/pdf" });
      //实例化
      this.pdfh5 = new Pdfh5("#demo", {
        data: uInt8Array,
      });
      //   this.pdfh5.download(downloadName, () => {});
      //监听完成事件
      this.pdfh5.on("complete", function (status, msg, time) {
        console.log(
          "状态：" +
            status +
            "，信息：" +
            msg +
            "，耗时：" +
            time +
            "毫秒，总页数：" +
            this.totalNum
        );
      });
      localStorage.setItem("fileurl", data.data[0].fileurl);
      //   this.pdfUrl = data.data[0].fileurl;
      //   const url = data.data[0].fileurl;
      //   const link = document.createElement("a");
      //   link.href = url;
      //   link.download = `${this.GLOBAL.codes}-${this.GLOBAL.names}`; //下载文件regid以及文件名字
      //   document.body.appendChild(link);
      //   link.click();
      //   document.body.removeChild(link);
    },
  },
};
</script>
  <style lang="scss" scoped>
.viewReport {
  width: 100%;
  height: calc(100% - 95px);
  box-sizing: border-box;
  padding-bottom: 50px;
  .big {
    height: 100%;
    .btn_box {
      height: 40px;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
  .pdfCotainer {
    width: 100%;
    height: 100%;
  }
  //   #demo {
  //     width: 100%;
  //     height: 100%;
  //   }
}
.loading {
  width: 100%;
  height: 100%;
  /* background: red; */
  position: fixed;
  z-index: 10;
  left: 0;
  top: 0;
}

.loadingone {
  height: 100%;
}
.mask {
  width: 100%;
  height: 100vh;
  background-color: #666666;
  padding-top: 30%;
  z-index: 999;
}
.mask .tips {
  color: #ffffff;
  text-align: center;
  margin-bottom: 20px;
  font-size: 16px;
  font-weight: 600;
}
.button {
  width: 90%;
  padding: 5%;
}
</style>
  
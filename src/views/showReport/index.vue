<template>
  <div class="showReport">
    <div class="big">
      <div class="btn_box" v-if="!loading">
        <el-button
          type="success"
          size="mini"
          plain
          @click="handleDownloadPdf"
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
import { getFiles } from "@/api/reservation";
import Pdfh5 from "pdfh5";

export default {
  name: "ShowReport",
  data() {
    return {
      loading: true,
      pdfh5: null,
      regid: "",
      fileid: "",
      name: "",
      pdfBase64Data: null,
      pdfBlobData: null,
      isWeiXin: false,
      isAndroidPhone: false,
      isiOSPhone: false,
      downloadName: "",
      fileonlineurl: "",
    };
  },

  created() {
    this.regid = this.$route.query && this.$route.query.regid;
    this.fileid = this.$route.query && this.$route.query.fileid;
    this.name = this.$route.query && this.$route.query.name;
    this.downloadName = this.name ? `${this.name}.pdf` : "体检报告.pdf";
    
    this.getIsWxClient();
    this.isAndroidPhone = this.isAndroid();
    this.isiOSPhone = this.isiOS();
  },

  async mounted() {
    if (!this.fileid) {
      this.$toast.fail("缺少文件参数");
      this.loading = false;
      return;
    }
    await this.loadPdfFile();
  },

  methods: {
    getIsWxClient() {
      const ua = navigator.userAgent.toLowerCase();
      this.isWeiXin = ua.match(/MicroMessenger/i) == "micromessenger";
    },

    isAndroid() {
      return /Android/i.test(navigator.userAgent);
    },

    isiOS() {
      return /(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent);
    },

    async loadPdfFile() {
      try {
        const { data } = await getFiles({ id: this.fileid });
        console.log("PDF数据", data);
        if (!data || !data.data) {
          this.$toast.fail("获取文件失败");
          this.loading = false;
          return;
        }

        let base64String = data.data.base64String || data.data;
        if (typeof base64String === "string") {
          base64String = base64String.replace(/[\n\r]/g, "");
          this.pdfBase64Data = base64String;
          this.fileonlineurl = data.data.fileonlineurl || "";
          
          const raw = window.atob(base64String);
          const rawLength = raw.length;
          const uInt8Array = new Uint8Array(rawLength);
          for (let i = 0; i < rawLength; ++i) {
            uInt8Array[i] = raw.charCodeAt(i);
          }
          
          this.pdfBlobData = new Blob([uInt8Array], { type: "application/pdf" });
          const url = window.URL.createObjectURL(this.pdfBlobData);

          this.pdfh5 = new Pdfh5("#demo", {
            data: uInt8Array,
            pdfurl: url,
          });

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
        }
      } catch (err) {
        console.error("加载PDF失败:", err);
        this.$toast.fail("加载PDF失败");
      } finally {
        this.loading = false;
      }
    },

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

    async handleDownloadPdf() {
      if (!this.pdfBase64Data && !this.pdfBlobData) {
        this.$toast.fail("PDF数据未准备好，请稍后重试");
        console.error("PDF数据为空");
        return;
      }

      console.log("开始下载，文件名:", this.downloadName);
      console.log("是否微信:", this.isWeiXin, "是否安卓:", this.isAndroidPhone);

      try {
        let blob;

        if (this.pdfBase64Data) {
          blob = this.base64ToBlob(this.pdfBase64Data);
          console.log("使用base64数据创建Blob");
        } else if (this.pdfBlobData) {
          blob = this.pdfBlobData;
          console.log("使用已保存的Blob数据");
        }

        if (this.isWeiXin && this.isAndroidPhone) {
          await this.downloadPdfForAndroidWechat(blob);
          return;
        }

        this.downloadPdfStandard(blob);
      } catch (err) {
        console.error("下载失败:", err);
        this.$toast.fail("下载失败，请重试");
      }
    },

    downloadPdfStandard(blob) {
      const blobUrl = window.URL.createObjectURL(blob);

      const a = document.createElement("a");
      a.href = blobUrl;
      a.download = this.downloadName;
      a.style.display = "none";
      document.body.appendChild(a);

      a.click();

      setTimeout(() => {
        document.body.removeChild(a);
        window.URL.revokeObjectURL(blobUrl);
      }, 100);

      this.$toast.success("开始下载...");
      console.log("标准下载触发成功");
    },

    async downloadPdfForAndroidWechat(blob) {
      if (this.fileonlineurl) {
        this.$toast.success("正在跳转浏览器下载...");
        setTimeout(() => {
          window.location.href = this.fileonlineurl;
        }, 500);
        return;
      }

      try {
        this.$toast.success("正在准备下载...");
        const blobUrl = window.URL.createObjectURL(blob);

        const a = document.createElement("a");
        a.href = blobUrl;
        a.download = this.downloadName;
        a.style.display = "none";
        document.body.appendChild(a);
        a.click();

        setTimeout(() => {
          document.body.removeChild(a);
          window.URL.revokeObjectURL(blobUrl);
          this.$toast.clear();
          this.$toast.success("已开始下载");
        }, 1000);
      } catch (err) {
        this.$toast.clear();
        console.error("下载失败:", err);
        this.showOpenInBrowserTip();
      }
    },

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
  },
};
</script>

<style lang="scss" scoped>
.showReport {
  width: 100%;
  height: 100vh;
  box-sizing: border-box;

  .big {
    height: 100%;

    .btn_box {
      height: 40px;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
}

.loading {
  width: 100%;
  height: 100%;
  position: fixed;
  z-index: 10;
  left: 0;
  top: 0;
}

.loadingone {
  height: 100%;
}
</style>

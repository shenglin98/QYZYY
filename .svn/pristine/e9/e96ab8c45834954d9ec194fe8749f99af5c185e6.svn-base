import api from '../../api/index'

export default {
    components: {

    },
    data() {
        return {
            page: '1',
            limit: '999',
            parameter: [], //路由传递过来的参数
            orderList: [],
            pdfUrl: '', //pdf地址
        }
    },
    created() {
        this.parameter = JSON.parse(this.$Base64.decode(this.$route.query.param))
        console.log(this.parameter);
        this.getOrderList()
    },
    mounted() {

    },
    methods: {
        // 报告下载
        reportDownload(id) {
            console.log(id);
            this.getReportBase63(id)
        },
        // 去订单详情
        goOrderMsg(id) {
            this.$router.push(`/orderMessage?id=${id}`)
        },
        // 获取订单详情
        async getOrderList() {
            const { data } = await api.home.ReportSearchReportList({
                page: this.page,
                limit: this.limit,
                whereitems: [{
                        "key": "idcard",
                        "value": this.parameter.idcard
                    },
                    {
                        "key": "name",
                        "value": this.parameter.name
                    },
                    {
                        "key": "password",
                        "value": this.parameter.password
                    }
                ]
            })
            this.orderList = data.data
            console.log(this.orderList);
        },
        // 报告下载获取base64
        async getReportBase63(codes) {
            const { data } = await api.home.ReportExportForBase64({
                    codes: [codes],
                    fingercode: '',
                    repname: '1、报告书',
                    customercode: localStorage.getItem('customercode'),
                    whereitems: []
                })
                // console.log(data.data[0].base64String);
                // let pdfUrl = this.dataURLtoBlob(data.data[0].base64String)
            let code = data.data[0].base64String.replace(/[\n\r]/g, "");
            let raw = window.atob(code);
            let rawLength = raw.length; //转换成pdf.js能直接解析的Uint8Array类型
            let uInt8Array = new Uint8Array(rawLength);
            console.log(uInt8Array);
            for (let i = 0; i < rawLength; ++i) {
                uInt8Array[i] = raw.charCodeAt(i);
            }
            let url = window.URL.createObjectURL(
                new Blob([uInt8Array], { type: "application/pdf" })
            );
            console.log(url);
            // console.log(pdfUrl);
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', '下载的文件名');
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link)
        },
    },
    beforeDestroy() {

    },
    watch: {

    },
}
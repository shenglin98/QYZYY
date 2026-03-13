import api from '../../api/index'

export default {
    components: {

    },
    data() {
        return {
            regid: '', //路由的id
            regids: '',
            orderList: [{
                    combinename: '内科',
                    active: true,
                    image: '../../../static/image/nei.png'
                },
                {
                    combinename: '外科检查',
                    active: false,
                    image: '../../../static/image/waike.png'
                },
                {
                    combinename: '五官科检查',
                    active: false,
                    image: '../../../static/image/wuguan.png'
                },
                {
                    combinename: '肝功七项',
                    active: false,
                    image: '../../../static/image/gan.png'
                },
                {
                    combinename: '肾功四项',
                    active: false,
                    image: '../../../static/image/sheng.png'
                },
                {
                    combinename: '肝胆脾胰B超',
                    active: false,
                    image: '../../../static/image/gandan.png'
                },
            ],
            user: [{
                    itemname: '腰围',
                    result: '78',
                    unit: 'CM',
                    reslower: '',
                    resupper: '',
                },
                {
                    itemname: '身高',
                    result: '173',
                    unit: 'CM',
                    reslower: '',
                    resupper: '',
                },
                {
                    itemname: '体重',
                    result: '88',
                    unit: 'KG',
                    reslower: '',
                    resupper: '',
                },
                {
                    itemname: '血压',
                    result: '120/95',
                    unit: 'mmHg',
                    reslower: '',
                    resupper: '',
                },
                {
                    itemname: '心率',
                    result: '75',
                    unit: '次/分',
                    reslower: '',
                    resupper: '',
                },
            ],
            xiaojie: '1.体指数BMI:29.4肥胖 2.血压:120/95。',

            report: [ //左边栏
            ],
            images: '../../../static/image/sheng.png', //随便图片
            imgags: '../../../static/image/wuguan.png',
            hue: 0,
            Data_name: '',
            reportone: [],
            reportwo: [],
            value: '',
            activeName: 'first',
            summary: '', //总检综述
            healthy: [], //健康建议
            status: 0,



        }
    },
    created() {
        // console.log(this.$route.query.id);
        // this.regid = this.$route.query.id
        // this.getAllCheck();   

        // console.log(this.$route.query.obj,'aaaaaaaaaaaaaaaaaaaaa');
        this.regids = this.$route.query.obj;
        this.value = this.$route.query.obj;
        // this.GLOBAL.codes = this.$route.query.obj;
        this.ReportDetails();
        this.activeindex(0, 0);

    },
    mounted() {},
    methods: {

        activeindex(item, index, e) {
            let this_ = this;
            this.hue = index;
            // console.log('当前index',index);
            console.log(item, '点击中的tab');
            if (item != 0) {
                this.Data_name = item.deptname;
                this.reportone = item.combineitems

                // item.combineitems.forEach((item)=>{
                // this.reportwo = item.items;
                // console.log( this.reportwo);
                // })
            }
        },
        // 表格文本变色
        rowstyle({ row, rowIndex }) {
            let stylejson = {};
            console.log(row)
            if (row.healthstatus == 1) {
                // stylejson.background = "#e0838f"; // 背景颜色
                // 也可以修改文字颜色
                stylejson.color = "red !important";
                return stylejson;
            } else if (row.healthstatus == -1) {
                stylejson.color = "#0000ff !important";
                return stylejson;
            }
            return "";
        },
        //  总检
        async activeindextwo(e) {
            // console.log(this.regids);
            this.hue = e;
            // this.Data_name='General_inspection'
            // const {data} = await api.home.General_inspection({

            this.Data_name = 'CustomerReportTotalCheckDetail'
            const { data } = await api.home.HealthCheckForH5({
                // whereitems:[
                //       {
                //       "key": "regid",
                //       "value": this.value
                //       },
                //   ]
                key: "",
                id: "",
                code: this.value,
                type: 0,
                tableName: "",
                customercode: localStorage.getItem("customercode"),
                businesstype: 'CustomerReportTotalCheckDetail',
                // whereitems: [
                //   {
                //     key: this.keys,
                //     value: this.$route.query.obj,
                //   },
                // ]
            })
            console.log('总检接口返回的数据', data);
            this.summary = data.result.conclusiontext;
            // console.log(data.result.conclusiontext,'pppppppppppp');
            // console.log(data.result.worditems,'data.result.worditems');
            data.result.worditems.forEach(item => {
                // console.log(item,'健康建议');
                this.healthy = item.wordname;
                // console.log('健康建议',this.healthy);
            })
        },

        // 总检选项卡
        handleClick(tab, event) {
            // console.log('vvvvvvvvvvvvvvvvvvvv',tab, event);
        },

        async ReportDetails() {
            let this_ = this;
            // const {data} = await api.home.Report_details(//原本
            const { data } = await api.home.HealthCheckForH5(
                // {regid:this.regids}
                {
                    key: "",
                    id: "",
                    code: this.regids,
                    type: 0,
                    tableName: "",
                    businesstype: 'CustomerOldReportDetail',
                    customercode: localStorage.getItem("customercode"),
                    whereitems: [{ key: this.keys, value: this.$route.query.obj, }, ]
                });
            this.report = data.result.departitems;
            this.Data_name = data.result.departitems[0].deptname;
            if (data.result.departitems.length) {
                this.length = data.result.departitems.length;
            }
            // console.log(data,'点击每个用户查看详情的总数据');
            this.reportone = data.result.departitems[0].combineitems;
            // console.log(this.Data_name,'页面进来时加载的报告');
            // console.log('this.reportone',this.reportone);
            data.result.departitems[0].combineitems.forEach(function(e) {
                this_.reportwo = e.items;
            });

            this.status = data.result.status;


            //   this.report = this.xxx.result.departitems;
            //   this.Data_name = this.xxx.result.departitems[0].deptname;
            //   if (this.xxx.result.departitems.length) {
            //     this.length = this.xxx.result.departitems.length;
            //   }
            //   // console.log(data,'点击每个用户查看详情的总数据');
            //   this.reportone = this.xxx.result.departitems[0].combineitems;
            //   // console.log(this.Data_name,'页面进来时加载的报告');
            //   // console.log('this.reportone',this.reportone);
            //   this.xxx.result.departitems[0].combineitems.forEach(function(e) {
            //   this_.reportwo=e.items;
            // });
            // console.log(this.xxx.result.departitems,'this.xxx.result.departitems;');

        },


        tabSwitch() {

        },

        // async getAllCheck(){
        // const {data} = await api.home.DepartCheckAllCheck({
        // regid:this.regid
        // regid:this.regids
        // })
        // console.log(data);
        // this.orderList = data.result
        // }
    },

    beforeDestroy() {

    },
    watch: {

    },
}